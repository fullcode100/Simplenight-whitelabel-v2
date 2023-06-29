import { ReactElement } from 'react';
import { Item } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import CarGeneralInfo from './CarGeneralInfo';

interface CarConfirmationHeaderProps {
  item?: Item;
  icon: ReactElement;
}

const CarConfirmationHeader = ({ item, icon }: CarConfirmationHeaderProps) => {
  const [t] = useTranslation('cars');
  const carName = item?.booking_data?.car_model;
  const duration = item?.booking_data?.duration;
  const dayText = t('day', 'Day');
  const daysText = t('days', 'Days');
  const roomsLabel = duration === 1 ? dayText : daysText;
  const roomsFormatted = `${duration} ${roomsLabel}`;

  return (
    <>
      <section className="flex flex-row gap-3 p-5 border-b border-dark-300">
        <IconRoundedContainer className="bg-primary-1000">
          <div className="text-white">{icon}</div>
        </IconRoundedContainer>
        <section className="grid gap-1">
          <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-base leading-[22px] lg:text-lg leading-[26px]">
            {carName}
          </section>
          <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
            {roomsFormatted}
          </section>
        </section>
      </section>
      <section className="flex gap-3 p-5">
        <CarGeneralInfo item={item} />
      </section>
    </>
  );
};

export default CarConfirmationHeader;
