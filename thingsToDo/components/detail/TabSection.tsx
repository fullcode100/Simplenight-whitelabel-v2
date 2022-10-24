import classnames from 'classnames';

interface TabItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const TabsSection = () => {
  const TabItem = ({ children, isActive }: TabItemProps) => {
    return (
      <section
        className={classnames('font-semibold text-sm py-4 px-5', {
          'border-b-2 border-primary-1000 text-dark-1000': isActive,
        })}
      >
        {children}
      </section>
    );
  };
  return (
    <section>
      <div className="bg-dark-100 px-5 flex gap-2 text-dark-700">
        <TabItem isActive>Tickets</TabItem>
        <TabItem>Details</TabItem>
        <TabItem>Policies</TabItem>
        <TabItem>Location</TabItem>
      </div>
    </section>
  );
};

export default TabsSection;
