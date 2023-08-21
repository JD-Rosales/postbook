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
import { CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Trash2, PenLine, Forward } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';
import usePostState from '@src/contextsHooks/usePostState';

interface HeaderProps {
  data: PostAuthor;
  hasMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ data, hasMenu = false }) => {
  const navigate = useNavigate();
  const { handleDialogOpen } = usePostState();

  const [postDate, setPostDate] = useState(
    formatDistanceToNow(new Date(data.createdAt), {
      addSuffix: true,
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPostDate(
        formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [data.createdAt]);

  return (
    <CardHeader className='px-3 sm:px-6'>
      <CardTitle className='relative'>
        <div className='flex align-middle items-center py-1'>
          <Avatar className='text-sm h-[55px] w-[55px]'>
            <AvatarImage src={data.author.profile?.profilePhoto} />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>

          <div className='flex flex-col ml-2'>
            <span onClick={() => navigate('/')}>
              {data.author.profile
                ? `${data.author.profile.firstName}
                    ${data.author.profile?.middleName}
                    ${data.author.profile.lastName}`
                : data.author.email}
            </span>

            <span className='font-normal text-xs mt-1'>{`${data.postType} ${postDate}`}</span>
          </div>
        </div>

        {hasMenu && (
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
                  <DropdownMenuItem>
                    <span>Delete</span>
                    <DropdownMenuShortcut>
                      <Trash2 size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleDialogOpen({ postId: data.id, type: 'update' });
                    }}
                  >
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
        )}
      </CardTitle>
    </CardHeader>
  );
};

export default Header;
