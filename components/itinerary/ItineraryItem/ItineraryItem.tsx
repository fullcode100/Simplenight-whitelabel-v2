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
  if (sectorName === 'food-beverage') {
    sectorName = 'dining';
  }
  if (sectorName === 'parking' || categoryName === 'parking') {
    sectorName = 'parking';
  }
  if (
    sectorName === 'ground-transportation' ||
    categoryName === 'ground-transportation'
  ) {
    sectorName = 'ground-transportation';
  }
  if (sectorName === 'accommodations') {
    sectorName = 'hotels';
  }
  const sector = useCategory(sectorName || '');

  return (
    injectProps(sector?.itineraryDisplay, {
      item: item,
      reload: reload,
      setReload: setReload,
    }) ?? null
  );
};

export default ItineraryItem;
