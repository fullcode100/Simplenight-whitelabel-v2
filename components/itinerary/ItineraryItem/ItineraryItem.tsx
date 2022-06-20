import { Dispatch, SetStateAction } from 'react';

import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import { Item } from 'types/cart/CartType';

interface ItineraryItemProps {
  item: Item;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const ItineraryItem = ({ item, reload, setReload }: ItineraryItemProps) => {
  const category = useCategory(item.category?.toLowerCase() || '');
  return (
    injectProps(category?.itineraryDisplay, {
      item: item,
      reload: reload,
      setReload: setReload,
    }) ?? null
  );
};

export default ItineraryItem;
