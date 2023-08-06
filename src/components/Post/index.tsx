import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { cn } from '@lib/utils';
import { Post } from '@src/hooks/usePost';

type PostProps = {
  data: Post;
  className?: string;
};

const Index: React.FC<PostProps> = ({ className, data }, key) => {
  return (
    <Card key={key} className={cn('mb-2', className)}>
      <CardHeader>
        <CardTitle>
          <span>
            {data.author.profile
              ? `
            ${data.author.profile.firstName}
            ${data.author.profile?.middleName}
            ${data.author.profile.lastName}
            `
              : data.author.email}
          </span>
          <span>{` ${data.postType}`}</span>
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>

      <CardContent>
        {data?.text && <p>{data.text}</p>}
        {data?.photo && (
          <div className='relative w-full h-[300px] rounded-lg'>
            <img
              className='rounded-lg w-full h-full object-cover'
              src={data.photo}
              alt=''
            />
          </div>
        )}
      </CardContent>

      <CardFooter>Card Footer</CardFooter>
    </Card>
  );
};

export default Index;
