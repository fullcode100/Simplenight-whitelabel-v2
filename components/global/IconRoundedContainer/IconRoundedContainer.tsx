import React from 'react';

interface IconRoundedContainerProps {
  children?: React.ReactNode;
  className?: string;
  isLarge?: boolean;
}

const IconRoundedContainer = ({
  children,
  className = '',
  isLarge = false,
}: IconRoundedContainerProps) => (
  <div
    className={`flex items-center justify-center h-[40px] w-[40px] ${
      isLarge && 'lg:h-[60px] lg:w-[60px]'
    } px-2 py-2 rounded-[1000px] ${className}`}
  >
    {children}
  </div>
);

export default IconRoundedContainer;
