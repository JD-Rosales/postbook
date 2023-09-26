import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import Loader from './Loader';

const Index = () => {
  const [value, setvalue] = useState('');
  const [isInputFocused, setInputFocus] = useState(false);

  const isFocus = useMemo(() => {
    if (isInputFocused && value) return true;
    return false;
  }, [isInputFocused, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value);
  };
  return (
    <div className='relative'>
      <div className='flex bg-slate-100 p-2 rounded-2xl'>
        <Search className='text-gray-500' />
        <input
          type='text'
          className='w-[200px] ml-2 bg-inherit focus-visible:outline-none'
          placeholder='Search'
          value={value}
          onChange={handleChange}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </div>

      {/* Search result */}
      <div
        className={`absolute top-[50px] left-0 min-w-[400px] bg-white transform transition-transform ease-in-out duration-300 ${
          isFocus ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {isFocus && (
          <div className='h-[300px] w-[500px]'>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
