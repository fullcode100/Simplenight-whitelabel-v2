import { Dispatch, SetStateAction } from 'react';

import { Item, Payment, PrimaryContact } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface ConfirmationItemProps {
  item: Item;
  primaryContact?: PrimaryContact;
  payment?: Payment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItem = ({
  item,
  primaryContact,
  payment,
  loading,
  setLoading,
}: ConfirmationItemProps) => {
  const categoryName =
    item.supplier === 'HOTELBEDS' || item.supplier === 'PRICELINE'
      ? 'hotels'
      : '';
  const category = useCategory(categoryName);

  return (
    injectProps(category?.confirmationDisplay, {
      item: item,
      primaryContact: primaryContact,
      payment: payment,
      loading: loading,
      setLoading: setLoading,
    }) ?? null
  );
};

export default ConfirmationItem;
