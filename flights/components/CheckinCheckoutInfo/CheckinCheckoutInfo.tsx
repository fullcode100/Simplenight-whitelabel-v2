import { useTranslation } from 'react-i18next';

import { formatAsDisplayDate, formatAsDisplayHour } from 'helpers/dajjsUtils';
import CalendarIcon from 'public/icons/assets/calendar.svg';

interface CheckinCheckoutInfoProps {
  checkinDate?: string;
  checkoutDate?: string;
  checkinTime?: string;
  checkoutTime?: string;
}

const CheckinCheckoutInfo = ({
  checkinDate,
  checkoutDate,
  checkinTime,
  checkoutTime,
}: CheckinCheckoutInfoProps) => {
  const [t, i18next] = useTranslation('flights');
  const checkinLabel = t('checkIn', 'Check-In');
  const checkoutLabel = t('checkOut', 'Check-Out');

  return (
    <section className="grid gap-2 lg:gap-8 lg:grid-cols-2 lg:w-full">
      <section className="flex flex-row gap-1 lg:gap-2.5">
        <CalendarIcon className="h-3.5 lg:h-5 lg:w-5 mt-1 lg:mt-0 text-primary-1000" />
        {checkinDate && checkinTime && (
          <section className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px]">
            <p className="text-dark-700">{checkinLabel}</p>
            <p className="text-dark-1000">
              {formatAsDisplayDate(checkinDate)}{' '}
              {formatAsDisplayHour(checkinTime)}
            </p>
          </section>
        )}
      </section>
      <section className="flex flex-row gap-1 lg:gap-2.5">
        <CalendarIcon className="h-3.5 lg:h-5 lg:w-5 mt-1 lg:mt-0 text-primary-1000" />
        {checkoutDate && checkoutTime && (
          <section className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px]">
            <p className="text-dark-700">{checkoutLabel}</p>
            <p className="text-dark-1000">
              {formatAsDisplayDate(checkoutDate)}{' '}
              {formatAsDisplayHour(checkoutTime)}
            </p>
          </section>
        )}
      </section>
    </section>
  );
};

export default CheckinCheckoutInfo;
