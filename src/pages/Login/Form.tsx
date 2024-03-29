import { useEffect, useState } from 'react';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useLogin } from '@src/hooks/useAuth';

const Form: React.FC = () => {
  const loginUser = useLogin();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const handlePasswordShown = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser.mutate(formData);
  };

  useEffect(() => {
    if (loginUser.isSuccess) navigate('/');
  }, [loginUser.isSuccess, navigate]);

  return (
    <>
      <form className='h-fit' onSubmit={handleSubmit}>
        <Input
          className='mt-4'
          type='text'
          placeholder='Email'
          name='email'
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          className='mt-4'
          type={passwordShown ? 'text' : 'password'}
          autoComplete='off'
          placeholder='Password'
          name='password'
          icon={passwordShown ? Eye : EyeOff}
          iconPosition='end'
          iconClick={handlePasswordShown}
          required
          value={formData.password}
          onChange={handleChange}
        />

        {loginUser.isError && (
          <p className='mt-3 pl-2 text-left text-sm text-rose-600 flex items-center'>
            <AlertTriangle className='mr-2' size={20} />
            {loginUser.error?.message}
          </p>
        )}

        <Button
          className='mt-6'
          variant={'default'}
          loading={loginUser.isLoading}
          fullWidth
        >
          Login
        </Button>
      </form>
      <div className='relative flex py-5 items-center'>
        <div className='flex-grow border-t border-gray-200'></div>
        <span className='flex-shrink mx-4 text-gray-400'>or</span>
        <div className='flex-grow border-t border-gray-200'></div>
      </div>
      <Button
        className='mt-0'
        variant={'secondary'}
        onClick={() => {
          navigate('/signup');
        }}
        fullWidth
      >
        Create an Account
      </Button>
    </>
  );
};

export default Form;
