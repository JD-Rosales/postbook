import React from 'react';

interface IndexProps {
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children }) => {
  return (
    <div className='max-w-2xl px-3 md:px-10 border-x border-b rounded-b-xl shadow-md mb-5 border-gray-200 mx-auto'>
      {children}
    </div>
  );
};

export default Index;
