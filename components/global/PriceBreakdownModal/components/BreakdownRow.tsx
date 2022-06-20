interface BreakdownRowProps {
  label: string;
  price: string;
  additionalInfo?: string;
  labelClassName?: string;
  priceClassName?: string;
}

const BreakdownRow = ({
  label,
  price,
  additionalInfo,
  labelClassName,
  priceClassName,
}: BreakdownRowProps) => (
  <section className="flex text-base items-start justify-between w-full mt-1">
    <span className={labelClassName}>{label}</span>
    <section className="flex flex-col items-end">
      <span className={priceClassName}>{price}</span>
      {additionalInfo && (
        <span className="text-xs text-dark-800">{additionalInfo}</span>
      )}
    </section>
  </section>
);

export default BreakdownRow;
