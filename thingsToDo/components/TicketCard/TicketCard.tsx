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
import { formatAsExactHour } from 'helpers/dajjsUtils';
import { getCurrency } from 'store/selectors/core';
import { Location } from 'thingsToDo/types/response/ThingsDetailResponse';

const MOCK_PRODUCT_CODE = 'TG3';
const PICKUP_QUESTION_ID = 'PICKUP_POINT';
const MEETING_QUESTION_ID = 'MEETING_POINT';
const LOCATION_UNIT = 'LOCATION_REFERENCE';

interface TicketCardProps {
  id: string;
  category: string;
  ticket: Ticket;
  pickup?: Location;
  meeting?: Location;
  selected?: boolean;
  pricing: Pricing;
}

const TicketCard = ({
  id,
  category,
  ticket,
  pickup,
  meeting,
  selected,
  pricing,
}: TicketCardProps) => {
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

  const timeNotSelected = selectedTime == '' ? true : false;

  const addToCartRequest = () => {
    const ticketTypes = Object.keys(guestsData).map((guest) => {
      return {
        ticket_type_id: guest,
        quantity: guestsData[guest],
      };
    });

    const time = formatAsExactHour(selectedTime);
    const currency = getCurrency();

    const bookingAnswers = [];
    if (pickup) {
      bookingAnswers.push({
        question_id: PICKUP_QUESTION_ID,
        value: pickup.ref,
        unit: LOCATION_UNIT,
      });
    }
    if (meeting) {
      bookingAnswers.push({
        question_id: MEETING_QUESTION_ID,
        value: meeting.ref,
        unit: LOCATION_UNIT,
      });
    }

    const hasBookingAnswers = bookingAnswers.length > 0;

    const bookinData = {
      inventory_id: id,
      booking_code_supplier: ticket.booking_code_supplier,
      start_date: ticket.start_date,
      time,
      currency,
      product_code: ticket.code,
      ticket_types: ticketTypes,
      ...(hasBookingAnswers && { booking_answers: bookingAnswers }),
    };

    return {
      booking_data: bookinData,
      category,
    };
  };

  const TimeSelector = () => (
    <>
      <section className="hidden lg:block">
        <TimeSelectorPill
          onChange={setSelectedTime}
          value={selectedTime}
          data={ticket.times}
        />
      </section>
      <section className="lg:hidden">
        <TimeSelectorDrop
          onChange={setSelectedTime}
          value={selectedTime}
          data={ticket.times}
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
        className={classnames('', {
          hidden: !selected,
        })}
      >
        <Divider />
        <section className="p-4">
          {fullDayOrDuration ? (
            <section className="flex items-center gap-3 text-xs text-dark-1000">
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
          totalBeforeDiscount={
            ticket.rate.discounts.total_amount_before_apply.formatted
          }
          percentageToApply={ticket.rate.discounts.percentage_to_apply}
          totalAmount={ticket.rate.total.full.formatted}
        />
      </section>
      <Divider />
      <section className="p-4">
        <TicketActions
          itemToBook={addToCartRequest()}
          timeNotSelected={timeNotSelected}
          numberTickets={totalGuests}
        />
      </section>
    </section>
  );
};

export default TicketCard;
