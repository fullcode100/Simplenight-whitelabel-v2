import React from 'react';
import { useTranslation } from 'react-i18next';
import PriceDisplay from '../PriceDisplay/PriceDisplay';

const DiningItemPriceInfo = () => {
  const [t] = useTranslation('dining');
  return (
    <section className="flex items-center justify-end px-4 py-2 border-t border-dark-300">
      <PriceDisplay price={t('free')} />
    </section>
  );
};

export default DiningItemPriceInfo;
