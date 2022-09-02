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
    <div className={`block ${className} mb-6`}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={classNames(
                tab.value === activeTab.value
                  ? `border-primary-500 ${hoverCss}`
                  : 'border-transparent text-dark-700 hover:text-dark-1000 hover:border-gray-300',
                'whitespace-nowrap pb-2 px-3 flex flex-col items-center justify-center border-b-2 text-sm font-semibold',
              )}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => onClick(tab)}
            >
              <div className="h-6 w-6 flex justify-center items-center">
                {tab.icon}
              </div>
              {tab.value}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
