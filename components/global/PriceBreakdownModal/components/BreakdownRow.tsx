const BreakdownRow = ({
  label,
  price,
  additionalInfo,
}: {
  label: string;
  price: string;
  additionalInfo?: string;
}) => (
  <section className="flex text-base items-start justify-between w-full mt-2">
    <span>{label}</span>
    <section className="flex flex-col items-end">
      <span>{price}</span>
      {additionalInfo && (
        <span className="text-xs text-dark-800">{additionalInfo}</span>
      )}
    </section>
  </section>
);

export default BreakdownRow;
