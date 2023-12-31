import { useTranslation } from 'react-i18next';

import { formatAsDisplayDate, formatAsDisplayHour } from 'helpers/dajjsUtils';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { Paragraph } from '@simplenight/ui';

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

  const formattedCheckinDate = formatAsDisplayDate(checkoutDate ?? new Date());
  // const formatedCheckinHour = formatAsDisplayHour(checkoutTime ?? new Date());
  const formatedCheckinHour = checkoutTime;
  return (
    <section className="grid gap-2 lg:gap-8 lg:grid-cols-2 lg:w-full">
      <section className="flex flex-row gap-1 lg:gap-2.5">
        <CalendarIcon className="h-3.5 lg:h-5 lg:w-5 mt-1 lg:mt-0 text-primary-1000" />
        {checkinDate && checkinTime && (
          <section>
            <Paragraph className="text-dark-700">{checkinLabel}</Paragraph>
            <Paragraph className="text-dark-1000">
              {fromLowerCaseToCapitilize(formatAsDisplayDate(checkinDate))}{' '}
              {checkinTime}
            </Paragraph>
          </section>
        )}
      </section>
      <section className="flex flex-row gap-1 lg:gap-2.5">
        <CalendarIcon className="h-3.5 lg:h-5 lg:w-5 mt-1 lg:mt-0 text-primary-1000" />
        {checkoutDate && checkoutTime && (
          <section>
            <Paragraph className="text-dark-700">{checkoutLabel}</Paragraph>
            <Paragraph className="text-dark-1000">
              {fromLowerCaseToCapitilize(formattedCheckinDate)}{' '}
              {formatedCheckinHour}
            </Paragraph>
          </section>
        )}
      </section>
    </section>
  );
};

export default CheckinCheckoutInfo;
