import React, { useEffect, useState } from 'react';

interface ReadMoreProps {
  className?: string;
  text: string;
}

const SHOW_LESS_CHAR_COUNT = 250;

const ReadMore = ({ className = '', text }: ReadMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isExpandable = text.length > SHOW_LESS_CHAR_COUNT;

  const [formattedText, setFormattedText] = useState(text);

  useEffect(() => {
    if (isOpen) {
      setFormattedText(text);
      return;
    }

    const newText = text.substring(0, SHOW_LESS_CHAR_COUNT);
    setFormattedText(newText + '...');
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className={`${className} relative min-h-[8rem]`}>
      <span className="">{formattedText}</span>
      {isExpandable && (
        <section className="mt-2 w-full h-16 absolute bottom-0 flex items-end justify-center bg-gradient-to-b from-transparent to-white">
          <button
            type="button"
            onClick={toggle}
            className="text-sm z-10 text-center leading-5font-medium text-primary-1000 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            {isOpen ? 'Read less' : 'Read more'}
          </button>
        </section>
      )}
    </section>
  );
};

export default ReadMore;
