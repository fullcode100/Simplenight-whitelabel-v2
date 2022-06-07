import { ReactElement } from 'react';
import { Item } from 'types/booking/bookingType';

interface HotelConfirmationHeaderProps {
  item?: Item;
  icon: ReactElement;
}

const HotelConfirmationHeader = ({
  item,
  icon,
}: HotelConfirmationHeaderProps) => {
  return <>Header</>;
};

export default HotelConfirmationHeader;
