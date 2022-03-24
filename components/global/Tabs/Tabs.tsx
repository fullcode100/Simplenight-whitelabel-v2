import { findOrFirst } from 'helpers/arrayUtils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Tab } from './types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface TabsProps {
  tabs: Tab[];
  onClick: (tab: Tab, setActiveTab: (tab: Tab) => void) => void;
}

const Tabs = ({ tabs, onClick }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <div>
      <div className="block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={classNames(
                tab.value === activeTab.value
                  ? 'bg-primary-1000 text-white'
                  : 'text-primary-1000 hover:bg-primary-700',
                'px-3 py-2 font-medium text-sm rounded-1000',
              )}
              aria-current={tab === activeTab ? 'page' : undefined}
              onClick={() => onClick(tab, setActiveTab)}
            >
              {tab.value}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
