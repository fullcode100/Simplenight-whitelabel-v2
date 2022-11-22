import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';

import LocationPinIcon from 'public/icons/assets/location-pin.svg';
import ClockIcon from 'public/icons/assets/clock.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { injectProps } from '../../../helpers/reactUtils';
import { useTranslation } from 'react-i18next';
import DurationLabel from '../DurationLabel/DurationLabel';

interface ThingGeneralInfoProps {
  item?: any;
}

interface IconAndTextProps {
  icon: JSX.Element;
  value: JSX.Element | string;
}

const ThingGeneralInfo = ({
  item: {
    booking_data: { date: activityDate, time: activityTime },
    item_data: {
      address: { area, city, country },
      extra_data: {
        duration,
        min_duration: minDuration,
        max_duration: maxDuration,
        full_day: fullDay,
      },
    },
    item_data: itemData,
  },
}: ThingGeneralInfoProps) => {
  const [t] = useTranslation('things');
  const address = `${area}, ${city}, ${country}`;

  const activityDuration = duration ? duration : { minDuration, maxDuration };
  const dateFormatted = dayjs(activityDate).format('MMM D, YYYY');
  const timeFormatted = `${t('at', 'at')} ${activityTime}`;
  const dateAndTimeLabel = `${dateFormatted} ${
    activityTime ? timeFormatted : ''
  }`;
  const fullDayLabel = 'Full day activity';

  const IconAndText = ({ icon, value }: IconAndTextProps) => {
    const iconWithClasses = injectProps(icon, {
      className: 'h-5 w-5 text-primary-1000',
    });
    return (
      <div className="flex gap-2 ">
        {iconWithClasses}
        <p>{value}</p>
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-3 py-4 px-4 text-dark-1000">
      <IconAndText icon={<LocationPinIcon />} value={address} />
      <IconAndText
        icon={<ClockIcon />}
        value={
          fullDay ? fullDayLabel : <DurationLabel duration={activityDuration} />
        }
      />
      <IconAndText icon={<CalendarIcon />} value={dateAndTimeLabel} />
    </section>
  );
};

export default ThingGeneralInfo;
