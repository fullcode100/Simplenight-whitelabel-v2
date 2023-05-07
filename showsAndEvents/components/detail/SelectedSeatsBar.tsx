import React, { useMemo } from 'react';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import TicketIcon from 'public/icons/categories/ticket.svg';
import TrashIcon from 'public/icons/assets/trash.svg';
import PlusIcon from 'public/icons/assets/Plus.svg';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Button from 'components/global/Button/Button';
import { useState } from 'react';
import { addToCart } from 'core/client/services/CartClientService';
import classnames from 'classnames';
import { CartClientResponse } from 'types/cart/CartType';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import { CancelationPolicy } from 'showsAndEvents/types/response/ShowsDetailResponse';
import TaxesAndFeesPopover from '../TaxesAndFeesPopover/TaxesAndFeesPopover';
import { hasCartMode } from 'helpers/purchaseModeUtils';

interface selectedSeatsProp {
  sector: string;
  row: string;
  title: string;
  quantity: any;
  basePrice: number;
  discountPercent: number;
  discountAmount: number;
  taxes: number;
  currency: string;
  bookingCodeSupplier: string;
  cancellationPolicy: CancelationPolicy;
}

interface SelectedSeatsBarProps {
  selectedSeats: selectedSeatsProp[];
  removeItem: (bookingCodeSupplier: string) => void;
  name: string;
  category: string;
  id: string;
  startDate: string;
  endDate: string;
}

