import { useState, useEffect, useRef, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import { CardHeader } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { MoreHorizontal, Trash2, PenLine, Forward } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDeletePost } from '@src/hooks/usePost';
import { useToast } from '@ui/use-toast';
import { getErrorMessage } from '@src/lib/utils';
import EditPostDialog from '../EditPostDialog';

type HeaderProps = {
  data: PostAuthor;
  setShareBtnClick: React.Dispatch<React.SetStateAction<boolean>>;
  hasMenu: boolean;
};

const Header: React.FC<HeaderProps> = ({ data, setShareBtnClick, hasMenu }) => {
  const deletePost = useDeletePost();
  const delRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  const [postDate, setPostDate] = useState(
    formatDistanceToNow(new Date(data.createdAt), {
      addSuffix: true,
    })
  );

  const nameRenderer = useCallback((): string => {
    if (data.author.profile) {
      return `${data.author.profile.firstName} ${data.author.profile.middleName} ${data.author.profile.lastName}`;
    } else if (data.author.email) {
      return `${data?.author.email}`;
    } else return ``;
  }, [data]);

  const handleDeletePost = () => {
    deletePost.mutate({ postId: data.id });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPostDate(
        formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [data.createdAt]);

  useEffect(() => {
    if (deletePost.isSuccess) {
      deletePost.reset();
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post deleted successfully',
      });
    }

    if (deletePost.isError) {
      deletePost.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(deletePost.error?.message),
      });
    }
  }, [deletePost, toast]);

  return (
    <CardHeader>
      <div className='relative flex align-middle items-center font-semibold'>
        <div className='bg-slate-300 p-[2px] rounded-full'>
          <Avatar className='text-sm h-[55px] w-[55px]'>
            <AvatarImage src={data.author.profile?.profilePhoto} />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex flex-col ml-2 '>
          <Link to={'/user/' + data.authorId} className='hover:underline'>
            {nameRenderer()}
          </Link>
          <span className='font-normal text-xs'>
            {`${data.postType} ${postDate}`}
          </span>
        </div>

        {hasMenu && (
          <div className='ml-auto'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='p-0 h-fit'>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={-25}
                className='w-40 absolute -right-3'
              >
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      if (delRef.current) {
                        delRef.current.click();
                      }
                    }}
                  >
                    <span>Delete</span>
                    <DropdownMenuShortcut>
                      <Trash2 size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (editRef.current) {
                        editRef.current.click();
                      }
                    }}
                  >
                    <span>Edit</span>
                    <DropdownMenuShortcut>
                      <PenLine size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShareBtnClick(true)}>
                    <span>Share</span>
                    <DropdownMenuShortcut>
                      <Forward size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Delete dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              ref={delRef}
              className='absolute right-0 opacity-0 pointer-events-none'
            ></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=' max-w-md'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePost} className='mt-0'>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Dialog */}
        <EditPostDialog postId={data.id} originPostId={data.sharedPostId}>
          <Button
            ref={editRef}
            className='absolute right-0 opacity-0 pointer-events-none'
          ></Button>
        </EditPostDialog>
      </div>
    </CardHeader>
  );
};

export default Header;
