import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { CustomerType } from 'dining/types/diningCustom';
import React, { Dispatch, SetStateAction } from 'react';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import DiningItineraryBody from '../itinerary/DiningItineraryBody';
import DiningItineraryFooter from '../itinerary/DiningItineraryFooter';
import DiningItineraryHeader from '../itinerary/DiningItineraryHeader';

interface DiningCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const DiningCheckoutItemDisplay = ({
  item,
  Category,
  reload,
  setReload,
}: DiningCheckoutDisplayProps) => {
  const customer: CustomerType | undefined = item?.customer
    ? {
        firstName: item?.customer?.first_name,
        lastName: item?.customer?.last_name,
        email: item?.customer?.email,
        phone: item?.customer?.phone_number,
        prefix: item?.customer?.phone_prefix,
      }
    : undefined;
  return (
    <>
      <CollapseBordered
        title={
          <DiningItineraryHeader
            item={item}
            icon={Category.icon}
            name={item?.item_data?.name}
            amount={item?.booking_data?.covers}
          />
        }
        body={
          <DiningItineraryBody
            item={item}
            time={item?.booking_data?.time}
            date={item?.booking_data?.date}
            covers={item?.booking_data?.covers}
            customer={customer}
          />
        }
        footer={
          <DiningItineraryFooter
            item={item}
            setReload={setReload}
            reload={reload}
            hideActions
          />
        }
      />
    </>
  );
};

export default DiningCheckoutItemDisplay;
