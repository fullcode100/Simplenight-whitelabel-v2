import React from 'react';
import Button from 'components/global/Button/Button';
import BreakdownTotal from 'components/checkout/BreakdownTotal/BreakdownTotal';
import { useTranslation } from 'react-i18next';

const DiningDetailActions = ({
  handleAction,
}: {
  handleAction: (path: string) => void;
}) => {
  const [t] = useTranslation('dining');
  return (
    <div>
      <BreakdownTotal total={t('free')} />
      <Button
        className="mt-3"
        value={t('addToItinerary')}
        type="outlined"
        size="full"
        onClick={() => handleAction('/itinerary')}
      />
      <Button
        onClick={() => handleAction('/checkout/client')}
        className="mt-3"
        value={t('bookNow')}
        size="full"
      />
    </div>
  );
};

export default DiningDetailActions;
