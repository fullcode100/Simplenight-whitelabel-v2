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

interface selectedSeatsProp {
  name: string;
  title: string;
  quantity: any;
  basePrice: number;
  discountPercent: number;
  discountAmount: number;
  taxes: number;
  cancellationPolicy: string;
  currency: string;
  deliveryMethods: string[];
}

interface SelectedSeatsBarProps {
  selectedSeats: selectedSeatsProp[];
  hideBar: () => void;
  name: string;
  deliveryMethods: string[];
  cancellationPolicy: string;
}

const SelectedSeatsBar = ({
  selectedSeats,
  hideBar,
  name,
  deliveryMethods,
  cancellationPolicy,
}: SelectedSeatsBarProps) => {
  // const {
  //   deliveryMethods,
  //   title,
  //   quantity,
  //   basePrice,
  //   discountPercent,
  //   discountAmount,
  //   taxes,
  //   cancellationPolicy,
  //   currency,
  // } = selectedSeats;
  const [t, i18next] = useTranslation('things');
  const [et] = useTranslation('events');
  const [gt] = useTranslation('global');
  const ticketsText = t('tickets', 'Tickets');
  const basePriceText = et('basePrice', 'Base Prices');
  const taxesText = gt('taxes', 'Taxes');
  const payNowText = gt('payNow', 'Pay Now');
  const totalText = gt('total', 'Total');
  const includesTaxesAndFeesText = gt(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };

  const router = useRouter();

  const itemToBook = {
    // TODO: Hard coded field. we need to ask it to BE
    sn_booking_code:
      'HOTELS|1|0f97e283:39127842|20221208|20221231|SN_PUBLIC|314146299|RO|1|2|0|',
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const handleAction = async (url: string) => {
    setIsDisabled(true);
    await addToCart(itemToBook, i18next, store);
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
    <section className="grid lg:grid-rows-4 lg:max-h-[87vh] max-h-[25vh]">
      <section className="row-span-1 row-start-1">
        <section className="hidden lg:grid grid-cols-7 border-b-2 py-6 pl-5 row-start-1 row-span-1">
          <div className="col-span-1 items-center flex">
            <IconRoundedContainer className="bg-primary-1000 inline-flex">
              <TicketIcon className="-rotate-30 text-white h-5 w-5 lg:h-[40px] lg:w-[40px]" />
            </IconRoundedContainer>
          </div>
          <div className="col-span-5">
            <p className="text-base font-semibold">{name}</p>
            <p>
              {100} {ticketsText}
            </p>
          </div>
        </section>
      </section>
      <section className="hidden lg:block overflow-y-scroll w-full row-end-4 row-start-2 lg:h-full -mt-8">
        {/* {deliveryMethodMenu} */}
        {selectedSeats.map((item, i) => (
          <section
            key={i}
            className="max-h-20 grid grid-cols-8 border-b-2 py-3 pl-5 h-screen items-center"
          >
            <div className="col-span-4 xl:col-span-5">
              <p className="text-base font-semibold">{item.title}</p>
              <p>
                {item.quantity} {ticketsText}
              </p>
            </div>
            <div className="col-span-3 xl:col-span-2 items-center">
              <div
                className={
                  'inline-flex flex-col justify-center items-end text-center '
                }
              >
                <div className="gap-1 font-semibold">
                  <div className="w-[91px]">
                    <p className="text-lg leading-6 m-0">
                      {item.currency}$ {item.basePrice + item.taxes}
                    </p>
                  </div>
                </div>
                <div className="gap-1 font-normal">
                  <p className="text-xs leading-tight capitalize m-0">
                    Total {item.currency}$
                    {item.quantity * (item.basePrice + item.taxes)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 items-center flex">
              <TrashIcon
                className="text-gray-800 h-5 w-5 lg:h-[25px] lg:w-[25px] cursor-pointer"
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
                  x{item.quantity} {ticketsText}
                </p>
              </div>
              <div className="flex items-center text-gray-500">
                <p className="text-xs pr-2 ">
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
        <section className="py-6 px-5 row-start-3 row-end-4 hidden lg:grid">
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
            className={classnames('min-w-max rounded-4 px-2 my-7', {
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
      <section className="py-6 px-5 row-span-1 row-start-4 -mt-5 border-t-2">
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
          // TODO: This should be uncommentd when we have the checkout view ready
          // onClick={() => handleAction('/checkout/client')}
        />
      </section>
    </section>
  );
};

export default SelectedSeatsBar;
