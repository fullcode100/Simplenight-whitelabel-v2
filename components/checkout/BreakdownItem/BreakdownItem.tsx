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
  const category = useCategory(item.category?.toLowerCase() || '');
  return (
    injectProps(category?.breakdownDisplay, {
      item: item,
      reload: reload,
      setReload: setReload,
    }) ?? null
  );
};

export default CheckoutItem;
