import { Dispatch, SetStateAction } from 'react';

import { Item, Payment, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import HotelConfirmationHeader from './HotelConfirmationHeader';
import HotelConfirmationBody from './HotelConfirmationBody';

interface HotelConfirmationDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  payment?: Payment;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const HotelConfirmationDisplay = ({
  item,
  primaryContact,
  payment,
  loading,
  setLoading,
  Category,
}: HotelConfirmationDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelConfirmationHeader item={item} icon={Category.icon} />}
      body={
        <HotelConfirmationBody
          item={item}
          primaryContact={primaryContact}
          payment={payment}
          loading={loading}
          setLoading={setLoading}
        />
      }
    />
  );
};

export default HotelConfirmationDisplay;
