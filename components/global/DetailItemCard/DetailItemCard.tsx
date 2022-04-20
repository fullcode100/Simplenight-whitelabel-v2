import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Amount } from 'types/global/Amount';
import { Room } from '../../../hotels/types/response/SearchResponse';
import PriceBreakdownModal from '../PriceBreakdownModal/PriceBreakdownModal';

interface DetailItemCardProps {
  title: string;
  price?: Amount;
  priceBreakdownComponent?: ReactNode;
  room: Room;
}

const DetailItemCard = ({
  title,
  price,
  priceBreakdownComponent,
  room,
}: DetailItemCardProps) => {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const [t, i18next] = useTranslation('global');
  const priceBreakdownLabel = t('priceBreakdown', 'Price breakdown');

  const PriceSection = () =>
    price ? <span>{price.formatted} total</span> : null;

  return (
    <>
      <PriceBreakdownModal
        showPriceBreakdown={showPriceBreakdown}
        onClose={() => setShowPriceBreakdown(false)}
        room={room}
      />
      <section className="flex flex-col border-2 border-dark-200 px-4 py-6 min-w-[20rem]">
        <p className="h5 text-dark-1000">{title}</p>
        <section className="flex mt-4">
          <section className="flex flex-col gap-2">
            <PriceSection />
            <button
              onClick={() => setShowPriceBreakdown(true)}
              className="text-xs text-primary-1000 underline"
            >
              {priceBreakdownLabel}
            </button>
          </section>
          <section></section>
        </section>
        {priceBreakdownComponent}
      </section>
    </>
  );
};

export default DetailItemCard;
