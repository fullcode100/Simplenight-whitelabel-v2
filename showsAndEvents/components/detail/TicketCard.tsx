import InlineFeature from 'components/global/InlineFeature/InlineFeature';
import ShowTimer from './ShowTimer';
import ClockIcon from 'public/icons/assets/clock.svg';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import ButtonMinusPlus from 'components/global/ButtonMinusPlus/ButtonMinusPlus';
import SquareInputLarge from './SquareInput';
import TransportSeat from './TransportSeat';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

interface TicketCard {
  section: string;
  row: string;
  seatTogether?: boolean;
  available_seats: number;
  rate: any;
  currency?: string;
  add: () => void;
  remove: () => void;
}

const TicketCard: React.FC<TicketCard> = ({
  section,
  row,
  available_seats: availableSeats,
  seatTogether,
  rate,
  currency,
  add,
  remove,
}) => {
  const [t, i18next] = useTranslation('events');
  const sectorLabel = t('sector', 'Sector');
  const rowLabel = t('row', 'Row');
  const ticketLabel = t('ticket', 'Ticket');
  const ticketsLabel = t('tickets', 'Tickets');
  const totalLabel = t('total', 'Total');
  const eachLabel = t('each', 'Each');

  // const [timeLeft, setTimeLeft] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<number>(0);
  const ticketsCountLabel = selectedSeats > 1 ? ticketsLabel : ticketLabel;
  const availableSeatsLabel = availableSeats > 1 ? ticketsLabel : ticketLabel;
  dayjs.extend(relativeTime);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newTimeLeft = dayjs().isBefore(dayjs(availableTime))
  //       ? dayjs().to(availableTime, true)
  //       : '';
  //     setTimeLeft(newTimeLeft);
  //   }, 60000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const increaseSelectedSeats = () => {
    if (availableSeats > selectedSeats) {
      setSelectedSeats(selectedSeats + 1);
      add();
    }
  };

  const decreaseSelectedSeats = () => {
    if (selectedSeats) {
      setSelectedSeats(selectedSeats - 1);
      remove();
    }
  };
  return (
    <section
      className="border border-dark-300 mt-2 rounded cursor-pointer"
      onClick={increaseSelectedSeats}
    >
      <div className="py-4 w-full border-solid border-l-0 border-r-0 border-t-0 border-b gap-2.5 flex flex-col items-start self-stretch border-[rgba(212,212,212,1)]">
        <div className="px-4 w-full gap-2 flex flex-col items-start self-stretch">
          <div className="gap-2 flex items-start w-max">
            <div className="text-[rgba(69,69,69,1)]">
              <p className="text-xl leading-6 capitalize m-0 text-">
                {`${rowLabel} ${row}`}
              </p>
            </div>
            <div className="text-[rgba(122,122,122,1)]">
              <p className="text-xl leading-6 capitalize m-0 ">
                {`${sectorLabel} ${section}`}
              </p>
            </div>
          </div>
          <div className="gap-1">
            {/* {timeLeft && <ShowTimer availableTimeText={timeLeft} />} */}
            {seatTogether && (
              <InlineFeature
                icon={<InfoCircle className="text-dark-800 h-4 w-4" />}
                text="Your seats are guaranteed to be together"
              />
            )}
          </div>
        </div>
      </div>
      <div className="py-4 w-full border-solid border-l-0 border-r-0 border-t-0 border-b gap-2.5 flex flex-col items-end  self-stretch border-[rgba(212,212,212,1)]">
        <div className="px-4 w-full gap-2.5 flex items-center  self-stretch">
          <div
            className={classnames('px-1 rounded', {
              'bg-green-100 text-green-1000': availableSeats > 10,
              'bg-warning-100 text-warning-1000':
                availableSeats > 5 && availableSeats <= 10,
              'bg-red-100 text-red-900': availableSeats <= 5,
            })}
          >
            {`${availableSeats} ${availableSeatsLabel} left`}
          </div>
          <div className="w-36 gap-3 flex items-end ml-auto">
            <SquareInputLarge value={selectedSeats} />
            <ButtonMinusPlus
              disabledMinus={false}
              disabledPlus={false}
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
                <p className="text-lg leading-6 text-end m-0">
                  {rate.total.net.currency}${rate.total.net.amount}
                </p>
              </div>
            </div>
            <div className="gap-1 font-normal">
              {!!selectedSeats && (
                <p className="text-xs leading-tight capitalize m-0">
                  {rate.total.net.currency}
                  {'$'}
                  {selectedSeats * rate.total.net.amount} {totalLabel}
                </p>
              )}
              {!selectedSeats && (
                <p className="text-xs leading-tight capitalize m-0">
                  <span
                    className={classnames({
                      block: !!selectedSeats,
                      hidden: !selectedSeats,
                    })}
                  >
                    {rate.total.net.currency}
                    {'$'}
                    {selectedSeats * rate.total.net.amount}
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