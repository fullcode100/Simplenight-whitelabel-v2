import { Dispatch, FC, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item } from 'types/cart/CartType';
import { ParkingItineraryHeader } from './ParkingItineraryHeader';
import { ParkingItineraryBody } from './ParkingItineraryBody';
import { ParkingItineraryFooter } from './ParkingItineraryFooter';

interface Index {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

export const ParkingItineraryDisplay: FC<Index> = ({
  item = {},
  reload,
  setReload,
  Category,
}) => {
  return (
    <CollapseBordered
      title={<ParkingItineraryHeader item={item} icon={Category.icon} />}
      body={<ParkingItineraryBody item={item} />}
      footer={
        <ParkingItineraryFooter
          item={item}
          reload={reload}
          setReload={setReload}
        />
      }
    />
  );
};
