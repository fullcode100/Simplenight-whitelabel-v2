import { Dispatch, SetStateAction } from 'react';

import { Item, Payment } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import HotelConfirmationHeader from './HotelConfirmationHeader';
import HotelConfirmationBody from './HotelConfirmationBody';

interface HotelConfirmationDisplayProps {
  item?: Item;
  payment?: Payment;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  modalMode?: boolean;
}

const HotelConfirmationDisplay = ({
  item,
  payment,
  loading,
  setLoading,
  Category,
  modalMode = false,
}: HotelConfirmationDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelConfirmationHeader item={item} icon={Category.icon} />}
      body={
        <HotelConfirmationBody
          modalMode={modalMode}
          item={item}
          payment={payment}
          loading={loading}
          setLoading={setLoading}
        />
      }
    />
  );
};

export default HotelConfirmationDisplay;
