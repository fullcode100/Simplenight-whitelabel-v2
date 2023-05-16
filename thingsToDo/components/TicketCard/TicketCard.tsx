import Divider from 'components/global/Divider/Divider';
import { useEffect, useState } from 'react';
import TimeSelectorPill from '../TimeSelector/TimeSelectorPill';
import TicketHeader from './TicketHeader';
import TimeSelectorDrop from '../TimeSelector/TimeSelectorDrop';
import ClockIcon from 'public/icons/assets/clock.svg';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import PriceBreakdown from '../PriceBreakdown/PriceBreakdown';
import TicketActions from './TicketActions';
import { formatAsExactHour } from 'helpers/dajjsUtils';
import { getCurrency } from 'store/selectors/core';
import { Location } from 'thingsToDo/types/response/ThingsDetailResponse';
import DurationLabel from '../DurationLabel/DurationLabel';
import { TicketAvailability } from 'thingsToDo/types/adapters/TicketAvailability';
import { use } from 'i18next';
import { CartItemRequest } from 'types/cart/CartType';
import { useSelector } from 'react-redux';

const PICKUP_QUESTION_ID = 'PICKUP_POINT';
const MEETING_QUESTION_ID = 'MEETING_POINT';
const LOCATION_UNIT = 'LOCATION_REFERENCE';

interface TicketCardProps {
  id: string;
  category: string;
  ticket: TicketAvailability;
  pickup?: Location;
  meeting?: Location;
  selected?: boolean;
}

const TicketCard = ({
  id,
  category,
  ticket,
  pickup,
  meeting,
  selected,
}: TicketCardProps) => {
  const [t] = useTranslation('things');
  const [selectedTime, setSelectedTime] = useState('');
  const title = ticket?.name;
  const description = ticket?.description;
  const isFullDay = ticket?.fullDay;
  const hasNoStartTime = ticket.times.length === 0;
  const { duration: activityDuration, minDuration, maxDuration } = ticket;
  const rangeDuration = minDuration &&
    maxDuration && { minDuration, maxDuration };
  const fixedDuration = activityDuration ? activityDuration : 0;

  const duration = (
    <DurationLabel duration={rangeDuration ? rangeDuration : fixedDuration} />
  );
  const fulldayText = t('fullDay', 'Full Day');
  const fullDayOrDuration = isFullDay ? fulldayText : duration;

  const showDuration = activityDuration !== undefined && activityDuration > 0;

  const timeNotSelected = selectedTime == '' ? true : false;
  /* selected */
  const cantSelectTime = hasNoStartTime || ticket.times.length === 0;
  const actionsAreDisabled =
    cantSelectTime && selected ? false : timeNotSelected;

  const [itemToBook, setItemToBook] = useState<CartItemRequest | undefined>();

  const currency = useSelector((state: any) => state.core.currency);

  const addToCartRequest = () => {
    const time = formatAsExactHour(selectedTime);

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

    const bookingData = {
      inventory_id: id,
      start_date: ticket.startDate,
      time,
      currency,
      product_code: ticket.code,
      ticket_types: ticket.ticketTypes,
      ...(hasBookingAnswers && { booking_answers: bookingAnswers }),
    };

    return {
      booking_data: bookingData,
      category,
    };
  };

  useEffect(() => {
    setItemToBook(addToCartRequest());
  }, [selectedTime]);

  const TimeSelector = () => {
    ticket.times.sort((a, b) => a.start_time.localeCompare(b.start_time));
    return (
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
  };

  return (
    <section
      className={classnames('border border-dark-300 rounded w-full ', {
        'border-primary-1000 shadow-md': selected,
      })}
    >
      <TicketHeader title={title} description={description} />
      <section
        className={classnames('', {
          hidden: !selected || !ticket.times.length,
        })}
      >
        <Divider />
        <section className="p-4">
          {cantSelectTime && showDuration ? (
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
          numberTickets={ticket.totalGuests}
          totalBeforeDiscount={ticket.totalBeforeDiscount}
          percentageToApply={ticket.percentageToApply}
          totalAmount={ticket.totalAmount}
        />
      </section>
      <Divider />
      <section className="p-4">
        <TicketActions
          itemToBook={itemToBook ?? {}}
          timeNotSelected={actionsAreDisabled}
          numberTickets={ticket.totalGuests}
        />
      </section>
    </section>
  );
};

export default TicketCard;
