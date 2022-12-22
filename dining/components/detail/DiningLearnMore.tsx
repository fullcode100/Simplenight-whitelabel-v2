import React from 'react';

const DiningLearnMore = ({
  label,
  className,
  onClick,
  href,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={`text-primary-1000 hover:text-primary-1000 visited:text-primary-1000 text-base border-b-2 border-primary-1000 inline-block ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      className={`text-primary-1000 text-base border-b-2 border-primary-1000 m-auto flex ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default DiningLearnMore;
