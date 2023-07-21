import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import { RefObject, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TabsSectionProps {
  ticketsRef: RefObject<HTMLDivElement>;
  detailsRef: RefObject<HTMLDivElement>;
  policiesRef: RefObject<HTMLDivElement>;
  locationRef: RefObject<HTMLDivElement>;
}

const TabsSection = ({
  ticketsRef,
  detailsRef,
  policiesRef,
  locationRef,
}: TabsSectionProps) => {
  const [t] = useTranslation('things');
  const tickets = t('tickets', 'Tickets');
  const details = t('details', 'Details');
  const policies = t('policies', 'Policies');
  const location = t('location', 'Location');

  const tabs: Tab[] = [
    { name: tickets, type: tickets },
    { name: details, type: details },
    { name: policies, type: policies },
    { name: location, type: location },
  ];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  const scrollToTickets = () => {
    if (ticketsRef.current) {
      ticketsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPolicies = () => {
    if (policiesRef.current) {
      policiesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocation = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollFunctions: { [key: string]: () => void } = {
    [tickets]: scrollToTickets,
    [details]: scrollToDetails,
    [policies]: scrollToPolicies,
    [location]: scrollToLocation,
  };

  const scrollTo = (tab: string) => {
    const scrollFunction = scrollFunctions[tab];

    if (scrollFunction) scrollFunction();
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    scrollTo(tab.name);
  };

  return (
    <section className="block px-4 lg:hidden">
      <HorizontalTabs
        tabs={tabs}
        activeTab={activeTab}
        onClick={handleTabClick}
        className="bg-dark-900"
      />
    </section>
  );
};

export default TabsSection;
