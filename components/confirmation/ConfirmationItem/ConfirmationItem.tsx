import { Dispatch, SetStateAction } from 'react';

import { Item, Payment } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface ConfirmationItemProps {
  item: Item;
  payment?: Payment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItem = ({
  item,
  payment,
  loading,
  setLoading,
  reload,
  setReload,
}: ConfirmationItemProps) => {
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
  if (sectorName === 'accommodations' || categoryName === 'hotels') {
    sectorName = 'hotels';
  }
  const sector = useCategory(sectorName || '');

  return (
    injectProps(sector?.confirmationDisplay, {
      item: item,
      payment: payment,
      loading: loading,
      setLoading: setLoading,
      customer: item.customer,
      reload: reload,
      setReload: setReload,
    }) ?? null
  );
};

export default ConfirmationItem;
