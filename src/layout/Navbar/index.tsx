import useSidebar from '@src/contextsHooks/useSidebar';

const Index = () => {
  const { setToggled, setCollapsed } = useSidebar();
  return (
    <div className='bg-primary text-white h-[70px] sticky top-0 z-20'>
      <button className='sm:hidden' onClick={() => setToggled((prev) => !prev)}>
        Toggle Sidebar
      </button>

      <button
        className='hidden sm:block'
        onClick={() => setCollapsed((prev) => !prev)}
      >
        Collapse Sidebar
      </button>
    </div>
  );
};

export default Index;
