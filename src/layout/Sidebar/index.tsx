import { Separator } from '@ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
// import { useContext } from 'react';
// import { SidebarContext } from '@src/contexts/SidebarContext';

const Index: React.FC = () => {
  // const { isOpen } = useContext(SidebarContext);

  return (
    <>
      <aside className={`w-64 z-40 h-screen transition-transform bg-primary`}>
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
    </>
  );
};

export default Index;
