const BreakdownSubtitle = ({
  value,
  className,
}: {
  value: string;
  className: string;
}) => {
  return <p className={className}>{value}</p>;
};

export default BreakdownSubtitle;
