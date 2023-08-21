import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Link } from 'react-router-dom';
import { cn } from '@lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

interface SharedPostProps {
  data: {
    author: {
      id: number;
      email: string;
      profile?: {
        profilePhoto?: string;
        firstName: string;
        middleName?: string;
        lastName: string;
      };
    };
    id: number;
    authorId: number;
    text?: string;
    photo?: string;
    postType: string;
    createdAt: Date;
  };
  className?: string;
}

const SharedPost: React.FC<SharedPostProps> = ({ data, className }) => {
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
    <Card className={cn('mb-0', className)}>
      <CardHeader className='px-3 sm:px-6'>
        <CardTitle>
          <div className='flex align-middle items-center py-1'>
            <Avatar className='text-sm h-[55px] w-[55px]'>
              <AvatarImage src={data.author.profile?.profilePhoto} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>

            <div className='flex flex-col ml-2'>
              <Link to={`/user/${data.author.id}`} className='hover:underline'>
                {data.author.profile
                  ? `${data.author.profile.firstName}
                    ${data.author.profile?.middleName}
                    ${data.author.profile.lastName}`
                  : data.author.email}
              </Link>

              <span className='font-normal text-xs mt-1'>{`${data.postType} ${postDate}`}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className='pb-2 px-3 sm:px-6'>
        {data?.text && <p className='mb-2'>{data.text}</p>}
        {data?.photo && (
          <div className='relative w-full h-[200px] sm:h-[300px] rounded-lg'>
            <img
              className='rounded-lg w-full h-full object-cover'
              src={data.photo}
              alt=''
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SharedPost;
