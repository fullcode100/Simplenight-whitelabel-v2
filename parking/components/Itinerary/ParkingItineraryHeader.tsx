import { FC, ReactElement } from 'react';
import { Item } from '../../../types/cart/CartType';
import IconRoundedContainer from '../../../components/global/IconRoundedContainer/IconRoundedContainer';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { useTranslation } from 'react-i18next';

interface ParkingItineraryFooterProps {
  item: Item;
  icon: ReactElement;
}

export const ParkingItineraryHeader: FC<ParkingItineraryFooterProps> = ({
  item,
  icon,
}) => {
  const [t] = useTranslation('parking');
  const parking: Parking = item.booking_data?.parking;
  const info = parking.properties.static;
  const { street, postcode, city, country } = info.address;

  const formatted = `${street.formatted}, ${city}, ${country}, ${postcode}`;

  const type = parking.properties.static.type === 'ON_STREET';
  return (
    <header className="flex flex-row gap-3">
      <IconRoundedContainer className="text-white bg-primary-1000">
        {icon}
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 text-[20px] leading-[20px]">
          {formatted}
        </section>
        <section className="font-normal text-dark-700 text-[14px] leading-[17px]">
          {t(type ? 'street' : 'garages')}
        </section>
      </section>
    </header>
  );
};
