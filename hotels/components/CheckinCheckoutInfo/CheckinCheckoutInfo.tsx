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
  const [t, i18next] = useTranslation('hotels');
  const checkinLabel = t('checkIn', 'Check-In');
  const checkoutLabel = t('checkOut', 'Check-Out');

  return (
    <>
      <section className="flex flex-row gap-1">
        <CalendarIcon className="h-3.5 mt-1 text-primary-1000" />
        {checkinDate && checkinTime && (
          <section className="font-semibold text-sm">
            <p className="text-dark-800">{checkinLabel}</p>
            <p className="text-dark-1000">
              {formatAsDisplayDate(checkinDate)}{' '}
              {formatAsDisplayHour(checkinTime)}
            </p>
          </section>
        )}
      </section>
      <section className="flex flex-row gap-1">
        <CalendarIcon className="h-3.5 mt-1 text-primary-1000" />
        {checkoutDate && checkoutTime && (
          <section className="font-semibold text-sm">
            <p className="text-dark-800">{checkoutLabel}</p>
            <p className="text-dark-1000">
              {formatAsDisplayDate(checkoutDate)}{' '}
              {formatAsDisplayHour(checkoutTime)}
            </p>
          </section>
        )}
      </section>
    </>
  );
};

export default CheckinCheckoutInfo;
