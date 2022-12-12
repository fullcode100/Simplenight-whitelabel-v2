import { Dispatch, SetStateAction } from 'react';
import { Customer } from 'types/cart/CartType';
import ThingGeneralInfo from './ThingGeneralInfo';
import ThingTicketsInfo from './ThingTicketsInfo';

interface ThingsItineraryBodyProps {
  item: any;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ThingsItineraryBody = ({ item }: ThingsItineraryBodyProps) => {
  return (
    <>
      <ThingGeneralInfo item={item} />
      <ThingTicketsInfo item={item} />
    </>
  );
};

export default ThingsItineraryBody;
