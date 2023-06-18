import { Separator } from '@ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useState } from 'react';

const Index: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-primary static top-0 right-0 h-full z-40 w-64 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='px-4'>
        <div className='py-5 ps-3 flex'>
          <Avatar className=''>
            <AvatarImage />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>

          <span className='text-white px-2 leading-10 truncate'>
            Jake Dagami Rosales
          </span>
        </div>
        <Separator />

        <button
          className='text-white'
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
        >
          Toggle Sidebar
        </button>
      </div>
    </aside>
  );
};

export default Index;
