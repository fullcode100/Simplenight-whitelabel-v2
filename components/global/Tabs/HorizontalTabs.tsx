import classNames from 'classnames';
import { useState } from 'react';
import { Tab, TabsProps } from './types';

export default function HorizontalTabs({
  tabs,
  onClick,
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <div className={`block ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={classNames(
                tab.value === activeTab.value
                  ? 'border-primary-500'
                  : 'border-transparent text-dark-700 hover:text-dark-1000 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 text-sm font-semibold',
              )}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => onClick(tab, setActiveTab)}
            >
              {tab.value}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
