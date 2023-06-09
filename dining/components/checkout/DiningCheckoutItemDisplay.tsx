import { CustomerType } from 'dining/types/diningCustom';
import React, { Dispatch, SetStateAction } from 'react';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import DiningItineraryBody from '../itinerary/DiningItineraryBody';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { useTranslation } from 'react-i18next';
import LocationInfo from '../LocationInfo/LocationInfo';
import CheckoutInfo from '../CheckoutInfo/CheckoutInfo';
import BlockDivider from 'components/global/Divider/BlockDivider';

interface DiningCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const DiningCheckoutItemDisplay = ({
  item,
  Category,
}: DiningCheckoutDisplayProps) => {
  const [t] = useTranslation('dining');
  const customer: CustomerType | undefined = item?.customer
    ? {
        firstName: item?.customer?.first_name,
        lastName: item?.customer?.last_name,
        email: item?.customer?.email,
        phone: item?.customer?.phone_number,
        prefix: item?.customer?.phone_prefix,
      }
    : undefined;
  const amountFormatted =
    t('tableFor', 'Table For') + ` ${item?.booking_data?.covers}`;

  return (
    <section className="overflow-hidden border rounded border-dark-300">
      <section className="flex flex-row gap-3 p-5">
        <IconRoundedContainer className="bg-primary-1000">
          <div className="text-white">{Category.icon}</div>
        </IconRoundedContainer>
        <section className="grid gap-1">
          <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px] ">
            {item?.item_data?.name}
          </section>
          <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
            {amountFormatted}
          </section>
        </section>
      </section>
      <BlockDivider />
      <section className="flex items-center gap-2 px-4 py-4">
        <CheckoutInfo
          checkoutDate={item?.booking_data?.date || ''}
          checkoutTime={item?.booking_data?.time || ''}
        />
        {item?.item_data?.location.address ? (
          <LocationInfo address={item?.item_data?.location.address} />
        ) : null}
      </section>
    </section>
  );
};

export default DiningCheckoutItemDisplay;
