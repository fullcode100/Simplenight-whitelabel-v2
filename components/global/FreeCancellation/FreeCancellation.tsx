import { useTranslation } from 'react-i18next';

import Check from 'public/icons/assets/check.svg';
import classnames from 'classnames';

interface FreeCancellationProps {
  cancellable?: boolean;
  description?: string;
  wfull?: boolean;
}

const FreeCancellation = ({
  cancellable,
  description,
  wfull = false,
}: FreeCancellationProps) => {
  const [t, i18next] = useTranslation('global');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');

  if (!cancellable) return null;
  return (
    <section
      className={classnames(
        'bg-green-100 min-h-8 border border-green-300 rounded',
        { 'w-full': wfull },
      )}
    >
      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <Check className=" w-6 mt-1 text-green-1000 flex-shrink-0" />
        <label className="text-green-1000 text-[14px] leading-[20px] font-semibold">
          {freeCancellationLabel}
          {description && <p className="font-normal">{description}</p>}
        </label>
      </section>
    </section>
  );
};

export default FreeCancellation;
