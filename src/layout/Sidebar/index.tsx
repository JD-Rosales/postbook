import { Separator } from '@ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
// import { useState } from 'react';

// interface SidebarProps {
//   isOpen: boolean;
// }

const index: React.FC = () => {
  return (
    <aside className='bg-primary absolute top-0 left-0 h-full z-40 w-64'>
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
      </div>
    </aside>
  );
};

export default index;
