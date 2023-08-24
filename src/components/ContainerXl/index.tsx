import React from 'react';
import { cn } from '@lib/utils';

interface IndexProps {
  children: React.ReactNode;
  className?: string;
}

const Index: React.FC<IndexProps> = ({ children, className }) => {
  return (
    <div className={cn('max-w-2xl rounded-b-xl mx-auto', className)}>
      {children}
    </div>
  );
};

export default Index;
