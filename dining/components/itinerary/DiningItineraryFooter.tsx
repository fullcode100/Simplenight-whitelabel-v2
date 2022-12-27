import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import { Item } from 'types/cart/CartType';
import Paragraph from 'components/global/Typography/Paragraph';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useCategoryType } from 'hooks/category/useCategory';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import { notification } from 'components/global/Notification/Notification';

interface DiningItineraryFooterProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  hideActions?: boolean;
}
const DiningItineraryFooter = ({
  item,
  reload,
  setReload,
  hideActions,
}: DiningItineraryFooterProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const slug = useCategoryType('dining')?.slug;
  const [t, i18n] = useTranslation(['global', 'dining']);

  const removeItem = () => {
    const itemToRemove = {
      cartId: item?.cart_id,
      itemId: item?.cart_item_id,
    };
    removeFromCart(i18n, itemToRemove, dispatch)
      .then(() => {
        setReload?.(!reload);
        notification(
          t('dining:updatedCart'),
          t('dining:removedDiningItemFromCart', {
            restaurant: item?.item_data?.name,
          }),
          'success',
        );
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = () => {
    removeItem();
    const realId = (item?.booking_data?.inventory_id as string).split(':');
    router.push(
      `/detail/${slug}/${realId[1]}?startDate=${item?.booking_data?.date}&endDate=${item?.booking_data?.date}&covers=${item?.booking_data?.covers}&time=${item?.booking_data?.time}`,
    );
  };

  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col items-center justify-between lg:flex-row">
        <section className="flex justify-between w-full pb-4 lg:pb-0">
          <Paragraph size="small" fontWeight="normal">
            {t('total')}
          </Paragraph>
          <section className="ml-auto text-right">
            <section className="flex flex-col justify-end gap-1">
              <p className="font-semibold text-[18px] leading-[18px] text-dark-1000">
                {t('dining:free')}
              </p>
              <p className="flex">
                {t('includesTaxesAndFees')}
                <InfoCircle className="self-center w-3 h-3 ml-2" />
              </p>
            </section>
          </section>
        </section>
        {!hideActions && (
          <section className="flex flex-col w-full gap-3 lg:flex-row lg:justify-end">
            <Button
              value={t('remove')}
              size="full-sm"
              type="outlined"
              leftIcon={<TrashIcon />}
              className="lg:w-[170px]"
              onClick={removeItem}
            ></Button>
            <Button
              value={t('edit')}
              translationKey="edit"
              size=""
              leftIcon={<EdtiIcon />}
              className="lg:w-[170px] h-8"
              onClick={handleEdit}
            ></Button>
          </section>
        )}
      </section>
    </section>
  );
};

export default DiningItineraryFooter;
