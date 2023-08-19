import myImage from '../../assets/no_data.jpg';

const NoData = () => {
  return (
    <div className='w-full text-center flex flex-col items-center'>
      <img src={myImage} alt='No Data' width={300} />
      <h2 className='font-semibold text-primary text-xl mb-4'>
        Nothings here..
      </h2>
    </div>
  );
};

export default NoData;
