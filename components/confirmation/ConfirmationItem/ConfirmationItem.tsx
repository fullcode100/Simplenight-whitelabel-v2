import { Item, PrimaryContact } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface ConfirmationItemProps {
  item: Item;
  primaryContact: PrimaryContact;
}

const ConfirmationItem = ({ item, primaryContact }: ConfirmationItemProps) => {
  const categoryName = item.supplier === 'hotelbeds' ? 'hotels' : '';
  const category = useCategory(categoryName);

  return (
    injectProps(category?.confirmationDisplay, {
      item: item,
      primaryContact: primaryContact,
    }) ?? null
  );
};

export default ConfirmationItem;
