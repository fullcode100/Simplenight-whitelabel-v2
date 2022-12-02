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

  const MeetingPickupPoint = () => {
    return (
      <div>
        <p className="text-dark-700">Pickup point</p>
        <p>534 Roger St., Chicago, US, 60864</p>
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
        <div className="flex gap-2 items-center ">
          {iconWithClasses}
          <p className="underline">{content}</p>
        </div>
      );
    };

    const userIconWithClasses = injectProps(<UserIcon />, {
      className: 'h-5 w-5 text-primary-1000',
    });
    return (
      <div className="bg-primary-100 border  border-primary-300 p-3  rounded-4 flex gap-3">
        {userIconWithClasses}
        <div className="grid lg:grid-cols-2 w-full gap-2">
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
    <section className="flex flex-col gap-3 py-4 px-4 text-dark-1000">
      <IconAndText icon={<LocationPinIcon />} content={<p>{addressLabel}</p>} />
      <IconAndText
        icon={<ClockIcon />}
        content={
          fullDay ? fullDayLabel : <DurationLabel duration={activityDuration} />
        }
      />
      <IconAndText
        icon={<LocationAndMapIcon />}
        content={<MeetingPickupPoint />}
      />
      <IconAndText icon={<CalendarIcon />} content={dateAndTimeLabel} />
      {customer && <OrderNameCard />}
    </section>
  );
};

export default ThingGeneralInfo;
