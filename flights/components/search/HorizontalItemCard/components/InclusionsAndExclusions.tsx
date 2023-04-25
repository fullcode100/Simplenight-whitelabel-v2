import { Flight } from 'flights/types/response/FlightSearchResponse';

import IconBagCabin from 'public/icons/assets/flights/bag_cabin.svg';
import IconBagChecked from 'public/icons/assets/flights/bag_checked.svg';
import IconSeat from 'public/icons/assets/flights/seat.svg';
import IconRefund from 'public/icons/assets/flights/refund.svg';
import IconReschedule from 'public/icons/assets/flights/reschedule.svg';
import { IconWrapper } from '@simplenight/ui';

const InclusionsAndExclusions = ({ item }: { item: Flight }) => {
  return (
    <section className="flex items-center gap-1 shrink-0">
      <IconWrapper size={16}>
        <IconBagCabin className=" text-dark-500" />
      </IconWrapper>
      <IconWrapper size={16}>
        <IconBagChecked className=" text-dark-500" />
      </IconWrapper>
      <IconWrapper size={16}>
        <IconSeat className=" text-dark-500" />
      </IconWrapper>
      <IconWrapper size={16}>
        <IconRefund className=" text-dark-500" />
      </IconWrapper>
      <IconWrapper size={16}>
        <IconReschedule className=" text-dark-500" />
      </IconWrapper>
    </section>
  );
};

export default InclusionsAndExclusions;
