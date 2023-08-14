import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Link } from 'react-router-dom';
import { cn } from '@lib/utils';
import { PostAuthor } from '@src/types/post';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import PostAction from './PostAction';
import SharedPost from './SharedPost';

type PostProps = {
  data: PostAuthor;
  className?: string;
};

const Index: React.FC<PostProps> = ({ className, data }) => {
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
    <Card className={cn('mb-2', className)}>
      <CardHeader className='px-3 sm:px-6'>
        <CardTitle>
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
        </CardTitle>
      </CardHeader>

      <CardContent className='pb-3 px-3 sm:px-6'>
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

        {data.sharedPost && <SharedPost data={data.sharedPost} />}

        {/* render if original post have been deleted */}
        {data.sharedPostId && !data.sharedPost && (
          <p className='text-red-500'>Original Post have been deleted</p>
        )}
      </CardContent>

      <CardFooter className='px-3 sm:px-6 pb-2'>
        <PostAction postId={data.sharedPostId ? data.sharedPostId : data.id} />
      </CardFooter>
    </Card>
  );
};

export default Index;
