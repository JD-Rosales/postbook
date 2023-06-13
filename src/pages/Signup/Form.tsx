import { useEffect, useState } from 'react';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVisibility } from 'react-icons/md';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { FiAlertTriangle } from 'react-icons/fi';
import { useRegister } from '@src/hooks/useAuth';

const Form: React.FC = () => {
  const registerUser = useRegister();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
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

    registerUser.mutate(formData);
  };

  useEffect(() => {
    if (registerUser.isSuccess) {
      console.log('login success');
      navigate('/');
    }
  }, [registerUser.isSuccess, navigate]);
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
          placeholder='Password'
          name='password'
          icon={passwordShown ? MdOutlineVisibility : MdOutlineVisibilityOff}
          iconPosition='end'
          iconClick={handlePasswordShown}
          required
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          className='mt-4'
          type={passwordShown ? 'text' : 'password'}
          placeholder='Confirm password'
          name='password_confirmation'
          icon={passwordShown ? MdOutlineVisibility : MdOutlineVisibilityOff}
          iconPosition='end'
          iconClick={handlePasswordShown}
          required
          value={formData.password_confirmation}
          onChange={handleChange}
        />

        {registerUser.isError && (
          <p className='mt-3 pl-2 text-left text-sm text-rose-600 flex items-center'>
            <FiAlertTriangle className='mr-2' />
            {registerUser.error.message}
          </p>
        )}

        <Button className='mt-6' variant={'default'} fullWidth>
          Signup
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
          navigate('/login');
        }}
        fullWidth
      >
        Login
      </Button>
    </>
  );
};

export default Form;
