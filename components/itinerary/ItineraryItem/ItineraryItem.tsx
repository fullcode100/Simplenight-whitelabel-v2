import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import { Item } from 'types/cart/CartType';

interface ItineraryItemProps {
  item: Item;
}

const ItineraryItem = ({ item }: ItineraryItemProps) => {
  const category = useCategory(item.category?.toLowerCase() || '');
  return injectProps(category?.itineraryDisplay, { item: item }) ?? null;
};

export default ItineraryItem;
