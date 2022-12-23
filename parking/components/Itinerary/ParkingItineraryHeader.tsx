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
  console.log({ item });
  const parking: Parking = item.booking_data?.parking;
  const title = parking.properties.static.address.street.formatted;
  const street = parking.properties.static.type === 'ON_STREET';
  return (
    <header className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000 text-white">
        {icon}
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 text-[20px] leading-[20px]">
          {title}
        </section>
        <section className="font-normal text-dark-700 text-[14px] leading-[17px]">
          {t(street ? 'street' : 'garages')}
        </section>
      </section>
    </header>
  );
};
