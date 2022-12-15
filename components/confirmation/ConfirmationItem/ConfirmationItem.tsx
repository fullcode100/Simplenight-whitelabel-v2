import { Dispatch, SetStateAction } from 'react';

import { Item, Payment } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface ConfirmationItemProps {
  item: Item;
  payment?: Payment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItem = ({
  item,
  payment,
  loading,
  setLoading,
}: ConfirmationItemProps) => {
  let sectorName = item.sector?.toLowerCase();
  const categoryName = item.category?.toLowerCase();
  if (categoryName === 'shows-events') sectorName = 'shows-events';
  const sector = useCategory(sectorName || '');

  return (
    injectProps(sector?.confirmationDisplay, {
      item: item,
      payment: payment,
      loading: loading,
      setLoading: setLoading,
      customer: item.customer,
    }) ?? null
  );
};

export default ConfirmationItem;
