import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { CustomerType } from 'dining/types/diningCustom';
import React from 'react';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import DiningItineraryBody from '../itinerary/DiningItineraryBody';
import DiningItineraryHeader from '../itinerary/DiningItineraryHeader';

interface DiningCancelledDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const DiningCancelledDisplay = ({
  item,
  Category,
}: DiningCancelledDisplayProps) => {
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
    <CollapseUnbordered
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
          bookingId={item?.booking_item_id}
          supplierId={item?.booking_data?.reservation_id}
        />
      }
    />
  );
};

export default DiningCancelledDisplay;
