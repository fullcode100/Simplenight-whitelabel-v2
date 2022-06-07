import { Item } from 'types/booking/bookingType';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

interface ConfirmationItemProps {
  item: Item;
}

const ConfirmationItem = ({ item }: ConfirmationItemProps) => {
  const categoryName = item.supplier === 'hotelbeds' ? 'hotels' : '';
  const category = useCategory(categoryName);

  return (
    injectProps(category?.confirmationDisplay, {
      item: item,
    }) ?? null
  );
};

export default ConfirmationItem;
