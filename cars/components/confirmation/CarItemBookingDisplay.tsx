import { Dispatch, SetStateAction } from 'react';

import { Item } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CarConfirmationHeader from './CarConfirmationHeader';
import CarConfirmationBody from './CarConfirmationBody';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Paragraph } from '@simplenight/ui';
import { useTranslation } from 'react-i18next';

interface CarConfirmationDisplayProps {
  item?: Item;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const CarItemBookingDisplay = ({
  item,
  loading,
  setLoading,
  Category,
}: CarConfirmationDisplayProps) => {
  const [t, i18next] = useTranslation('cars');
  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');
  return (
    <section className="overflow-hidden rounded border border-dark-300">
      <CarConfirmationHeader item={item} icon={Category.icon} />
      <section className="px-5 border-t border-dark-300">
        <CollapseUnbordered
          title={
            <Paragraph fontWeight="semibold" size="large">
              {priceBreakdownLabel}
            </Paragraph>
          }
          body={
            <CarConfirmationBody
              item={item}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
      </section>
    </section>
  );
};

export default CarItemBookingDisplay;
