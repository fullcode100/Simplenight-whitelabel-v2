import { createRef, useEffect, useMemo, useState } from 'react';

interface FormsLoader {
  size?: 'large' | 'medium' | 'small';
}
const FormsLoader = ({ size = 'medium' }: FormsLoader) => {
  const svgSize = useMemo(() => {
    switch (size) {
      case 'large':
        return 80;
      case 'medium':
        return 50;
      case 'small':
        return 30;
      default:
        return 80;
    }
  }, [size]);
  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="text-primary-200"
        width={svgSize}
        height={svgSize}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" />
      </svg>
      <svg
        className="absolute animate-spin text-primary-1000"
        width={svgSize}
        height={svgSize}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 4C50.3516 4 59.6827 8.36906 66.25 15.3637"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default FormsLoader;
