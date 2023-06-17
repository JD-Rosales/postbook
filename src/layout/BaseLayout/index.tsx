import { Button } from '@ui/button';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='bg-slate-500 h-full'>
        <h1 className='text-xl'>You are authenticated!</h1>
        <Button
          className='mt-6'
          variant={'default'}
          onClick={() => {
            navigate('/login');
          }}
        >
          Back to Login
        </Button>
      </div>
    </>
  );
};

export default Index;
