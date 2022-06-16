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
    <section className="flex gap-2 justify-between">
      <section className="flex flex-col">
        <h4 className="font-semibold text-dark-700">
          {simplenightOrderNumber}
        </h4>
        <h1 className="font-semibold text-dark-1000">{snOrderNumber}</h1>
      </section>
      <section className="flex flex-col">
        <h4 className="font-semibold text-dark-700">{bookingDateLabel}</h4>
        <h1 className="font-semibold text-dark-1000">{bookingDate}</h1>
      </section>
    </section>
  );
};

export default ConfirmationOrderInfo;
