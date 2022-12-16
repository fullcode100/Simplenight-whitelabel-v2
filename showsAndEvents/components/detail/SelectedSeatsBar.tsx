import React, { useMemo } from 'react';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import TicketIcon from 'public/icons/categories/ticket.svg';
import TrashIcon from 'public/icons/assets/trash.svg';
import PlusIcon from 'public/icons/assets/Plus.svg';
import CheckIcon from 'public/icons/assets/check.svg';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Button from 'components/global/Button/Button';
import { useState } from 'react';
import { addToCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classnames from 'classnames';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import { CartClientResponse } from 'types/cart/CartType';

interface selectedSeatsProp {
  name: string;
  sector: string;
  row: string;
  title: string;
  quantity: any;
  basePrice: number;
  discountPercent: number;
  discountAmount: number;
  taxes: number;
  cancellationPolicy: string;
  currency: string;
  deliveryMethods: string[];
  bookingCodeSupplier: string;
}

interface SelectedSeatsBarProps {
  selectedSeats: selectedSeatsProp[];
  hideBar: () => void;
  name: string;
  deliveryMethods: string[];
  cancellationPolicy: string;
  category: string;
  id: string;
  startDate: string;
  endDate: string;
}

const SelectedSeatsBar = ({
  selectedSeats,
  hideBar,
  name,
  deliveryMethods,
  cancellationPolicy,
  category,
  id,
  startDate,
  endDate,
}: SelectedSeatsBarProps) => {
  const [t, i18next] = useTranslation('things');
  const [et] = useTranslation('events');
  const [gt] = useTranslation('global');
  const sectorLabel = t('sector', 'Sector');
  const rowLabel = t('row', 'Row');
  const ticketLabel = t('ticket', 'Ticket');
  const ticketsLabel = t('tickets', 'Tickets');
  const basePriceText = et('basePrice', 'Base Prices');
  const taxesText = gt('taxes', 'Taxes');
  const payNowText = gt('payNow', 'Pay Now');
  const totalText = gt('total', 'Total');
  const includesTaxesAndFeesText = gt(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  const totalTickets = useMemo(() => {
    return selectedSeats.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
  }, [selectedSeats]);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };

  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const generateItemToBook = (ticket: selectedSeatsProp) => {
    return {
      booking_data: {
        inventory_id: id,
        booking_code_supplier: ticket.bookingCodeSupplier,
        start_date: startDate,
        end_date: endDate,
        seats: ticket.quantity,
        delivery_method: ticket.deliveryMethods[0],
      },
      category: category,
    };
  };

  const handleAction = async (url: string) => {
    setIsDisabled(true);
    const { state: currentState } = store as any;
    let currentCartId = currentState.cartStore.cart ?? null;
    for (const ticket of selectedSeats) {
      const item: CartClientResponse | undefined = await addToCart(
        generateItemToBook(ticket),
        i18next,
        {
          ...store,
          state: {
            ...store.state,
            cartStore: { cart: currentCartId },
          },
        },
      );
      if (!currentCartId) {
        currentCartId = item?.cart?.cart_id || null;
      }
    }
    router.replace(url);
  };
  const [isFreeCacellationPolicy, setIsFreeCacellationPolicy] = useState(false);
  const [showDeliveryMethodMenu, setShowDeliveryMethodMenu] = useState(false);

  useEffect(() => {
    setIsFreeCacellationPolicy(cancellationPolicy?.includes('Free'));
  }, [cancellationPolicy]);

  const deliveryMethodMenu = (
    <section className="w-full relative col-span-8 pr-5">
      <section
        className={`absolute left-2 z-[15] border border-dark-300 rounded shadow-container top-10 bg-white w-[256px] lg:w-[300px] right-0 transition-all duration-500 text-dark-1000 ${
          !showDeliveryMethodMenu && 'opacity-0 invisible'
        }`}
      >
        {/* TODO: needs implemt */}
        {/* <RadioGroup gap="gap-0"> */}
        {deliveryMethods?.map((option, i) => (
          <div
            key={i}
            // value={option}
            className={`px-3 py-2 cursor-pointer ${
              i < deliveryMethods.length - 1 && 'border-b border-dark-200'
            }`}
          >
            {option}
          </div>
        ))}
        {/* </RadioGroup> */}
      </section>

      <section className="w-full items-center justify-end pt-3 pb-3 ">
        <section className="flex relative justify-end items-center gap-2 px-2 pb-1 rounded bg-primary-100 lg:px-0 lg:bg-gray-100">
          <button
            className="flex items-center gap-1 justify-between w-full py-1 px-2"
            onClick={() => setShowDeliveryMethodMenu(!showDeliveryMethodMenu)}
            onBlur={() => setShowDeliveryMethodMenu(false)}
          >
            <span className="text-xs font-semibold text-dark-1000">
              Delivery Method
            </span>
            <span className="text-dark-800">
              <Chevron />
            </span>
          </button>
        </section>
      </section>
    </section>
  );

  return (
    <section className="h-full flex flex-col justify-between">
      <section className="">
        <section className="hidden lg:grid grid-cols-7 border-b-2 py-6 pl-5 row-start-1 row-span-1">
          <div className="col-span-1 items-center flex">
            <IconRoundedContainer className="bg-primary-1000 inline-flex">
              <TicketIcon className="-rotate-30 text-white h-5 w-5 lg:h-[40px] lg:w-[40px]" />
            </IconRoundedContainer>
          </div>
          <div className="col-span-6 pr-2">
            <p className="text-base font-semibold truncate">{name}</p>
            <p>
              {totalTickets} {totalTickets > 1 ? ticketsLabel : ticketLabel}
            </p>
          </div>
        </section>
      </section>
      <section className="hidden lg:block overflow-y-scroll flex flex-col flex-grow">
        {/* {deliveryMethodMenu} */}
        {selectedSeats.map((item, i) => (
          <section
            key={i}
            className="max-h-20 grid grid-cols-8 border-b-2 py-3 pl-5 h-screen items-center"
          >
            <div className="col-span-4 xl:col-span-5">
              <p className="text-base font-semibold truncate">
                {`${rowLabel} ${item.row}`}{' '}
                <span className="text-base text-dark-700">{`${sectorLabel} ${item.sector}`}</span>
              </p>
              <p className="text-sm">
                {item.quantity} {item.quantity > 1 ? ticketsLabel : ticketLabel}
              </p>
            </div>
            <div className="col-span-3 xl:col-span-2 items-center">
              <div className={'flex flex-col text-right '}>
                <div className="gap-1 font-semibold">
                  <div className="">
                    <p className="text-base leading-6 m-0">
                      {item.currency}$ {item.basePrice + item.taxes}
                    </p>
                  </div>
                </div>
                <div className="gap-1 font-normal">
                  <p className="text-0xs leading-tight capitalize m-0">
                    Total {item.currency}$
                    {item.quantity * (item.basePrice + item.taxes)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center">
              <TrashIcon
                className="text-gray-800 h-5 w-5 lg:h-[20px] lg:w-[18px] cursor-pointer"
                onClick={hideBar}
              />
            </div>
          </section>
        ))}
        {selectedSeats.map((item, i) => (
          <section key={i} className="px-5 pt-2">
            <div className="flex justify-between">
              <div className="flex items-center text-primary-1000">
                <PlusIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
                <p className="pl-2 text-gray-800">
                  x{item.quantity}{' '}
                  {item.quantity > 1 ? ticketsLabel : ticketLabel}
                </p>
              </div>
              <div className="flex items-center text-gray-500">
                <p className="text-xs pr-2 line-through">
                  {item.currency}$
                  {item.quantity * (item.basePrice + item.taxes)}
                </p>
                <p className="text-primary-1000">{item.discountPercent} Off</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p>
                {item.currency}${item.quantity * (item.basePrice + item.taxes)}
              </p>
            </div>
          </section>
        ))}
        <div className="flex justify-between pt-1.5 border-b-2 pb-2 px-5">
          <div className="flex items-center text-primary-1000">
            <PlusIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
            <p className="pl-2 text-gray-800">{taxesText}</p>
          </div>
          <div className="flex items-center text-gray-1000">
            <p className="text-xs">
              {selectedSeats && selectedSeats[0].currency}$
              {selectedSeats.reduce((a, b) => {
                const cal = b.taxes * b.quantity;
                return a + cal;
              }, 0)}
            </p>
          </div>
        </div>
        <section className="py-1 px-5 row-start-3 row-end-4 hidden lg:grid">
          <div className="flex justify-between pt-1.5">
            <div className="flex items-center text-primary-1000">
              <p className="text-gray-800">{payNowText}</p>
            </div>
            <div className="flex items-center text-gray-1000">
              <p className="text-base">
                {selectedSeats && selectedSeats[0].currency}$
                {selectedSeats.reduce((a, b) => {
                  const cal = (b.basePrice + b.taxes) * b.quantity;
                  return a + cal;
                }, 0)}
              </p>
            </div>
          </div>
          <div
            className={classnames('min-w-max rounded-4 px-2 mt-6', {
              'bg-gray-100': !isFreeCacellationPolicy,
              'bg-green-100': isFreeCacellationPolicy,
              'text-green-600': isFreeCacellationPolicy,
            })}
          >
            <div className="flex items-center">
              {isFreeCacellationPolicy && (
                <CheckIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
              )}
              <p className="pl-2">{cancellationPolicy}</p>
            </div>
          </div>
        </section>
      </section>
      <section className="py-[12px] px-5 border-t-0 lg:border-t-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-sm">{totalText}</p>
          </div>
          <div className="items-center">
            <p className="text-base text-end">
              {selectedSeats && selectedSeats[0].currency}$
              {selectedSeats.reduce((a, b) => {
                const cal = (b.basePrice + b.taxes) * b.quantity;
                return a + cal;
              }, 0)}
            </p>
            <p className="text-sm text-end text-gray-400">
              {includesTaxesAndFeesText}
            </p>
          </div>
        </div>
        <Button
          value="Add To Itinerary"
          type="outlined"
          size="full"
          className="my-4"
          onClick={() => handleAction('/itinerary')}
        />
        <Button
          value="Book Now"
          size="full"
          onClick={() => handleAction('/checkout/client')}
        />
      </section>
    </section>
  );
};

export default SelectedSeatsBar;
