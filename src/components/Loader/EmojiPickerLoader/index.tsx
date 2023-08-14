import { Skeleton } from '@ui/skeleton';

const PickerSkeleton = () => {
  return (
    <div className='w-[350px] h-[450px] bg-white rounded-lg p-4'>
      <Skeleton className='w-full h-[40px]' />

      <Skeleton className='w-full h-[30px] mt-6' />

      <Skeleton className='w-2/3 h-[30px] mt-4' />

      <Skeleton className='w-full h-[25px] mt-8' />
      <Skeleton className='w-full h-[25px] mt-4' />
      <Skeleton className='w-full h-[25px] mt-4' />
      <Skeleton className='w-full h-[25px] mt-4' />
      <Skeleton className='w-full h-[25px] mt-4' />
      <Skeleton className='w-full h-[25px] mt-4' />
    </div>
  );
};

export default PickerSkeleton;