const SelectedSeatsBar = ({
  selectedSeats,
  removeItem,
  name,
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

  const showAddToItinerary = hasCartMode();

  const totalTickets = useMemo(() => {
    return selectedSeats.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
  }, [selectedSeats]);

  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const generateItemToBook = (ticket: selectedSeatsProp) => {
    return {
      quantity: ticket.quantity,
      booking_data: {
        inventory_id: id,
        booking_code_supplier: ticket.bookingCodeSupplier,
        start_date: startDate,
        end_date: endDate,
        seats: ticket.quantity,
      },
      category: category,
    };
  };

  const handleAction = async (url: string) => {
    setIsDisabled(true);
    let currentCartId = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '')
      : null;
    for (const ticket of selectedSeats) {
      const item: CartClientResponse | undefined = await addToCart(
        generateItemToBook(ticket),
        i18next,
      );
      if (!currentCartId) {
        currentCartId = item?.cart?.cart_id || null;
      }
    }
    router.replace(url);
  };
  const [isFreeCacellationPolicy, setIsFreeCacellationPolicy] = useState(false);

  const cancellableType = 'FREE_CANCELLATION';
  const nonRefundableType = 'NON_REFUNDABLE';

  const defaultItem =
    selectedSeats && selectedSeats[0] ? selectedSeats[0] : undefined;

  const cancellable =
    defaultItem?.cancellationPolicy?.cancellation_type === cancellableType;
  const nonRefundable =
    defaultItem?.cancellationPolicy?.cancellation_type === nonRefundableType;

  return (
    <section className="flex flex-col justify-between h-full">
      <section className="">
        <section className="hidden grid-cols-7 row-span-1 row-start-1 py-6 pl-5 border-b-2 lg:grid">
          <div className="flex items-center col-span-1">
            <IconRoundedContainer className="inline-flex bg-primary-1000">
              <TicketIcon className="text-white h-5 w-5 lg:h-[40px] lg:w-[40px]" />
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
      <section className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide lg:block">
        {/* {deliveryMethodMenu} */}
        {selectedSeats.map((item, i) => (
          <section
            key={i}
            className="grid items-center h-screen grid-cols-8 py-3 pl-5 border-b-2 max-h-20"
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
            <div className="items-center col-span-3 xl:col-span-2">
              <div className={'flex flex-col text-right '}>
                <div className="gap-1 font-semibold">
                  <div className="">
                    <p className="m-0 text-base leading-6 whitespace-nowrap">
                      ${(item.basePrice + item.taxes).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="gap-1 font-normal">
                  <p className="m-0 leading-tight capitalize text-0xs whitespace-nowrap">
                    Total $
                    {(item.quantity * (item.basePrice + item.taxes)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center col-span-1">
              <TrashIcon
                className="text-gray-800 h-5 w-5 lg:h-[20px] lg:w-[18px] cursor-pointer"
                onClick={() => removeItem(item.bookingCodeSupplier)}
              />
            </div>
          </section>
        ))}
        {selectedSeats.map((item, i) => (
          <section key={i} className="px-5 pt-2">
            <div className="flex justify-between">
              <div className="flex items-center text-primary-1000 max-w-[60%]">
                <PlusIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
                <p className="pl-2 text-gray-800 truncate">
                  x{item.quantity}{' '}
                  {item.quantity > 1 ? ticketsLabel : ticketLabel}
                  {`, ${item.row} ${item.sector}`}
                </p>
              </div>
              {item.discountAmount ? (
                <div className="flex items-center text-gray-500">
                  <p className="pr-2 text-xs line-through">
                    $
                    {(item.quantity * (item.basePrice + item.taxes)).toFixed(2)}
                  </p>
                  <p className="text-primary-1000">
                    {item.discountPercent} Off
                  </p>
                </div>
              ) : (
                <p>
                  ${(item.quantity * (item.basePrice + item.taxes)).toFixed(2)}
                </p>
              )}
            </div>
            {!!item.discountAmount && (
              <div className="flex justify-end">
                <p>
                  ${(item.quantity * (item.basePrice + item.taxes)).toFixed(2)}
                </p>
              </div>
            )}
          </section>
        ))}
        <div className="flex justify-between pt-1.5 border-b-2 pb-2 px-5">
          <div className="flex items-center text-primary-1000">
            <PlusIcon className=" h-5 w-5 lg:h-[10px] lg:w-[10px]" />
            <p className="pl-2 text-gray-800">{taxesText}</p>
          </div>
          <div className="flex items-center text-gray-1000">
            <p className="text-xs">
              $
              {selectedSeats
                .reduce((a, b) => {
                  const cal = b.taxes * b.quantity;
                  return a + cal;
                }, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <section className="hidden row-start-3 row-end-4 px-5 py-1 lg:grid">
          <div className="flex justify-between pt-1.5">
            <div className="flex items-center text-primary-1000">
              <p className="text-gray-800">{payNowText}</p>
            </div>
            <div className="flex items-center text-gray-1000">
              <p className="text-base">
                $
                {selectedSeats
                  .reduce((a, b) => {
                    const cal = (b.basePrice + b.taxes) * b.quantity;
                    return a + cal;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          <div
            className={classnames('w-full rounded-4 px-2 mt-6', {
              'bg-gray-100': !isFreeCacellationPolicy,
              'bg-green-100': isFreeCacellationPolicy,
              'text-green-600': isFreeCacellationPolicy,
            })}
          >
            <div className="flex items-center">
              {cancellable && (
                <FreeCancellationExtended
                  policy={defaultItem?.cancellationPolicy?.description}
                />
              )}
              <NonRefundable
                nonCancellable={nonRefundable}
                description={defaultItem?.cancellationPolicy?.description}
              />
            </div>
          </div>
        </section>
      </section>
      <section className="py-[12px] px-5 border-t-0 lg:border-t-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="hidden text-sm lg:block">{totalText}</p>
            <p className="text-sm lg:hidden">
              {totalTickets} {totalTickets > 1 ? ticketsLabel : ticketLabel}
            </p>
          </div>
          <div className="items-center">
            <p className="text-base text-end">
              $
              {selectedSeats
                .reduce((a, b) => {
                  const cal = (b.basePrice + b.taxes) * b.quantity;
                  return a + cal;
                }, 0)
                .toFixed(2)}
            </p>
            <p className="flex gap-1 text-sm text-gray-400 text-end">
              {includesTaxesAndFeesText}
              <TaxesAndFeesPopover />
            </p>
          </div>
        </div>
        {showAddToItinerary && (
          <Button
            value="Add To Itinerary"
            type="outlined"
            size="full"
            className="my-4"
            onClick={() => handleAction('/itinerary')}
          />
        )}
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
