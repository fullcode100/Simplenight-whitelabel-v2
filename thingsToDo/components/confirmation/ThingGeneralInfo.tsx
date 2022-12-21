import dayjs from 'dayjs';
import LocationPinIcon from 'public/icons/assets/location-pin.svg';
import ClockIcon from 'public/icons/assets/clock.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { injectProps } from '../../../helpers/reactUtils';
import { useTranslation } from 'react-i18next';
import DurationLabel from '../DurationLabel/DurationLabel';
import { Customer } from 'types/cart/CartType';
import { Item } from 'types/booking/bookingType';
import LocationAndMapIcon from 'public/icons/assets/LocationAndMap.svg';
import PhoneIcon from 'public/icons/assets/Phone.svg';
import EnvelopeIcon from 'public/icons/assets/Envelope.svg';
import UserIcon from 'public/icons/assets/buyer-user.svg';

interface ThingGeneralInfoProps {
  item: Item;
  customer?: Customer;
}

interface IconAndTextProps {
  icon: JSX.Element;
  content: JSX.Element | string;
}

const ThingGeneralInfo = ({ item, customer }: ThingGeneralInfoProps) => {
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
    (bookingAnswer: any) => bookingAnswer.question_id === PICKUP_POINT_ID,
  )?.value;
  const startingPoint = item.item_data?.extra_data.start_locations?.map(
    (location: any) => location.description,
  );
  const hasPickupOrMeetingPoint = pickupPoint || startingPoint;

  const MeetingPickupPoint = () => {
    const pickupPointLabel = 'Pickup Point';
    const meetingPointLabel = 'Meeting Point';

    const pickupLocations = item.item_data?.extra_data.pickup.locations;
    const selectedPickupLocation = pickupLocations?.find(
      (locationObject: any) => locationObject.location.ref == pickupPoint,
    )?.location;
    const pickupAddress = selectedPickupLocation?.address;
    const pickupName = selectedPickupLocation?.name;
    const pickupAddressFormatted = `${pickupAddress?.address1}${pickupAddress?.city}, ${pickupAddress?.country_code}, ${pickupAddress?.postal_code}`;

    return (
      <div>
        <p className="text-dark-700">
          {pickupPoint ? pickupPointLabel : meetingPointLabel}
        </p>
        {pickupPoint && (
          <p>{pickupAddress ? pickupAddressFormatted : pickupName}</p>
        )}
        {!pickupPoint && <p> {startingPoint ? startingPoint : addressLabel}</p>}
      </div>
    );
  };

  const IconAndText = ({ icon, content }: IconAndTextProps) => {
    const iconWithClasses = injectProps(icon, {
      className: 'h-5 w-5 text-primary-1000',
    });
    return (
      <div className="flex gap-2 ">
        {iconWithClasses}
        {content}
      </div>
    );
  };

  const OrderNameCard = () => {
    const Sublabel = ({ icon, content }: IconAndTextProps) => {
      const iconWithClasses = injectProps(icon, {
        className: 'h-4 w-4 text-primary-1000',
      });
      return (
        <div className="flex items-center gap-2 ">
          {iconWithClasses}
          <p className="underline">{content}</p>
        </div>
      );
    };

    const userIconWithClasses = injectProps(<UserIcon />, {
      className: 'h-5 w-5 text-primary-1000',
    });
    return (
      <div className="flex gap-3 p-3 border bg-primary-100 border-primary-300 rounded-4">
        {userIconWithClasses}
        <div className="grid w-full gap-2 lg:grid-cols-2">
          <div>
            <p className="text-dark-700">Order Name </p>
            <p>
              {customer?.first_name} {customer?.last_name}
            </p>
          </div>
          <div>
            <Sublabel icon={<EnvelopeIcon />} content={`${customer?.email}`} />
            <Sublabel
              icon={<PhoneIcon />}
              content={`+ ${customer?.phone_prefix} ${customer?.phone_number}`}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="flex flex-col gap-3 px-4 py-4 text-dark-1000">
      <IconAndText icon={<LocationPinIcon />} content={<p>{addressLabel}</p>} />
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
      {customer && <OrderNameCard />}
    </section>
  );
};

export default ThingGeneralInfo;
