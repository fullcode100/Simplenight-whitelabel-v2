import React, { Dispatch, SetStateAction, useState } from 'react';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item } from 'types/cart/CartType';
import DiningItineraryHeader from './DiningItineraryHeader';
import DiningItineraryFooter from './DiningItineraryFooter';
import DiningItineraryDisclaimer from './DiningItineraryDisclaimer';
import DiningItineraryBody from './DiningItineraryBody';
import { useEffect } from 'react';
import i18next from 'i18next';
import {
  DiningSearchResponse,
  Restaurant,
} from 'dining/types/response/SearchResponse';
import { DiningDetailPreRequest } from 'dining/types/request/DiningDetailRequest';

interface DiningItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const DiningItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: DiningItineraryDisplayProps) => {
  const [selectedItem, setSelectedItem] = useState<Restaurant | null>(null);
  const name = selectedItem?.name;

  useEffect(() => {
    if (item?.booking_data?.inventory_id) {
      const id = (item?.booking_data?.inventory_id as string).split(':');
      const params: DiningDetailPreRequest = {
        id: id[1],
        start_date: item?.booking_data?.date,
        end_date: item?.booking_data?.date,
      };
      Category.core.ClientDetailer?.request(params, i18next, params.id)
        .then(({ items }: DiningSearchResponse) => {
          setSelectedItem(items[0]);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [item?.booking_data?.inventory_id]);

  return (
    <CollapseBordered
      disclaimer={<DiningItineraryDisclaimer item={item} />}
      title={
        <DiningItineraryHeader
          item={item}
          icon={Category.icon}
          name={name}
          amount={item?.booking_data?.covers}
        />
      }
      body={
        <DiningItineraryBody
          item={item}
          name={name}
          time={item?.booking_data?.time}
          date={item?.booking_data?.date}
          covers={item?.booking_data?.covers}
        />
      }
      footer={
        <DiningItineraryFooter
          item={item}
          setReload={setReload}
          reload={reload}
        />
      }
    />
  );
};

export default DiningItineraryDisplay;
