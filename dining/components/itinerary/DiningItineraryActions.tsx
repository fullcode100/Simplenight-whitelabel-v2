import React from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import Button from 'components/global/Button/Button';
import TrashIcon from 'public/icons/assets/small-trash.svg';
import { Item } from 'types/cart/CartType';
import { removeFromCart } from 'core/client/services/CartClientService';
import { notification } from 'components/global/Notification/Notification';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useCategoryType } from 'hooks/category/useCategory';
import EdtiIcon from 'public/icons/assets/edit.svg';

interface DiningItineraryFooterProps {
  item?: Item;
  fullWidth?: boolean;
  onReload: () => void;
}

const DiningItineraryActions = ({
  item,
  fullWidth,
  onReload,
}: DiningItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const slug = useCategoryType('dining')?.slug;
  const [t, i18n] = useTranslation(['global', 'dining']);
  const removeItem = () => {
    const itemToRemove = {
      cartId: item?.cart_id,
      itemId: item?.cart_item_id,
    };
    removeFromCart(i18n, itemToRemove, dispatch)
      .then(() => {
        onReload();
        notification(
          t('dining:updatedCart'),
          t('dining:removedDiningItemFromCart', {
            restaurant: item?.item_data?.name,
          }),
          'success',
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (router.asPath === '/itinerary') {
          router.reload();
        }
      });
  };

  const handleEdit = () => {
    removeItem();
    const realId = (item?.booking_data?.inventory_id as string).split(':');
    router.push(
      `/detail/${slug}/${realId[1]}?startDate=${item?.booking_data?.date}&endDate=${item?.booking_data?.date}&covers=${item?.booking_data?.covers}&time=${item?.booking_data?.time}`,
    );
  };

  return (
    <section
      className={classnames('flex w-full gap-3 flex-col', {
        ['lg:flex-row lg:justify-end flex-col']: !fullWidth,
        ['lg:flex-row mt-4']: fullWidth,
      })}
    >
      <Button
        value={t('remove')}
        size="full-sm"
        type="outlined"
        leftIcon={<TrashIcon />}
        className={classnames({ ['lg:w-[170px]']: !fullWidth })}
        onClick={removeItem}
      ></Button>
      <Button
        value={t('edit')}
        translationKey="edit"
        size=""
        leftIcon={<EdtiIcon />}
        className={classnames('h-8', { ['lg:w-[170px]']: !fullWidth })}
        onClick={handleEdit}
      ></Button>
    </section>
  );
};

export default DiningItineraryActions;
