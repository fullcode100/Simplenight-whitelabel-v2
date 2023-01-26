import React from 'react';
import { transformTo12hoursLowercase } from 'dining/helpers/time';
import { useTranslation } from 'react-i18next';
import ClockIcon from 'public/icons/assets/clock.svg';

const DiningTimeDetail = ({
  className,
  isOpen,
  hours,
}: {
  className?: string;
  isOpen?: boolean;
  hours?: string[];
}) => {
  const [t, i18next] = useTranslation('dining');
  const openLabel = t('open', 'open');
  const closeLabel = t('closed', 'closed');

  return (
    <div className={`flex ${className}`}>
      <div className="flex items-center bg-green-100 rounded-4 w-[67px] justify-center text-green-1000">
        <ClockIcon />
        <span className="pl-2">
          {isOpen ? `${openLabel}` : `${closeLabel}`}
        </span>
      </div>
      {hours && hours?.length > 0 ? (
        <div>
          <span className="pl-3 text-sm text-dark-700">
            {transformTo12hoursLowercase(hours?.[0])} -{' '}
            {transformTo12hoursLowercase(hours?.[hours?.length - 1])}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default DiningTimeDetail;
