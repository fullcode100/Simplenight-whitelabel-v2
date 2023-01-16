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
import { Parking } from '../../types/response/ParkingSearchResponse';
import useLocalStorage from '../../../hooks/localStorage/useLocalStorage';

interface ParkingItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

export const ParkingItineraryFooter: FC<ParkingItineraryFooterProps> = ({
  item,
  reload,
  setReload,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const parking: Parking = item.booking_data?.parking;

  const staticDetails = parking.properties.static;
  const currencyCode = staticDetails.rate_tables?.currency_code;
  const currency = staticDetails.rate_tables?.currency;
  const isCurrencyAndCodeSame = currencyCode === currency;
  const price = 0;
  const [lastSearch] = useLocalStorage('lastSearch', '/');

  const removeParkingFromShoppingCart = () => {
    const flightToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, flightToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllFlights = () => {
    removeParkingFromShoppingCart();
  };

  const handleEdit = () => {
    removeParkingFromShoppingCart();
    router.push(localStorage.getItem('parkingLastSearch') || '/');
  };

  return (
    <section className="flex items-center gap-6">
      <section className="flex items-center grow">
        <section>{tg('total')}</section>
        <section className="flex flex-col items-end grow">
          <p className="text-lg leading-[18px] text-dark-1000">
            {isCurrencyAndCodeSame
              ? `${currencyCode} `
              : `${currencyCode}${currency}`}
            {price.toFixed(2)}
          </p>
          <section className="flex flex-row gap-1 justify-end">
            <p className="text-[12px] leading-[15px] text-dark-800">
              Includes Taxes and Fees
            </p>
            <TaxesAndFeesPopover />
          </section>
        </section>
      </section>
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
        <Button
          value={tg('remove')}
          size="full-sm"
          type="outlined"
          leftIcon={<TrashIcon />}
          onClick={handleRemoveAllFlights}
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
    </section>
  );
};
