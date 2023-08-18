import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Skeleton } from '@ui/skeleton';
import { cn } from '@lib/utils';

type SkeletonPostLoaderProps = {
  className?: string;
  hasText?: boolean;
  hasImg?: boolean;
  hasFooter?: boolean;
};

const SkeletonPostLoader: React.FC<SkeletonPostLoaderProps> = ({
  className,
  hasText = true,
  hasImg = true,
  hasFooter = true,
}) => {
  return (
    <Card className={cn('mb-2', className)}>
      <CardHeader>
        <CardTitle>
          <div className='flex align-middle items-center py-1'>
            <Skeleton className='w-[55px] h-[55px] rounded-full' />

            <div className='flex flex-col ml-2'>
              <Skeleton className='w-[200px] h-[20px] rounded-full' />

              <Skeleton className='w-[150px] h-[20px] rounded-full mt-2' />
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className='pb-3'>
        {hasText && <Skeleton className='w-2/3 h-[20px] mb-3' />}
        {hasImg && <Skeleton className='w-full h-[100px]' />}
      </CardContent>

      {hasFooter && (
        <CardFooter>
          <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
            <div className='col-span-4'>
              <Skeleton className='w-full h-[40px]' />
            </div>
            <div className='col-span-4'>
              <Skeleton className='w-full h-[40px]' />
            </div>

            <div className='col-span-4'>
              <Skeleton className='w-full h-[40px]' />
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default SkeletonPostLoader;
