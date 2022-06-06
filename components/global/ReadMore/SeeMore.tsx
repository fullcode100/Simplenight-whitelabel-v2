import React, { useEffect, useState, ReactNode } from 'react';
import classnames from 'classnames';
import SeeMoreButton from './components/SeeMoreButton';

interface SeeMoreProps {
  className?: string;
  children?: ReactNode;
  heightInPixels?: number;
  textOpened: string;
  textClosed: string;
  displayButton: boolean;
}

const SHOW_LESS_HEIGHT = 232;

const SeeMore = ({
  className = '',
  children,
  heightInPixels = SHOW_LESS_HEIGHT,
  textOpened,
  textClosed,
  displayButton,
}: SeeMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [sectionHeight, setSectionHeight] = useState<string>(
    `${heightInPixels}px`,
  );

  useEffect(() => {
    if (isOpen) {
      setSectionHeight('100%');
      return;
    }
    if (!isOpen) {
      setSectionHeight(`${heightInPixels}px`);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!displayButton) {
      setIsOpen(true);
    }
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className={`${className} relative`}>
      <section
        style={{ height: sectionHeight }}
        className={classnames('pb-8', className, {
          ['overflow-y-hidden']: !isOpen,
        })}
      >
        {children}
      </section>
      {displayButton && (
        <SeeMoreButton
          onClick={toggle}
          isOpen={isOpen}
          textOpened={textOpened}
          textClosed={textClosed}
        />
      )}
    </section>
  );
};

export default SeeMore;
