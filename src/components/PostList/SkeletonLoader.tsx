import SkeletonPost from '@components/Post/SkeletonLoader';

const SkeletonLoader = () => {
  return (
    <div className='w-full h-full mt-5'>
      <SkeletonPost hasImg={false} />

      <SkeletonPost />
    </div>
  );
};

export default SkeletonLoader;
