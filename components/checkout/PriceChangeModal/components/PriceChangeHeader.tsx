import React from 'react';
import Exclamation from 'public/icons/assets/exclamation.svg';
import Close from 'public/icons/assets/cross.svg';
import { useTranslation } from 'react-i18next';

interface PriceChangeHeaderProps {
  onClose: () => void;
}

const PriceChangeHeader = ({ onClose }: PriceChangeHeaderProps) => {
  const [t] = useTranslation('global');
  const pricesChangedLabel = t('pricesChanged', 'Prices Have Changed');

  return (
    <section className="p-4 bg-warning-100 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="bg-warning-200 rounded p-2">
          <div className="p-0.5 text-warning-600">
            <Exclamation />
          </div>
        </div>
        <button
          onClick={onClose}
          className="h-6 w-6 flex justify-center items-center"
        >
          <Close />
        </button>
      </div>
      <p className="text-dark-800 text-2xl leading-7 font-semibold">
        {pricesChangedLabel}
      </p>
    </section>
  );
};

export default PriceChangeHeader;
