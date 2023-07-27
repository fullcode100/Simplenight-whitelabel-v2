import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

interface TabItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

interface TicketTabsProps {
  sectorsInfo: SectorInfoProp[];
  selectedTab: ReactNode;
  setSelectedTab: Dispatch<SetStateAction<ReactNode>>;
}

interface SectorInfoProp {
  title: string;
}

const TicketTabs = ({
  sectorsInfo,
  selectedTab,
  setSelectedTab,
}: TicketTabsProps) => {
  const [t] = useTranslation('events');
  const allSectorsLabel = t('allSectors');
  const TabItem = ({ children, isActive }: TabItemProps) => {
    return (
      <button onClick={() => setSelectedTab(children)}>
        <section
          className={classnames('font-semibold py-2 mt-2 px-2 w-max', {
            'border-b-2 border-primary-1000 text-dark-1000': isActive,
          })}
        >
          {children}
        </section>
      </button>
    );
  };
  return (
    <section className="overflow-x-scroll scrollbar-hide">
      <div className="flex gap-2 border-b-2 text-dark-700">
        {sectorsInfo.length > 1 && (
          <TabItem
            isActive={sectorsInfo.every(({ title }) => title !== selectedTab)}
          >
            {allSectorsLabel}
          </TabItem>
        )}
        {sectorsInfo.map(({ title }, id) => {
          return (
            <TabItem
              key={id}
              isActive={title === selectedTab || sectorsInfo.length === 1}
            >
              {title}
            </TabItem>
          );
        })}
      </div>
    </section>
  );
};

export default TicketTabs;
