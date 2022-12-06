import React, { useMemo } from 'react';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import TicketIcon from 'public/icons/categories/ticket.svg';
import TrashIcon from 'public/icons/assets/trash.svg';
import PlusIcon from 'public/icons/assets/Plus.svg';
import { useTranslation } from 'react-i18next';
import Button from 'components/global/Button/Button';

interface selectedSeatsProp {
  name: string;
  title: string;
  quantity: any;
  basePrice: number;
  discountPercent: number;
  discountAmount: number;
  taxes: number;
  cancellationPolicy: any;
  currency: string;
}

interface SelectedSeatsBarProps {
  selectedSeats: selectedSeatsProp;
  hideBar: () => void;
}

const SelectedSeatsBar = ({
  selectedSeats,
  hideBar,
}: SelectedSeatsBarProps) => {
  const {
    name,
    title,
    quantity,
    basePrice,
    discountPercent,
    discountAmount,
    taxes,
    cancellationPolicy,
    currency,
  } = selectedSeats;

  const [t] = useTranslation('things');
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

  console.log({ selectedSeats });

  return (
    <>
      <section className="grid grid-cols-7 border-b-2 py-6 pl-5 h-[10%]">
        <div className="col-span-1 items-center flex">
          <IconRoundedContainer className="bg-primary-1000 inline-flex">
            <TicketIcon className="-rotate-30 text-white h-5 w-5 lg:h-[40px] lg:w-[40px]" />
          </IconRoundedContainer>
        </div>
        <div className="col-span-5">
          <p className="text-base font-semibold">{name}</p>
          <p>
            {quantity} {ticketsText}
          </p>
        </div>
      </section>
      <section className="grid grid-cols-8 border-b-2 py-6 pl-5 h-[10%]">
        <div className="col-span-5">
          <p className="text-base font-semibold">{title}</p>
          <p>
            {quantity} {ticketsText}
          </p>
        </div>
        <div className="col-span-2">
          <div
            className={
              'inline-flex flex-col justify-center items-end text-center'
            }
          >
            <div className="gap-1 font-semibold">
              <div className="w-[91px]">
                <p className="text-lg leading-6 m-0">
                  {currency}$ {basePrice + taxes}
                </p>
              </div>
            </div>
            <div className="gap-1 font-normal">
              <p className="text-xs leading-tight capitalize m-0">
                Total {currency}$ {quantity * (basePrice + taxes)}
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
      <section className="border-b-2 py-6 px-5 min-h-[50vh]">
        <div className="flex justify-between">
          <div className="flex items-center text-primary-1000">
            <PlusIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
            <p className="pl-2 text-gray-800">
              x{quantity} {ticketsText}
            </p>
          </div>
          <div className="flex items-center text-gray-500">
            <p className="text-xs pr-2 ">
              {currency}${quantity * (basePrice + taxes)}
            </p>
            <p className="text-primary-1000">{discountPercent} Off</p>
          </div>
        </div>
        <div className="flex justify-end">
          <p>
            {currency}$ {discountAmount}
          </p>
        </div>
        <div className="flex justify-between pt-1.5 border-b-2 pb-2">
          <div className="flex items-center text-primary-1000">
            <PlusIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
            <p className="pl-2 text-gray-800">{taxesText}</p>
          </div>
          <div className="flex items-center text-gray-1000">
            <p className="text-xs">
              {currency}$ {taxes}
            </p>
          </div>
        </div>
        <div className="flex justify-between pt-1.5">
          <div className="flex items-center text-primary-1000">
            <p className="text-gray-800">{payNowText}</p>
          </div>
          <div className="flex items-center text-gray-1000">
            <p className="text-base">
              {currency}$ {quantity * (basePrice + taxes)}
            </p>
          </div>
        </div>
        <div className="min-w-max bg-gray-100 rounded-4 px-2 my-7">
          {cancellationPolicy}
        </div>
      </section>
      <section className="py-6 px-5 h-[5%]">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-sm">{totalText}</p>
          </div>
          <div className="items-center">
            <p className="text-base text-end">
              {currency}$ {quantity * (basePrice + taxes)}
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
        />
        <Button value="Book Now" size="full" />
      </section>
    </>
  );
};

export default SelectedSeatsBar;
