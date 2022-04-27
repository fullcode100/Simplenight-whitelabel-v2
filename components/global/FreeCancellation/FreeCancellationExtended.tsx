import { useTranslation } from 'react-i18next';

import Check from 'public/icons/assets/check.svg';

interface FreeCancellationExtendedProps {
  policy?: string;
}

const FreeCancellationExtended = ({
  policy,
}: FreeCancellationExtendedProps) => {
  const [t, i18next] = useTranslation('global');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');
  const policyLabel = t('policy', 'Policy');

  if (!policy) return null;
  return (
    <section className="bg-green-100 h-13 border border-green-300 rounded">
      <section className="flex gap-1 py-1 pl-1.5 pr-1">
        <section className="py-1">
          <Check className="text-green-1000" />
        </section>
        <section className="flex flex-col">
          <label className="text-green-1000 text-[14px] leading-[20px] font-semibold">
            {freeCancellationLabel}
          </label>
          <div className="text-green-1000 text-[14px] leading-[20px]">
            {`${policyLabel}: ${policy}`}
          </div>
        </section>
      </section>
    </section>
  );
};

export default FreeCancellationExtended;
