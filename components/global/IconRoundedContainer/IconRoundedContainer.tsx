import React from 'react';

interface IconRoundedContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const IconRoundedContainer = ({
  children,
  className = '',
}: IconRoundedContainerProps) => (
  <div
    className={`flex items-center justify-center px-3 py-3 rounded-[1000px] ${className}`}
  >
    {children}
  </div>
);

export default IconRoundedContainer;
