import { Dispatch, SetStateAction } from 'react';

import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import { Item } from 'types/cart/CartType';
import { useCategorySlug } from '../../../hooks/category/useCategory';

interface ItineraryItemProps {
  item: Item;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const ItineraryItem = ({ item, reload, setReload }: ItineraryItemProps) => {
  let categoryName = item.category?.toLowerCase() || '';
  if (categoryName === 'car-rental') categoryName = 'cars'; // name fix
  const category = useCategory(categoryName);

  const sector = useCategory(item?.sector || '');

  return (
    injectProps(sector?.itineraryDisplay, {
      item: item,
      reload: reload,
      setReload: setReload,
    }) ?? null
  );
};

export default ItineraryItem;
