import React from 'react';

interface IndexProps {
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children }) => {
  return <div className='max-w-2xl rounded-b-xl mx-auto'>{children}</div>;
};

export default Index;
