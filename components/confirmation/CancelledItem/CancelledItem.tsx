import { Item, PrimaryContact } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface CancelledItemProps {
  item: Item;
  primaryContact: PrimaryContact;
}

const CancelledItem = ({ item, primaryContact }: CancelledItemProps) => {
  const categoryName =
    item.supplier === 'HOTELBEDS' || item.supplier === 'PRICELINE'
      ? 'hotels'
      : '';
  const category = useCategory(categoryName);

  return (
    injectProps(category?.cancelledDisplay, {
      item: item,
      primaryContact: primaryContact,
    }) ?? null
  );
};

export default CancelledItem;
