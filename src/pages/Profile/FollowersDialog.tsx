import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Button } from '@ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FollowersDialogProps {
  children: React.ReactNode;
  data: UserProfileType[];
}

const FollowersDialog: React.FC<FollowersDialogProps> = ({
  children,
  data,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>FOLLOWERS</DialogTitle>
        </DialogHeader>

        <div>
          {data &&
            data.map((follower) => {
              return (
                <div
                  key={follower.id}
                  className=' w-full mb-2 py-2 flex items-center border-b'
                >
                  <Avatar className='h-[45px] w-[45px]'>
                    <AvatarImage src={follower.profile?.profilePhoto} />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>

                  <span className='ml-2'>
                    {follower.profile
                      ? `${follower.profile.firstName} ${follower.profile?.middleName} ${follower.profile.lastName}`
                      : follower.email}
                  </span>

                  <Button
                    onClick={() => navigate(`/user/${follower.id}`)}
                    className='py-4 mt-0 ml-auto'
                    variant={'default'}
                  >
                    View Profile
                  </Button>
                </div>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersDialog;
