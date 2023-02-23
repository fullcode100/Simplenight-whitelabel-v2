import dayjs from 'dayjs';
import LocationPinIcon from 'public/icons/assets/location-pin.svg';
import ClockIcon from 'public/icons/assets/clock.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { injectProps } from '../../../helpers/reactUtils';
import { useTranslation } from 'react-i18next';
import DurationLabel from '../DurationLabel/DurationLabel';
import { Item, Customer } from 'types/cart/CartType';
import LocationAndMapIcon from 'public/icons/assets/LocationAndMap.svg';
import PhoneIcon from 'public/icons/assets/Phone.svg';
import EnvelopeIcon from 'public/icons/assets/Envelope.svg';
import UserIcon from 'public/icons/assets/buyer-user.svg';
import { Paragraph } from '@simplenight/ui';
import { BookingAnswer } from 'thingsToDo/types/request/ThingsCartRequest';
import MeetingPickupPoint from '../MeetingPickupPoint/MeetingPickupPoint';

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
  const [g, i18n] = useTranslation('global');
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

  const OrderNameCard = () => {
    const Sublabel = ({ icon, content }: IconAndTextProps) => {
      const iconWithClasses = injectProps(icon, {
        className: 'h-4 w-4 text-primary-1000',
      });
      return (
        <div className="flex items-center gap-2 ">
          {iconWithClasses}
          <Paragraph className="underline">{content as string}</Paragraph>
        </div>
      );
    };

    const userIconWithClasses = injectProps(<UserIcon />, {
      className: 'h-5 w-5 text-primary-1000',
    });

    const orderNameLabel = g('orderName', 'Order Name');
    return (
      <div className="flex gap-3 p-3 border bg-primary-100 border-primary-300 rounded-4">
        {userIconWithClasses}
        <div className="grid w-full gap-2 lg:grid-cols-2">
          <div>
            <Paragraph textColor="text-dark-700">{orderNameLabel}</Paragraph>
            <Paragraph>
              {`${customer?.first_name} ${customer?.last_name}`}
            </Paragraph>
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
      {customer && <OrderNameCard />}
    </section>
  );
};

export default ThingGeneralInfo;
