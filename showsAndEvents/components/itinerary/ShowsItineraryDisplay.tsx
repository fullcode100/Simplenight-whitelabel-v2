import { Dispatch, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item } from 'types/cart/CartType';
import ShowsItineraryHeader from './ShowsItineraryHeader';
import ShowsItineraryDisclaimer from './ShowsItineraryDisclaimer';
import ShowsItineraryBody from './ShowsItineraryBody';
import ShowsItineraryFooter from './ShowsItineraryFooter';

interface ShowsItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const ShowsItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: ShowsItineraryDisplayProps) => {
  return (
    <CollapseBordered
      disclaimer={<ShowsItineraryDisclaimer item={item} />}
      title={<ShowsItineraryHeader item={item} icon={Category.icon} />}
      body={<ShowsItineraryBody item={item} />}
      footer={<ShowsItineraryFooter item={item} />}
    />
  );
};

export default ShowsItineraryDisplay;
