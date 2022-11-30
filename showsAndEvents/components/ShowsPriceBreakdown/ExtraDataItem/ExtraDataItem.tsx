interface ExtraDetailItemProps {
  detail?: string;
  label: string;
}

const ExtraDetailItem = ({ detail, label }: ExtraDetailItemProps) => {
  if (!detail) return <></>;
  return (
    <section className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px]">
      <p className="text-dark-700">{label}</p>
      <p className="text-dark-1000">{detail}</p>
    </section>
  );
};

export default ExtraDetailItem;
