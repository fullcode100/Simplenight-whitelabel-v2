interface ExtraDetailItemProps {
  detail?: string;
  label: string;
}

const ExtraDetailItem = ({ detail, label }: ExtraDetailItemProps) => {
  if (!detail) return <></>;
  return (
    <section className="font-semibold text-xs leading-lg">
      <p className="text-dark-800">{label}</p>
      <p className="text-dark-1000">{detail}</p>
    </section>
  );
};

export default ExtraDetailItem;
