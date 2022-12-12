import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';
import { Item } from 'types/cart/CartType';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface CarItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const CarItineraryFooter = ({
  item,
  reload,
  setReload,
}: CarItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('cars');

  const removeLabel = tg('remove', 'Remove');
  const carText = th('car', 'Car');
  const removeCarsFormatted = `${removeLabel} ${carText}`;

  const editLabel = tg('edit', 'Edit');

  const totalRate = item.rate?.min_rate?.rate;

  const removeAllCars = () => {
    const carToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, carToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllCars = () => {
    removeAllCars();
  };

  const handleEdit = () => {
    removeAllCars();
    // router.push(`/detail/car-rental/${item.extended_data?.id}`);
    router.push('/}');
  };

  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
        <Button
          value={removeCarsFormatted}
          size="full-sm"
          type="outlined"
          leftIcon={<TrashIcon />}
          onClick={handleRemoveAllCars}
          className="lg:w-[170px]"
        ></Button>
        <Button
          value={editLabel}
          translationKey="edit"
          size=""
          leftIcon={<EdtiIcon />}
          onClick={handleEdit}
          className="lg:w-[170px] h-8"
        ></Button>
      </section>
    </section>
  );
};

export default CarItineraryFooter;
