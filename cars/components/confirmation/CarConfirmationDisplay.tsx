import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import CarConfirmationHeader from './CarConfirmationHeader';
import CarConfirmationBody from './CarConfirmationBody';

interface CarConfirmationDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const CarConfirmationDisplay = ({
  item,
  primaryContact,
  loading,
  setLoading,
  Category,
}: CarConfirmationDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<CarConfirmationHeader item={item} icon={Category.icon} />}
      body={
        <CarConfirmationBody
          item={item}
          primaryContact={primaryContact}
          loading={loading}
          setLoading={setLoading}
        />
      }
    />
  );
};

export default CarConfirmationDisplay;
