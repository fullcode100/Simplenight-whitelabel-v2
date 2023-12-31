import React from 'react';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import { hasCartMode } from 'helpers/purchaseModeUtils';

const DiningDetailActions = ({
  handleAction,
}: {
  handleAction: (path: string) => void;
}) => {
  const [t] = useTranslation('dining');
  const showAddToItinerary = hasCartMode();
  return (
    <div>
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

export default DiningDetailActions;
