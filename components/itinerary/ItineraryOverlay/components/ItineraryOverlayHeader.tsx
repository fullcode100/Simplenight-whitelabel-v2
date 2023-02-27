import { Paragraph } from '@simplenight/ui';
import React from 'react';
import Close from 'public/icons/assets/cross.svg';
import { useTranslation } from 'react-i18next';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface HeaderProps {
  totalAmount?: string;
  itemsQty?: number;
  onClose: () => void;
}

const ItineraryOverlayHeader = ({
  totalAmount,
  itemsQty,
  onClose,
}: HeaderProps) => {
  const [t] = useTranslation('global');
  const tTotal = t('total', 'Total');
  const tItinerary = t('itinerary', 'Itinerary');
  const tItems = t('items', 'Items');
  const tItem = t('item', 'Item');
  const itemsText = usePlural(itemsQty ?? 0, tItem, tItems);

  return (
    <header
      className={
        'sticky flex justify-between items-center py-[18px] px-5 bg-dark-100 shadow-container border-b border-dark-200 text-dark-1000'
      }
    >
      <section className="flex gap-1 ">
        {totalAmount ? (
          <>
            <Paragraph
              size="medium"
              fontWeight="semibold"
              textColor="text-primary-1000"
            >
              {totalAmount}
            </Paragraph>
            <Paragraph
              size="medium"
              fontWeight="semibold"
              textColor="text-dark-1000"
            >
              {tTotal}
            </Paragraph>
          </>
        ) : (
          <Paragraph
            size="medium"
            fontWeight="semibold"
            textColor="text-dark-1000"
          >
            {tItinerary}
          </Paragraph>
        )}
      </section>
      <section className="flex items-center justify-end gap-7">
        {itemsQty && (
          <section className="flex gap-1 ">
            <Paragraph
              size="medium"
              fontWeight="semibold"
              textColor="text-primary-1000"
            >
              {itemsQty.toString()}
            </Paragraph>
            <Paragraph
              size="medium"
              fontWeight="semibold"
              textColor="text-dark-1000"
            >
              {itemsText}
            </Paragraph>
          </section>
        )}
        <button onClick={onClose}>
          <Close />
        </button>
      </section>
    </header>
  );
};

export default ItineraryOverlayHeader;
