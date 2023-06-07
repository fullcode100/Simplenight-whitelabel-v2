import React from 'react';

interface IconContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

export const IconContainer = ({ children }: IconContainerProps) => {
  return (
    <div className="px-0 py-0 flex-1 h-20 whitespace-nowrap gap-1 flex flex-col text-center justify-center items-center flex-grow rounded bg-primary-100 w-[122.33333587646484px]">
      {children}
    </div>
  );
};
