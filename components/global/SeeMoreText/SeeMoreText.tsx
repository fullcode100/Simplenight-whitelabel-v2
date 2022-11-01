import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SeeMoreTextProps {
  text: string;
  length?: number;
}

const SeeMoreText = ({ text, length = 100 }: SeeMoreTextProps) => {
  const [t] = useTranslation('glonbal');
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText =
    text.length > length ? `${text.substring(0, length)}...` : text;
  const displayText = isExpanded ? text : shortText;
  const seeMoreText = t('seeMore', 'See more');
  return (
    <>
      {displayText}{' '}
      {!isExpanded && (
        <span
          className="font-semibold underline text-primary-1000"
          onClick={() => setIsExpanded(true)}
        >
          {seeMoreText}
        </span>
      )}
    </>
  );
};

export default SeeMoreText;
