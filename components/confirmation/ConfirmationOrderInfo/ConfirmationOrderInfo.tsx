import dayjs from 'dayjs';
import { formatAsDisplayDatetime } from 'helpers/dajjsUtils';
import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationHeaderProps {
  booking?: Booking;
}

const ConfirmationOrderInfo = ({ booking }: ConfirmationHeaderProps) => {
  const snOrderNumber = booking?.sn_order_number;
  const createdAt = booking?.created_at;
  const bookingDate = formatAsDisplayDatetime(createdAt ?? '');
  const [t, i18next] = useTranslation('global');
  const simplenightOrderNumber = t(
    'simplenightOrderNumber',
    'Simplenight Order Number',
  );
  const bookingDateLabel = t('bookingDate', 'Booking Date');

  return (
    <section className="flex lg:flex-col justify-between lg:justify-start lg:gap-2 lg:text-sm lg:leading-[22px]">
      <section className="flex flex-col">
        <p className="font-semibold text-dark-700">{simplenightOrderNumber}</p>
        <p className="font-semibold text-dark-1000">{snOrderNumber}</p>
      </section>
      <section className="flex flex-col">
        <p className="font-semibold text-dark-700">{bookingDateLabel}</p>
        <p className="font-semibold text-dark-1000">{bookingDate}</p>
      </section>
    </section>
  );
};

export default ConfirmationOrderInfo;
