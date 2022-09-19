import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import FlightConfirmationHeader from './FlightConfirmationHeader';
import FlightConfirmationBody from './FlightConfirmationBody';

interface FlightConfirmationDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const FlightConfirmationDisplay = ({
  item,
  primaryContact,
  loading,
  setLoading,
  Category,
}: FlightConfirmationDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<FlightConfirmationHeader item={item} icon={Category.icon} />}
      body={
        <FlightConfirmationBody
          item={item}
          primaryContact={primaryContact}
          loading={loading}
          setLoading={setLoading}
        />
      }
    />
  );
};

export default FlightConfirmationDisplay;
