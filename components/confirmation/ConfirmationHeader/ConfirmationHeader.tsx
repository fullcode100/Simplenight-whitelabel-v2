import { Booking } from 'types/booking/bookingType';

interface ConfirmationHeaderProps {
  booking: Booking;
}

const ConfirmationHeader = ({ booking }: ConfirmationHeaderProps) => {
  console.log(booking);
  return <></>;
};

export default ConfirmationHeader;
