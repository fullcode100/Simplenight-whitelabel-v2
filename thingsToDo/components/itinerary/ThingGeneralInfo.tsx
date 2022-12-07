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
  const activityTime = item.booking_data?.time;
  const duration = item.item_data?.extra_data.duration;
  const minDuration = item.item_data?.extra_data.min_duration || 0;
  const maxDuration = item.item_data?.extra_data.max_duration || 0;
  const fullDay = item.item_data?.extra_data.full_day;

  const [t] = useTranslation('things');
  const addressLabel = `${addressArea} ${address?.city}, ${address?.country}`;

  const activityDuration = duration ? duration : { minDuration, maxDuration };
  const dateFormatted = dayjs(activityDate).format('MMM D, YYYY');
  const timeFormatted = `${t('at', 'at')} ${activityTime}`;
  const dateAndTimeLabel = `${dateFormatted} ${
    activityTime ? timeFormatted : ''
  }`;
  const fullDayLabel = 'Full day activity';

  const PICKUP_POINT_ID = 'PICKUP_POINT';
  const pickupPoint = item.booking_data?.booking_answers?.find(
    (bookingAnswer) => bookingAnswer.question_id === PICKUP_POINT_ID,
  )?.value;
  const startingPoint = item.item_data?.extra_data.start_locations?.map(
    (location) => location.description,
  );
  const hasPickupOrMeetingPoint = pickupPoint || startingPoint;

  const IconAndText = ({ icon, content }: IconAndTextProps) => {
    const iconWithClasses = injectProps(icon, {
      className: 'h-5 w-5 text-primary-1000',
    });
    return (
      <div className="flex gap-2 ">
        <div className="w-5"> {iconWithClasses}</div>
        <p>{content}</p>
      </div>
    );
  };

  const MeetingPickupPoint = () => {
    const pickupPointLabel = 'Pickup Point';
    const meetingPointLabel = 'Meeting Point';

    const pickupLocations = item.item_data?.extra_data.pickup.locations;
    const selectedPickupLocation = pickupLocations?.find(
      (locationObject) => locationObject.location.ref == pickupPoint,
    )?.location;
    const pickupAddress = selectedPickupLocation?.address;
    const pickupName = selectedPickupLocation?.name;
    const pickupAddressFormatted = `${pickupAddress?.address1}${pickupAddress?.city}, ${pickupAddress?.country_code}, ${pickupAddress?.postal_code}`;

    return (
      <div>
        {hasPickupOrMeetingPoint && (
          <>
            <p className="text-dark-700">
              {pickupPoint ? pickupPointLabel : meetingPointLabel}
            </p>
            {pickupPoint && (
              <p>{pickupAddress ? pickupAddressFormatted : pickupName}</p>
            )}
            {!pickupPoint && (
              <p> {startingPoint ? startingPoint : addressLabel}</p>
            )}
          </>
        )}
      </div>
    );
  };
  return (
    <section className="flex flex-col gap-3 py-4 px-4 text-dark-1000">
      <IconAndText icon={<LocationPinIcon />} content={addressLabel} />
      {hasPickupOrMeetingPoint && (
        <IconAndText
          icon={<LocationAndMapIcon />}
          content={<MeetingPickupPoint />}
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
