import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@lib/utils';
import { PostAuthor } from '@src/types/post';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSharePost } from '@src/hooks/usePost';
import SharedPost from './SharedPost';
import SharePostDialog from '@components/SharePostDialog';

type PostProps = {
  data: PostAuthor;
  className?: string;
};

const Index: React.FC<PostProps> = ({ className, data }) => {
  const sharePost = useSharePost();
  const [postDate, setPostDate] = useState(
    formatDistanceToNow(new Date(data.createdAt), {
      addSuffix: true,
    })
  );

  const handleSharePost = () => {
    console.log('sharing post');
    console.log(sharePost.data);
    // const text = data.text;
    // const postId = data.id;

    // sharePost.mutate({ text, postId });
  };

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

              <span className='font-normal text-xs mt-1'>{`${data.postType}, ${postDate}`}</span>
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
      </CardContent>

      <CardFooter className='px-3 sm:px-6'>
        <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
          <div className='col-span-4'>
            <Button className='rounded-2xl' variant={'outline'} fullWidth>
              <ThumbsUp size={20} />
              <span className='ml-3 text-lg font-semibold'>5</span>
            </Button>
          </div>
          <div className='col-span-4'>
            <Button className='rounded-2xl' variant={'outline'} fullWidth>
              COMMENT
            </Button>
          </div>

          <div className='col-span-4'>
            <SharePostDialog postId={data.id}>
              <Button
                onClick={handleSharePost}
                className='rounded-2xl'
                variant={'outline'}
                fullWidth
              >
                SHARE
              </Button>
            </SharePostDialog>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Index;