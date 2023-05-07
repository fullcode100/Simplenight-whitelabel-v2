import React from 'react';
import Button from 'components/global/Button/Button';
import BreakdownTotal from 'components/checkout/BreakdownTotal/BreakdownTotal';
import { useTranslation } from 'react-i18next';
import { hasCartMode } from 'helpers/purchaseModeUtils';

const CarDetailActions = ({
  handleAction,
}: {
  handleAction: (path: string) => void;
}) => {
  const [t] = useTranslation('cars');
  const showAddToItinerary = hasCartMode();
  return (
    <div>
      <BreakdownTotal total={t('free')} />
      {showAddToItinerary && (
        <Button
          className="mt-3"
          value={t('addToItinerary')}
          type="outlined"
          size="full"
          onClick={() => handleAction('/itinerary')}
        />
      )}
      <Button
        onClick={() => handleAction('/checkout/client')}
        className="mt-3"
        value={t('bookNow')}
        size="full"
      />
    </div>
  );
};

export default CarDetailActions;
