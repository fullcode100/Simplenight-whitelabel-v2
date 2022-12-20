import classNames from 'classnames';
import { TabsProps } from './types';
import Plus from '../../../public/icons/assets/Plus.svg';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import CommingSoon from '../ComingSoon';

const HorizontalTabs = ({
  tabs,
  activeTab,
  onClick,
  className = '',
  primary = false,
}: TabsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const hoverCss = primary
    ? 'text-primary-1000 hover:text-primary-700 hover:border-primary-500'
    : '';

  if (tabs?.length <= 1) return <></>;
  return (
    <div className={`block ${className}`}>
      <div className="border-b border-gray-200">
        <nav
          className="flex justify-start -mb-px overflow-x-scroll lg:justify-center scrollbar-hide"
          aria-label="Tabs"
        >
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
          <button
            key={'more'}
            onClick={() => setIsModalOpen(true)}
            className={classNames(
              'border-transparent text-dark-700 hover:text-dark-1000 hover:border-gray-300',
              'whitespace-nowrap pb-2 px-3 flex flex-col items-center justify-center border-b-2 text-sm font-semibold',
            )}
            aria-current={undefined}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <Plus />
            </div>
            more
          </button>
        </nav>
      </div>
      <Modal
        visible={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        width={842}
      >
        <CommingSoon />
      </Modal>
    </div>
  );
};

export default HorizontalTabs;
