import ClockIcon from 'public/icons/assets/clock.svg';
import { useTranslation } from 'react-i18next';

interface CheckOutTimeProps {
  time: string;
}

const CheckOutTime = ({ time }: CheckOutTimeProps) => {
  const [t, i18next] = useTranslation('hotels');
  const checkoutLabel = t('checkOut', 'Check-Out');
  const checkoutTimeLabel = t('checkOutTime', 'Check-Out Time');
  const checkoutBeforeLabel = t('before', 'Before');

  return (
    <section className="space-y-3">
      <h5 className="font-semibold text-dark-800">{checkoutLabel}</h5>
      <section className="flex flex-row gap-2">
        <ClockIcon className="w-5 mt-1 lg:mt-0 text-primary-1000" />
        <section className="font-semibold text-sm leading-lg lg:leading-[22px] space-y-1">
          <p className="text-dark-800">{checkoutTimeLabel}</p>
          <p className="text-dark-1000">{`${checkoutBeforeLabel} ${time}`}</p>
        </section>
      </section>
    </section>
  );
};

export default CheckOutTime;
