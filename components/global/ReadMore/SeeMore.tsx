import React, { useEffect, useState, ReactNode } from 'react';
import classnames from 'classnames';
import SeeMoreButton from './components/SeeMoreButton';

interface SeeMoreProps {
  className?: string;
  children?: ReactNode;
  heightInPixels?: number;
}

const SHOW_LESS_HEIGHT = 300;

const SeeMore = ({
  className = '',
  children,
  heightInPixels = SHOW_LESS_HEIGHT,
}: SeeMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [sectionHeight, setSectionHeight] = useState<string>(
    `${heightInPixels}px`,
  );

  useEffect(() => {
    if (isOpen) {
      setSectionHeight('100%');
    }
    if (!isOpen) {
      setSectionHeight(`${heightInPixels}px`);
    }
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className={`${className} relative `}>
      <section
        style={{ height: sectionHeight }}
        className={classnames('pb-8', className, {
          ['overflow-y-hidden']: !isOpen,
        })}
      >
        {children}
      </section>
      <SeeMoreButton
        onClick={toggle}
        isOpen={isOpen}
        textOpen="See less"
        textClosed="See more"
      />
    </section>
  );
};

export default SeeMore;
