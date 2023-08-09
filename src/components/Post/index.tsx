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

type PostProps = {
  data: PostAuthor;
  className?: string;
};

const Index: React.FC<PostProps> = ({ className, data }) => {
  return (
    <Card className={cn('mb-2', className)}>
      <CardHeader>
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

              <span className='font-normal text-xs mt-1'>{`${data.postType} 10h ago`}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className='pb-3'>
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

      <CardFooter>
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
            <Button className='rounded-2xl' variant={'outline'} fullWidth>
              SHARE
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Index;
