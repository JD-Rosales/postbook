import { Separator } from '@ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useContext } from 'react';
import { SidebarContext } from '@src/contexts/SidebarContext';

const Index: React.FC = () => {
  const { isOpen } = useContext(SidebarContext);
  return (
    <aside
      className={`bg-primary static top-0 left-0 h-full z-40 w-64 ${
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
      </div>
    </aside>
  );
};

export default Index;
