import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SeeMoreTextProps {
  text: string;
  length?: number;
}

const SeeMoreText = ({ text, length = 100 }: SeeMoreTextProps) => {
  const [t] = useTranslation('global');
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = text?.length > length;
  const shortText =
    text?.length > length ? `${text.substring(0, length)}...` : text;
  const displayText = (
    <div dangerouslySetInnerHTML={{ __html: isExpanded ? text : shortText }} />
  );
  const seeMoreText = t('seeMore', 'See more');
  return (
    <>
      {displayText}{' '}
      {!isExpanded && isExpandable && (
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
