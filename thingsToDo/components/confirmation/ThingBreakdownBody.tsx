import React, { Dispatch, SetStateAction } from 'react';
import { Customer } from 'types/cart/CartType';
import { Item } from 'types/booking/bookingType';
import ThingGeneralInfo from './ThingGeneralInfo';
import ThingTicketsInfo from './ThingTicketsInfo';

interface Props {
  item: Item;
  customer?: Customer;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  useCollapse?: boolean;
}
const ThingBreakdowBody = ({ item, customer }: Props) => {
  return (
    <>
      <ThingGeneralInfo item={item} customer={customer} />
      <ThingTicketsInfo item={item} />
    </>
  );
};

export default ThingBreakdowBody;
