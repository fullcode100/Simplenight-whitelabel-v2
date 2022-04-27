import { useTranslation } from 'react-i18next';

import Check from 'public/icons/assets/check.svg';

interface FreeCancellationProps {
  cancellable?: boolean;
}

const FreeCancellation = ({ cancellable }: FreeCancellationProps) => {
  const [t, i18next] = useTranslation('global');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');

  if (!cancellable) return null;
  return (
    <section className="bg-green-100 h-8 border border-green-300 rounded">
      <section className="flex items-center gap-1 py-1 pl-1.5 pr-1">
        <Check className="text-green-1000" />
        <label className="text-green-1000 text-[14px] leading-[20px] font-semibold">
          {freeCancellationLabel}
        </label>
      </section>
    </section>
  );
};

export default FreeCancellation;
