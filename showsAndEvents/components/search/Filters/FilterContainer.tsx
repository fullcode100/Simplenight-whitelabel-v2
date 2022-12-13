const FilterContainer = ({
  children,
  className = '',
}: {
  children?: any;
  className?: string;
}) => (
  <section className={`flex flex-col mt-4 mb-6 ${className}`}>
    {children}
  </section>
);

export default FilterContainer;
