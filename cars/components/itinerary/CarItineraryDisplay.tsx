import { Dispatch, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import CarItineraryHeader from './CarItineraryHeader';
import CarItineraryBody from './CarItineraryBody';
import CarItineraryFooter from './CarItineraryFooter';
import { Item } from 'types/cart/CartType';

interface CarItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const CarItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: CarItineraryDisplayProps) => {
  return (
    <CollapseBordered
      title={<CarItineraryHeader item={item} icon={Category.icon} />}
      body={<CarItineraryBody item={item} />}
      footer={
        <CarItineraryFooter item={item} reload={reload} setReload={setReload} />
      }
    />
  );
};

export default CarItineraryDisplay;
