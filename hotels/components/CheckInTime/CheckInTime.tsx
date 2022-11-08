import ClockIcon from 'public/icons/assets/clock.svg';
import { useTranslation } from 'react-i18next';

interface CheckInTimeProps {
  time: string;
}

const CheckInTime = ({ time }: CheckInTimeProps) => {
  const [t, i18next] = useTranslation('hotels');
  const checkinFromLabel = t('from', 'From');
  const checkinLabel = t('checkIn', 'Check-In');
  const checkinTimeLabel = t('checkInTime', 'Check-In Time');
  return (
    <section className="space-y-3">
      <h5 className="font-semibold text-dark-800">{checkinLabel}</h5>
      <section className="flex flex-row gap-2">
        <ClockIcon className="w-5 mt-1 lg:mt-0 text-primary-1000" />
        <section className="font-semibold text-sm leading-lg lg:leading-[22px] space-y-1">
          <p className="text-dark-800">{checkinTimeLabel}</p>
          <p className="text-dark-1000">{`${checkinFromLabel} ${time}`}</p>
        </section>
      </section>
    </section>
  );
};

export default CheckInTime;
