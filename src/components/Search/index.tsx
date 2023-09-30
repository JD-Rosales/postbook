import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchUser } from '@src/hooks/useUser';
import User from './User';
import React from 'react';
// import Loader from './Loader';

const Index = () => {
  const [value, setvalue] = useState('');
  const [isInputFocused, setInputFocus] = useState(false);
  const searchUser = useSearchUser(value);

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
          className='w-full ml-2 bg-inherit focus-visible:outline-none'
          placeholder='Search'
          value={value}
          onChange={handleChange}
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setInputFocus(false);
            }, 100);
          }}
        />
      </div>

      {/* Search result */}
      <div
        className={`absolute top-[50px] left-[-4.3rem] sm:left-0 w-screen sm:w-[270px] bg-slate-100 transform transition-transform ease-in-out duration-300 ${
          isFocus ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {isFocus && (
          <div className='h-[300px] z-50 px-2 pt-2 rounded-lg w-full overflow-y-auto'>
            {searchUser.data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((user, i) => (
                  <User data={user} key={i} />
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
