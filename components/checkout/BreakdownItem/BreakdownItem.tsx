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
