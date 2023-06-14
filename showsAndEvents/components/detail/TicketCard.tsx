import InlineFeature from 'components/global/InlineFeature/InlineFeature';
import ShowTimer from './ShowTimer';
import ClockIcon from 'public/icons/assets/clock.svg';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import ButtonMinusPlus from 'components/global/ButtonMinusPlus/ButtonMinusPlus';
import SquareInputLarge from './SquareInput';
import TransportSeat from './TransportSeat';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

interface TicketCard {
  section: string;
  row: string;
  available_seats: number;
  rate: any;
  add: (value: number) => void;
  remove: (value: number) => void;
  purchasable_quantities: number[];
  selectedSeats: number;
  isDisabled?: boolean;
}

const TicketCard: React.FC<TicketCard> = ({
  section,
  row,
  available_seats: availableSeats,
  rate,
  add,
  remove,
  purchasable_quantities: purchasableQuantities,
  selectedSeats = 0,
  isDisabled = false,
}) => {
  const [t, i18next] = useTranslation('events');
  const sectorLabel = t('sector', 'Sector');
  const rowLabel = t('row', 'Row');
  const ticketLabel = t('ticket', 'Ticket');
  const ticketsLabel = t('tickets', 'Tickets');
  const totalLabel = t('total', 'Total');
  const eachLabel = t('each', 'Each');

  const purchasableQuantitiesList = useMemo(() => {
    purchasableQuantities.sort((a, b) => {
      return a - b;
    });
    return purchasableQuantities;
  }, [purchasableQuantities]);

  const [seatTogether, setSeatTogether] = useState(false);
  const [seatSplitQuantity, setSeatSplitQuantity] = useState(
    [...purchasableQuantitiesList].shift(),
  );
  const ticketsCountLabel = selectedSeats > 1 ? ticketsLabel : ticketLabel;
  const availableSeatsLabel = availableSeats > 1 ? ticketsLabel : ticketLabel;

  const increaseSelectedSeats = () => {
    const currentIndex = purchasableQuantitiesList.indexOf(selectedSeats);
    const isLastIndex = currentIndex + 1 === purchasableQuantitiesList.length;
    if (!isLastIndex) {
      const value = purchasableQuantitiesList[currentIndex + 1];
      setSeatTogether(value > 1);
      add(value);
    }
  };

  const decreaseSelectedSeats = () => {
    const currentIndex = purchasableQuantitiesList.indexOf(selectedSeats);
    const value =
      currentIndex > 0 ? purchasableQuantitiesList[currentIndex - 1] : 0;
    setSeatTogether(value > 1);
    remove(value);
  };

  return (
    <section className="mt-2 border rounded cursor-pointer border-dark-300">
      <div className="py-4 w-full border-solid border-l-0 border-r-0 border-t-0 border-b gap-2.5 flex flex-col items-start self-stretch border-[rgba(212,212,212,1)]">
        <div className="flex flex-col items-start self-stretch w-full gap-2 px-4">
          <div className="flex items-start w-full gap-2">
            <div className="text-[rgba(122,122,122,1)] w-full">
              <p className="m-0 text-xl leading-6 capitalize truncate">
                <span className="text-[rgba(69,69,69,1)]">{`${rowLabel} ${row} `}</span>
                {`${sectorLabel} ${section}`}
              </p>
            </div>
          </div>
          <div className="gap-1">
            {seatTogether && (
              <InlineFeature
                icon={<InfoCircle className="w-4 h-4 text-dark-800" />}
                text="Your seats are guaranteed to be together"
              />
            )}
          </div>
        </div>
      </div>
      <div className="py-4 w-full border-solid border-l-0 border-r-0 border-t-0 border-b gap-2.5 flex flex-col items-end  self-stretch border-[rgba(212,212,212,1)]">
        <div className="px-4 w-full gap-2.5 flex items-center  self-stretch">
          <div>
            <div>
              <div
                className={classnames('px-1 rounded w-auto inline', {
                  'bg-green-100 text-green-1000': availableSeats > 10,
                  'bg-warning-100 text-warning-1000':
                    availableSeats > 5 && availableSeats <= 10,
                  'bg-red-100 text-red-900': availableSeats <= 5,
                })}
              >
                {`${
                  availableSeats - selectedSeats
                } ${availableSeatsLabel} left`}
              </div>
            </div>
            <div className="gap-1">
              {seatSplitQuantity && seatSplitQuantity > 1 && (
                <InlineFeature
                  icon={<InfoCircle className="w-4 h-4 text-dark-800" />}
                  text={`this is selectable in ${seatSplitQuantity} by ${seatSplitQuantity}`}
                />
              )}
            </div>
          </div>
          <div className="flex items-end gap-3 ml-auto w-36">
            <SquareInputLarge value={selectedSeats} />
            <ButtonMinusPlus
              disabledMinus={isDisabled || !selectedSeats}
              disabledPlus={isDisabled || selectedSeats === availableSeats}
              onClickMinus={(e) => {
                e?.stopPropagation();
                decreaseSelectedSeats();
              }}
              onClickPlus={(e) => {
                e?.stopPropagation();
                increaseSelectedSeats();
              }}
            />
          </div>
        </div>
      </div>
      <div className="py-4 w-full border-solid border-l-0 border-r-0 border-t-0 border-b gap-2.5 flex flex-col justify-center items-end self-stretch border-[rgba(212,212,212,1)]">
        <div
          className={`px-4 w-full flex ${
            selectedSeats ? 'justify-between' : 'justify-end'
          }  items-center self-stretch`}
        >
          {!!selectedSeats && (
            <div>
              <p className="text-[16px] font-semibold">
                {selectedSeats} {ticketsCountLabel}
              </p>
            </div>
          )}
          <div
            className={
              '"inline-flex flex-col justify-center items-end text-end w-[200px] font-[\'Lato\'] text-[rgba(69,69,69,1)]"'
            }
          >
            <div className="gap-1 font-semibold text-end">
              <div className="w-[200px] text-end">
                <p className="m-0 text-lg leading-6 text-end">
                  ${rate.total.net.amount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="gap-1 font-normal">
              {!!selectedSeats && (
                <p className="m-0 text-xs leading-tight capitalize">
                  ${(selectedSeats * rate.total.net.amount).toFixed(2)}{' '}
                  {totalLabel}
                </p>
              )}
              {!selectedSeats && (
                <p className="m-0 text-xs leading-tight capitalize">
                  <span
                    className={classnames({
                      block: !!selectedSeats,
                      hidden: !selectedSeats,
                    })}
                  >
                    {'$'}
                    {(selectedSeats * rate.total.net.amount).toFixed(2)}
                  </span>
                  {` / ${eachLabel}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketCard;
