import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import PlusIcon from 'public/icons/assets/Plus.svg';

interface AmountDetailItemProps {
  amount?: string;
  label: string;
}

const AmountDetailItem = ({ amount, label }: AmountDetailItemProps) => {
  return (
    <section className="flex justify-between">
      <section className="flex flex-row gap-1">
        <section className="flex flex-row gap-1 lg:gap-3">
          <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
            {label}
          </p>
        </section>
        <TaxesAndFeesPopover />
      </section>

      <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
        {amount}
      </p>
    </section>
  );
};

export default AmountDetailItem;
