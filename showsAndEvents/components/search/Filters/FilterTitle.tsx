const FilterTitle = ({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) => <label className={`mb-2 ${className}`}>{label}</label>;

export default FilterTitle;
