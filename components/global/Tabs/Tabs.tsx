import React from 'react';
import { TabsProps } from './types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ tabs, activeTab, onClick }: TabsProps) => {
  return (
    <div>
      <div className="block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={classNames(
                tab.name === activeTab.name
                  ? 'bg-primary-1000 text-white'
                  : 'text-primary-1000 hover:bg-primary-700',
                'px-3 py-2 font-semibold text-sm rounded-1000 flex items-center gap-2',
              )}
              aria-current={tab === activeTab ? 'page' : undefined}
              onClick={() => onClick(tab)}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
