import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';

import LocationPinIcon from 'public/icons/assets/location-pin.svg';
import ClockIcon from 'public/icons/assets/clock.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { injectProps } from '../../../helpers/reactUtils';
import { useTranslation } from 'react-i18next';
import DurationLabel from '../DurationLabel/DurationLabel';
import { Customer, Item } from 'types/cart/CartType';
import LocationAndMapIcon from 'public/icons/assets/LocationAndMap.svg';

import { BookingAnswer } from '../../types/request/ThingsCartRequest';
import MeetingPickupPoint from '../MeetingPickupPoint/MeetingPickupPoint';

interface ThingGeneralInfoProps {
  item: Item;
  customer?: Customer;
}

interface IconAndTextProps {
  icon: JSX.Element;
  content: JSX.Element | string;
}

const ThingGeneralInfo = ({ item }: ThingGeneralInfoProps) => {
  const address = item.item_data?.address;
  const addressArea = `${address?.area ? `${address?.area}, ` : ''}`;
  const activityDate = item.booking_data?.start_date;

  const INVALID_TIME_LABEL = 'Invalid Date';
  const activityTime =
    item.booking_data?.time !== INVALID_TIME_LABEL && item.booking_data?.time;

  const duration = item.item_data?.extra_data.duration;
  const minDuration = item.item_data?.extra_data.min_duration || 0;
  const maxDuration = item.item_data?.extra_data.max_duration || 0;
  const fullDay = item.item_data?.extra_data.full_day;

  const [t, i18n] = useTranslation('things');
  const addressLabel = `${addressArea} ${address?.city}, ${address?.country}`;

  const activityDuration = duration ? duration : { minDuration, maxDuration };
  const dateFormatted = dayjs(activityDate)
    .locale(i18n.resolvedLanguage)
    .format('MMM D, YYYY');
  const timeFormatted = `${t('at', 'at')} ${activityTime}`;
  const dateAndTimeLabel = `${dateFormatted} ${
    activityTime ? timeFormatted : ''
  }`;
  const fullDayLabel = 'Full day activity';

  const PICKUP_POINT_ID = 'PICKUP_POINT';
  const pickupPoint = item.booking_data?.booking_answers?.find(
    (bookingAnswer: BookingAnswer) =>
      bookingAnswer.question_id === PICKUP_POINT_ID,
  )?.value;
  const startLocations = item.item_data?.extra_data.start_locations;
  const hasPickupOrSingleMeetingPoint =
    pickupPoint || startLocations?.length === 1;

  const IconAndText = ({ icon, content }: IconAndTextProps) => {
    const iconWithClasses = injectProps(icon, {
      className: 'h-5 w-5 text-primary-1000',
    });
    return (
      <div className="flex gap-2 ">
        <div className="w-5"> {iconWithClasses}</div>
        {content}
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-3 px-4 py-4 text-dark-1000">
      <IconAndText icon={<LocationPinIcon />} content={addressLabel} />
      {hasPickupOrSingleMeetingPoint && (
        <IconAndText
          icon={<LocationAndMapIcon />}
          content={<MeetingPickupPoint item={item} />}
        />
      )}

      <IconAndText
        icon={<ClockIcon />}
        content={
          fullDay ? fullDayLabel : <DurationLabel duration={activityDuration} />
        }
      />
      <IconAndText icon={<CalendarIcon />} content={dateAndTimeLabel} />
    </section>
  );
};

export default ThingGeneralInfo;
