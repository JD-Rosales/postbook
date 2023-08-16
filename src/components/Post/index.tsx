/* eslint-disable react-hooks/rules-of-hooks */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
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
import { Button } from '@ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Trash2, PenLine, Forward } from 'lucide-react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { cn } from '@lib/utils';
import { PostAuthor } from '@src/types/post';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import PostAction from './PostAction';
import SharedPost from './SharedPost';
import { useDeletePost } from '@src/hooks/usePost';
import { useToast } from '@ui/use-toast';

type PostProps = {
  data: PostAuthor;
  isEditable?: boolean;
  hasFooter?: boolean;
  className?: string;
};

const Index: React.FC<PostProps> = ({
  className,
  data,
  isEditable = false,
  hasFooter = true,
}) => {
  const deletePost = useDeletePost();
  const [value, setValue] = useState({
    text: data.text ? data.text : '',
  });
  const [postDate, setPostDate] = useState(
    formatDistanceToNow(new Date(data.createdAt), {
      addSuffix: true,
    })
  );
  const { toast } = useToast();
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;

    setValue((prev) => ({ ...prev, text: text }));
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
    if (deletePost.isSuccess && !deletePost.isError) {
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Post deleted successfully',
      });
    }

    if (deletePost.isError) {
      toast({
        variant: 'destructive',
        title: 'An error has occured!',
        description: deletePost.error?.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletePost.isSuccess, deletePost.isError]);

  return (
    <Card className={cn('mb-2', className)}>
      <CardHeader className='px-3 sm:px-6'>
        <CardTitle className='relative'>
          <div className='flex align-middle items-center py-1'>
            <Avatar className='text-sm h-[55px] w-[55px]'>
              <AvatarImage src={data.author.profile?.profilePhoto} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>

            <div className='flex flex-col ml-2'>
              <Link to={`/user/${data.authorId}`} className='hover:underline'>
                {data.author.profile
                  ? `${data.author.profile.firstName}
                    ${data.author.profile?.middleName}
                    ${data.author.profile.lastName}`
                  : data.author.email}
              </Link>

              <span className='font-normal text-xs mt-1'>{`${data.postType} ${postDate}`}</span>
            </div>
          </div>

          <div className='absolute right-0 top-1'>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='focus-visible:ring-0 focus-visible:ring-offset-0'
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={-25}
                className='w-40 absolute -right-3'
              >
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      deletePost.mutate({ postId: data.id });
                    }}
                  >
                    <span>Delete</span>
                    <DropdownMenuShortcut>
                      <Trash2 size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Edit</span>
                    <DropdownMenuShortcut>
                      <PenLine size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Share</span>
                    <DropdownMenuShortcut>
                      <Forward size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className='pb-3 px-3 sm:px-6'>
        <div className='relative'>
          <ContentEditable
            innerRef={textRef}
            disabled={!isEditable}
            className={`mb-2 focus-visible:outline-none bg-transparent break-all`}
            html={value.text}
            onChange={handleChange}
            tagName='p'
          />

          {/* Placeholder for the ContentEditable */}
          {!value.text && isEditable && (
            <p className='absolute top-0 text-gray-500 pointer-events-none'>
              Input your post content here.
            </p>
          )}
        </div>

        {data?.photo && (
          <div className='relative w-full h-[200px] sm:h-[300px] rounded-lg'>
            <img
              className='rounded-lg w-full h-full object-cover'
              src={data.photo}
              alt=''
            />
          </div>
        )}

        {data.sharedPost && <SharedPost data={data.sharedPost} />}

        {/* render if original post have been deleted */}
        {data.sharedPostId && !data.sharedPost && (
          <p className='text-red-500'>Original Post have been deleted</p>
        )}
      </CardContent>

      {hasFooter && (
        <CardFooter className='px-3 sm:px-6 pb-2'>
          <PostAction
            postId={data.sharedPostId ? data.sharedPostId : data.id}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default Index;
