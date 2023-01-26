import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import Paragraph from '../Typography/Paragraph';

interface NonRefundableProps {
  nonCancellable?: boolean;
  description?: string;
  wfull?: boolean;
}

const NonRefundable = ({
  nonCancellable,
  description,
  wfull = false,
}: NonRefundableProps) => {
  const [t, i18next] = useTranslation('global');
  const nonRefundableLabel = t('nonRefundable', 'Non-Refundable');

  if (!nonCancellable) return null;
  return (
    <section
      className={classnames('bg-dark-100 min-h-8 w-fit  rounded', {
        'w-full': wfull,
      })}
    >
      <section className="flex gap-1.5 px-2 py-1.5">
        <label className="text-dark-1000 text-[14px] leading-[20px] font-semibold">
          {nonRefundableLabel}
          {description && <Paragraph>{description}</Paragraph>}
        </label>
      </section>
    </section>
  );
};

export default NonRefundable;
