import { Item } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface CancelledItemProps {
  item: Item;
}

const CancelledItem = ({ item }: CancelledItemProps) => {
  const category = useCategory('hotels');

  return (
    injectProps(category?.cancelledDisplay, {
      item: item,
    }) ?? null
  );
};

export default CancelledItem;
