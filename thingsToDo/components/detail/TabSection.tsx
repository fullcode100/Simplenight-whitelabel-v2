import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface TabItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const TabsSection = () => {
  const [t] = useTranslation('global');
  const description = t('description', 'Description');
  const policies = t('policies', 'Policies');
  const location = t('location', 'Location');
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
        <TabItem>{description}</TabItem>
        <TabItem>{policies}</TabItem>
        <TabItem>{location}</TabItem>
      </div>
    </section>
  );
};

export default TabsSection;
