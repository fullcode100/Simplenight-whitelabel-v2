import React, { useEffect, useState, ReactNode } from 'react';
import classnames from 'classnames';
import SeeMoreButton from './components/SeeMoreButton';

interface SeeMoreProps {
  type: 'text' | 'component';
  className?: string;
  text?: string;
  children?: ReactNode;
  heightInPixels?: number;
  charCount?: number;
  textOpened: string;
  textClosed: string;
}

const SHOW_LESS_HEIGHT = 300;
const SHOW_LESS_CHAR_COUNT = 250;

const SeeMore = ({
  type,
  className = '',
  text,
  children,
  heightInPixels = SHOW_LESS_HEIGHT,
  charCount = SHOW_LESS_CHAR_COUNT,
  textOpened,
  textClosed,
}: SeeMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formattedText, setFormattedText] = useState(text);

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
    if (isOpen) {
      setFormattedText(text);
      return;
    }

    const newText = text.substring(0, charCount);
    setFormattedText(newText + '...');
  }, [isOpen]);

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
