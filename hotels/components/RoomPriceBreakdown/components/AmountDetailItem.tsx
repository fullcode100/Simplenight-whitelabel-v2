import PlusIcon from 'public/icons/assets/Plus.svg';

interface AmountDetailItemProps {
  amount?: string;
  label: string;
}

const AmountDetailItem = ({ amount, label }: AmountDetailItemProps) => {
  return (
    <section className="flex justify-between">
      <section className="flex flex-row gap-1">
        <PlusIcon className="h-3.5 ml-0.5 mr-1 mt-1 text-primary-1000" />
        <p className="font-semibold text-sm text-dark-1000">{label}</p>
      </section>
      <p className="font-semibold text-sm text-dark-1000">{amount}</p>
    </section>
  );
};

export default AmountDetailItem;
