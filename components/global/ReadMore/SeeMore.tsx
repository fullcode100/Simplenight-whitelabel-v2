import React, { useEffect, useState, ReactNode } from 'react';
import classnames from 'classnames';
import SeeMoreButton from './components/SeeMoreButton';

interface SeeMoreProps {
  type: 'text' | 'component';
  className?: string;
  text?: string;
  children?: ReactNode;
  heightInPixels?: number;
  textOpened: string;
  textClosed: string;
}

const SHOW_LESS_HEIGHT = 300;

const SeeMore = ({
  type,
  className = '',
  text = '',
  children,
  heightInPixels = SHOW_LESS_HEIGHT,
  textOpened,
  textClosed,
}: SeeMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [sectionHeight, setSectionHeight] = useState<string>(
    `${heightInPixels}px`,
  );

  useEffect(() => {
    if (type === 'component') {
      if (isOpen) {
        setSectionHeight('100%');
        return;
      }
      if (!isOpen) {
        setSectionHeight(`${heightInPixels}px`);
        return;
      }
    }
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  if (type === 'text') {
    return (
      <section className={`${className} relative `}>
        <section className={classnames('pb-4', className)}>
          <p
            className={classnames({
              ['line-clamp-5']: !isOpen,
              ['line-clamp-none']: isOpen,
            })}
          >
            {text}
          </p>
        </section>
        <SeeMoreButton
          onClick={toggle}
          isOpen={isOpen}
          textOpened={textOpened}
          textClosed={textClosed}
        />
      </section>
    );
  }

  return (
    <section className={`${className} relative mb-6`}>
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
        textOpened={textOpened}
        textClosed={textClosed}
      />
    </section>
  );
};

export default SeeMore;
