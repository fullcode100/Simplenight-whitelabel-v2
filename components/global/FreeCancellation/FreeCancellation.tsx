import { useTranslation } from 'react-i18next';

import Check from 'public/icons/assets/check.svg';
import classnames from 'classnames';
import { Paragraph } from '@simplenight/ui';

interface FreeCancellationProps {
  cancellable?: boolean;
  description?: string;
  wfull?: boolean;
  title?: boolean;
}

const FreeCancellation = ({
  cancellable,
  description,
  wfull = false,
  title = true,
}: FreeCancellationProps) => {
  const [t, i18next] = useTranslation('global');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');

  if (!cancellable) return null;
  return (
    <section
      className={classnames('bg-green-100 min-h-8 w-fit rounded', {
        'w-full': wfull,
      })}
    >
      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <Check className="flex-shrink-0 w-6 mt-1 text-green-1000" />
        <label className="text-green-1000 text-[14px] leading-[20px] font-semibold">
          {title && freeCancellationLabel}
          {description && (
            <Paragraph textColor="text-green-1000">{description}</Paragraph>
          )}
        </label>
      </section>
    </section>
  );
};

export default FreeCancellation;
