import classNames from 'classnames';
import { TabsProps } from './types';

export default function HorizontalTabs({
  tabs,
  activeTab,
  onClick,
  className = '',
  primary = false,
}: TabsProps) {
  const hoverCss = primary
    ? 'text-primary-1000 hover:text-primary-700 hover:border-primary-500'
    : '';

  if (tabs.length <= 1) return <></>;
  return (
    <div className={`block ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="flex justify-center -mb-px" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={classNames(
                tab.name === activeTab?.name
                  ? `border-primary-500 ${hoverCss}`
                  : 'border-transparent text-dark-700 hover:text-dark-1000 hover:border-gray-300',
                'whitespace-nowrap pb-2 px-3 flex flex-col items-center justify-center border-b-2 text-sm font-semibold',
              )}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => onClick(tab)}
            >
              <div className="flex items-center justify-center w-6 h-6">
                {tab.icon}
              </div>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
