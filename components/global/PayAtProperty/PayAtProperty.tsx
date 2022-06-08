import InformationIcon from 'public/icons/assets/info-circle.svg';
import { useTranslation } from 'react-i18next';

interface PayAtPropertyProps {
  className?: string;
}
const PayAtProperty = ({ className }: PayAtPropertyProps) => {
  const [t] = useTranslation('hotels');
  const payAtPropertyText = t('payAtProperty', 'Pay at property');
  return (
    <section
      className={`flex items-center gap-2 border border-dark-300 rounded-4 py-1 px-1.5 ${className}`}
    >
      <InformationIcon className="text-primary-1000" />
      <p className="text-sm">{payAtPropertyText}</p>
    </section>
  );
};

export default PayAtProperty;
