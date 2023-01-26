import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import Paragraph from '../Typography/Paragraph';

interface PartialRefundProps {
  nonCancellable?: boolean;
  description?: string;
  wfull?: boolean;
}

const PartialRefund = ({
  nonCancellable,
  description,
  wfull = false,
}: PartialRefundProps) => {
  const [t] = useTranslation('global');
  const partialRefundLabel = t('partialRefund', 'Partial Refund');

  if (!nonCancellable) return null;
  return (
    <section
      className={classnames('bg-dark-100 min-h-8 w-fit rounded', {
        'w-full': wfull,
      })}
    >
      <section className="flex gap-1.5 px-2 py-1.5">
        <label className="text-dark-1000 text-[14px] leading-[20px] font-semibold">
          {partialRefundLabel}
          {description && <Paragraph>{description}</Paragraph>}
        </label>
      </section>
    </section>
  );
};

export default PartialRefund;
