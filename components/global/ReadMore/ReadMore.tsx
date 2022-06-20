import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import SeeMoreButton from './components/SeeMoreButton';

interface ReadMoreProps {
  className?: string;
  text: string;
  charCount?: number;
}

const SHOW_LESS_CHAR_COUNT = 250;

const ReadMore = ({
  className = '',
  text,
  charCount = SHOW_LESS_CHAR_COUNT,
}: ReadMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isExpandable = text?.length > charCount;

  const [formattedText, setFormattedText] = useState(text);

  useEffect(() => {
    if (isOpen) {
      setFormattedText(text);
      return;
    }

    const newText = text.substring(0, charCount);
    setFormattedText(newText + '...');
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className={`${className} relative `}>
      <section className={classnames('pb-4', className)}>
        {formattedText}
      </section>
      {isExpandable && (
        <SeeMoreButton
          onClick={toggle}
          isOpen={isOpen}
          textOpened="See less"
          textClosed="See more"
        />
      )}
    </section>
  );
};

export default ReadMore;
