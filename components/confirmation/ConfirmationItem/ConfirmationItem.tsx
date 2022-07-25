import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface ConfirmationItemProps {
  item: Item;
  primaryContact: PrimaryContact;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItem = ({
  item,
  primaryContact,
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
      loading: loading,
      setLoading: setLoading,
    }) ?? null
  );
};

export default ConfirmationItem;
