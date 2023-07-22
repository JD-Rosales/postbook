import Image from './image';
import { useNavigate, NavLink } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <Image className='h-96 w-96' />

      <NavLink
        to='/'
        className='bg-primary text-white font-bold py-3 w-44 rounded-lg text-center hover:opacity-90'
      >
        BACK TO HOME
      </NavLink>

      <button
        onClick={() => [navigate(-1)]}
        className='mt-3 border font-bold ring-border rounded-lg py-3 w-44 text-center hover:opacity-80'
      >
        BACK
      </button>
    </div>
  );
};

export default Index;
