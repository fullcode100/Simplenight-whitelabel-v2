import React, { useMemo } from 'react';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import TicketIcon from 'public/icons/categories/ticket.svg';
import TrashIcon from 'public/icons/assets/trash.svg';
import PlusIcon from 'public/icons/assets/Plus.svg';
import { useTranslation } from 'react-i18next';
import Button from 'components/global/Button/Button';

interface selectedSeatsProp {
  title: string;
  quantity: number;
  basePrice: number;
  discountPercent: number;
  taxes: number;
  cancellationPolicy: string;
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
    title,
    quantity,
    basePrice,
    discountPercent,
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

  const discountPrice = useMemo(
    () => (basePrice - basePrice * (discountPercent / 100)) * quantity,
    [basePrice, discountPercent, quantity],
  );
  return (
    <>
      <section className="grid grid-cols-7 border-b-2 py-6 pl-5 h-[10%]">
        <div className="col-span-1 items-center flex">
          <IconRoundedContainer className="bg-primary-1000 inline-flex">
            <TicketIcon className="-rotate-30 text-white h-5 w-5 lg:h-[40px] lg:w-[40px]" />
          </IconRoundedContainer>
        </div>
        <div className="col-span-5">
          <p className="text-base font-semibold">{title}</p>
          <p>
            {quantity} {ticketsText}
          </p>
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
            <p className="pl-2 text-gray-800">{basePriceText}</p>
          </div>
          <div className="flex items-center text-gray-500">
            <p className="text-xs pr-2 line-through">
              {currency}${basePrice}
            </p>
            <p className="text-primary-1000">{discountPercent}% Off</p>
          </div>
        </div>
        <div className="flex justify-end">
          <p>
            {currency}$ {discountPrice}
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
              {currency}$ {discountPrice + taxes}
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
              {currency}$ {discountPrice + taxes}
            </p>
            <p className="text-sm text-end text-gray-400">
              {includesTaxesAndFeesText}
            </p>
          </div>
        </div>
        <Button value="Add" type="outlined" size="full" className="my-4" />
        <Button value="Add" size="full" />
      </section>
    </>
  );
};

export default SelectedSeatsBar;
