import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { useTranslation } from 'react-i18next';

interface BreakdownTotalProps {
  total?: string;
}

const BreakdownTotal = ({ total }: BreakdownTotalProps) => {
  const [t, i18next] = useTranslation('global');
  const totalLabel = t('total', 'Total');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  return (
    <section className="flex items-center justify-between">
      <p className="mt-2.5 text-sm leading-[22px] text-dark-1000">
        {totalLabel}
      </p>
      <section>
        <p className="font-semibold text-lg leading-[25px] text-dark-1000 text-right">
          {total}
        </p>
        <section className="flex flex-row gap-1">
          <p className="text-xs leading-lg text-dark-800">
            {taxesAndFeesLabel}
          </p>
          <TaxesAndFeesPopover />
        </section>
      </section>
    </section>
  );
};

export default BreakdownTotal;
