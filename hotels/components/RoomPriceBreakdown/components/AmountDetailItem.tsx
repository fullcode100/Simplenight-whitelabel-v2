import { Paragraph, Pricing } from '@simplenight/ui';
import PlusIcon from 'public/icons/assets/Plus.svg';

interface AmountDetailItemProps {
  amount?: string;
  label: string;
}

const AmountDetailItem = ({ amount, label }: AmountDetailItemProps) => {
  return (
    <section className="flex justify-between">
      <section className="flex flex-row gap-1">
        <section className="flex flex-row gap-1 lg:gap-3 items-center">
          <PlusIcon className="h-3.5 text-primary-1000 lg:h-4 lg:w-4 grid place-items-center" />
          <Paragraph>{label}</Paragraph>
        </section>
      </section>

      <Pricing>
        <Pricing.Total totalAmount={amount as string} />
      </Pricing>
    </section>
  );
};

export default AmountDetailItem;
