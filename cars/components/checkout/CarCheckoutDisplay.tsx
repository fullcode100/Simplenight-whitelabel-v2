import { useTranslation } from 'react-i18next';

import Paragraph from 'components/global/Typography/Paragraph';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';

import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import dayjs from 'dayjs';

interface CarCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const CarCheckoutDisplay = ({ item, Category }: CarCheckoutDisplayProps) => {
  const [t, i18n] = useTranslation('cars');
  const daysLabel = t('days', 'Day(s)');
  const days = Math.floor(
    dayjs(item?.booking_data?.search?.end_date as string).diff(
      dayjs(item?.booking_data?.search?.start_date as string),
      'day',
      true,
    ),
  );

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{Category.icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 text-[20px] leading-[20px]">
          <section className="flex flex-row">
            {item?.booking_data?.car.VehAvailCore.Vehicle.VehMakeModel['@Name']}
          </section>
        </section>
        <section className="font-normal text-dark-700 text-[14px] leading-[17px]">
          {days} {daysLabel}
        </section>
      </section>
    </section>
  );
};

export default CarCheckoutDisplay;
