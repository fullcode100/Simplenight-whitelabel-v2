import Divider from 'components/global/Divider/Divider';
import { timesMock } from 'mocks/thingsTimesMock';
import { useState } from 'react';
import TimeSelectorPill from '../TimeSelector/TimeSelectorPill';
import TicketHeader from './TicketHeader';
import TimeSelectorDrop from '../TimeSelector/TimeSelectorDrop';
import {
  Pricing,
  Ticket,
} from 'thingsToDo/types/response/ThingsDetailResponse';
import ClockIcon from 'public/icons/assets/clock.svg';
import { useTranslation } from 'react-i18next';
import useQuery from 'hooks/pageInteraction/useQuery';
import classnames from 'classnames';
import PriceBreakdown from '../PriceBreakdown/PriceBreakdown';
import TicketActions from './TicketActions';
import { getDefaultGuests } from 'thingsToDo/helpers/helper';

interface TicketCardProps {
  ticket: Ticket;
  selected?: boolean;
  pricing: Pricing;
}

const TicketCard = ({ ticket, selected, pricing }: TicketCardProps) => {
  const [t] = useTranslation('things');
  const [selectedTime, setSelectedTime] = useState('');
  const params = useQuery();
  const { adults, children, infants } = params;
  const totalTickets =
    parseInt(adults as string) +
    parseInt(children as string) +
    parseInt(infants as string);
  const title = ticket?.name;
  const description = ticket?.description;
  const isFullDay = ticket?.full_day;
  const duration = false;
  const fulldayText = t('fullDay', 'Full Day');
  const fullDayOrDuration = isFullDay ? fulldayText : duration;
  const guestsData = getDefaultGuests(pricing?.ticket_types, params);
  const getTotalGuests = () => {
    let totalGuests = 0;
    Object.values(guestsData).forEach((value) => {
      totalGuests += value as number;
    });
    return totalGuests;
  };
  const totalGuests = getTotalGuests();

  const TimeSelector = () => (
    <>
      <section className="hidden lg:block">
        <TimeSelectorPill
          onChange={setSelectedTime}
          value={selectedTime}
          data={timesMock}
        />
      </section>
      <section className="lg:hidden">
        <TimeSelectorDrop
          onChange={setSelectedTime}
          value={selectedTime}
          data={timesMock}
        />
      </section>
    </>
  );
  return (
    <section
      className={classnames(
        'border border-dark-300 rounded w-full max-w-[200px]',
        {
          'border-primary-1000 shadow-md': selected,
        },
      )}
    >
      <TicketHeader title={title} description={description} />
      <section
        className={classnames('lg:block', {
          hidden: !selected,
        })}
      >
        <Divider />
        <section className="p-4">
          {fullDayOrDuration ? (
            <section className="text-dark-1000 text-xs flex items-center gap-3">
              <ClockIcon className="text-primary-1000" /> {fullDayOrDuration}
            </section>
          ) : (
            <TimeSelector />
          )}
        </section>
      </section>
      <Divider />
      <section className="p-4">
        <PriceBreakdown
          numberTickets={totalGuests}
          totalBeforeDiscount="  US$250.00"
          percentageToApply="25%"
          totalAmount="US$199.00"
        />
      </section>
      <Divider />
      <section className="p-4">
        <TicketActions numberTickets={totalGuests} />
      </section>
    </section>
  );
};

export default TicketCard;
