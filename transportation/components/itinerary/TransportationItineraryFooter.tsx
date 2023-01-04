import React, { Dispatch, FC, SetStateAction } from 'react';
import { Item } from '../../../types/cart/CartType';
import Button from '../../../components/global/Button/Button';
import TrashIcon from '@/icons/assets/small-trash.svg';
import EditIcon from '@/icons/assets/edit.svg';
import { useTranslation } from 'react-i18next';
import { removeFromCart } from '../../../core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import TaxesAndFeesPopover from '../../../hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { Quote } from '../../types/response/TransportationSearchResponse';
import useLocalStorage from '../../../hooks/localStorage/useLocalStorage';

interface TransportationItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  checkout?: boolean;
}

export const TransportationItineraryFooter: FC<
  TransportationItineraryFooterProps
> = ({ item, reload, setReload, checkout = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const quote: Quote = item.booking_data?.transportation;

  const currencyCode = quote?.fare?.currency_code;
  const price = quote?.fare?.price;
  const [lastSearch] = useLocalStorage('lastSearch', '/');

  const removeTransportationFromShoppingCart = () => {
    const transportationToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, transportationToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllTransportation = () => {
    removeTransportationFromShoppingCart();
  };

  const handleEdit = () => {
    removeTransportationFromShoppingCart();
    router.push(lastSearch.toString());
  };

  return (
    <section className="flex items-center gap-6">
      <section className="flex items-center grow">
        <section className="font-normal text-[16px] leading-[22px] text-dark-1000">
          {tg('total')}
        </section>
        <section className="flex flex-col items-end grow">
          <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
            {currencyCode + ' ' + price.toFixed(2)}
          </p>
          <section className="flex flex-row gap-1 justify-end">
            <p className="text-[12px] leading-[15px] text-dark-800">
              Includes Taxes and Fees
            </p>
            <TaxesAndFeesPopover />
          </section>
        </section>
      </section>
      {!checkout ? (
        <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
          <Button
            value={tg('remove')}
            size="full-sm"
            type="outlined"
            leftIcon={<TrashIcon />}
            onClick={handleRemoveAllTransportation}
            className="lg:w-[170px]"
          />
          <Button
            value={tg('edit')}
            translationKey="edit"
            size=""
            leftIcon={<EditIcon />}
            onClick={handleEdit}
            className="lg:w-[170px] h-8"
          />
        </section>
      ) : (
        <></>
      )}
    </section>
  );
};
