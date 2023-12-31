import { Item } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface CancelledItemProps {
  item: Item;
}

const CancelledItem = ({ item }: CancelledItemProps) => {
  let sectorName = item.sector?.toLowerCase();
  const categoryName = item.category?.toLowerCase();
  if (categoryName === 'shows-events') sectorName = 'shows-events';
  if (sectorName === 'food-beverage') {
    sectorName = 'dining';
  }
  if (sectorName === 'accommodations' || categoryName === 'hotels') {
    sectorName = 'hotels';
  }
  if (sectorName === 'flights' || categoryName === 'flights') {
    sectorName = 'flights';
  }

  const sector = useCategory(sectorName || '');

  return (
    injectProps(sector?.cancelledDisplay, {
      item: item,
    }) ?? null
  );
};

export default CancelledItem;
