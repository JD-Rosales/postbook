import Form from './Form';
import Image from './Image';

const index: React.FC = () => {
  return (
    <div className='h-screen w-full flex flex-row'>
      <div className='w-1/2 hidden md:flex justify-center items-center'>
        <Image className='w-9/12' />
      </div>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
        <div className='w-[370px] px-5 py-4 text-center'>
          <h1 className='text-2xl text-primary font-bold'>Postbook Login</h1>
          <p className='mt-3 leading-tight'>Enter you credentials to login.</p>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default index;
