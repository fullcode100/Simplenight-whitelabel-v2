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
  displayButton: boolean;
}

const SHOW_LESS_HEIGHT = 232;

const SeeMore = ({
  type,
  className = '',
  text = '',
  children,
  heightInPixels = SHOW_LESS_HEIGHT,
  textOpened,
  textClosed,
  displayButton,
}: SeeMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formattedText, setFormattedText] = useState(text);

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

    const newText = text.substring(0, charCount);
    setFormattedText(newText + '...');
  }, [isOpen]);

  useEffect(() => {
    if (!displayButton) {
      setIsOpen(true);
    }
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  if (type === 'text') {
    return (
      <section className={`${className} relative `}>
        <section className={classnames('pb-4', className)}>
          {formattedText}
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
