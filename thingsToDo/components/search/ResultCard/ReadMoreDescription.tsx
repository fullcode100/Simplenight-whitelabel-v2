import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const [t] = useTranslation('global');
  const showReadMore = text?.length > charCount;

  const [formattedText, setFormattedText] = useState(text);
  const seeMoreLabel = t('seeMore', 'See More');

  useEffect(() => {
    if (showReadMore) {
      const newText = text.substring(0, charCount);
      setFormattedText(newText + '...');
      return;
    }
    setFormattedText(text);
  }, []);

  return (
    <p className={className}>
      {formattedText}{' '}
      {showReadMore && (
        <span className="font-semibold underline text-primary-1000">
          {seeMoreLabel}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
