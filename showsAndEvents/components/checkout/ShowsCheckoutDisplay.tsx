import { useTranslation } from 'react-i18next';

import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { usePlural } from 'hooks/stringBehavior/usePlural';

import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import ShowsItineraryHeader from '../itinerary/ShowsItineraryHeader';

interface ShowsCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const ShowsCheckoutDisplay = ({
  item,
  Category,
}: ShowsCheckoutDisplayProps) => {
  return <ShowsItineraryHeader item={item} icon={Category.icon} />;
};

export default ShowsCheckoutDisplay;
