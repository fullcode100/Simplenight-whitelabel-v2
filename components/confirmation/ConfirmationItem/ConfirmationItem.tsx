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
  const category = useCategory(item.category?.toLowerCase() || '');

  return (
    injectProps(category?.confirmationDisplay, {
      item: item,
      payment: payment,
      loading: loading,
      setLoading: setLoading,
    }) ?? null
  );
};

export default ConfirmationItem;
