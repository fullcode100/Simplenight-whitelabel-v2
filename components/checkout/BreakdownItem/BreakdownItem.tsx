import { Dispatch, SetStateAction } from 'react';

import { injectProps } from 'helpers/reactUtils';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { Item } from 'types/cart/CartType';

interface CheckoutItemProps {
  item: Item;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const CheckoutItem = ({ item, reload, setReload }: CheckoutItemProps) => {
  let sectorName = item.sector?.toLowerCase();
  const categoryName = item.category?.toLowerCase();
  if (categoryName === 'shows-events') sectorName = 'shows-events';
  if (sectorName === 'flights' || categoryName === 'flights')
    sectorName = 'flights';
  if (
    sectorName === 'cars' ||
    sectorName === 'car-rental' ||
    categoryName === 'cars' ||
    categoryName === 'car-rental'
  )
    sectorName = 'car-rental';
  if (sectorName === 'accommodations') {
    sectorName = 'hotels';
  }
  const sector = useCategory(sectorName || '');
  return (
    injectProps(sector?.breakdownDisplay, {
      item: item,
      reload: reload,
      setReload: setReload,
    }) ?? null
  );
};

export default CheckoutItem;
