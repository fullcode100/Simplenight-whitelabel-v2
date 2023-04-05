import classNames from 'classnames';
import { TabsProps } from './types';
import Plus from '../../../public/icons/assets/Plus.svg';
import { useState } from 'react';
import { Modal } from 'antd';
import CommingSoon from '../ComingSoon';
import { useTranslation } from 'react-i18next';
import categoriesDictonary from './categories-dictionary.util';

const HorizontalTabs = ({
  tabs,
  activeTab,
  onClick,
  className = '',
  primary = false,
  hideMore,
}: TabsProps) => {
  const [t] = useTranslation('global');
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
  const hoverCss = primary ? 'text-white' : '';
  if (tabs?.length <= 1) return <></>;
  return (
    <div
      className={`sticky overflow-scroll scrollbar-hide z-30 bg-dark-900 block ${className}`}
    >
      <nav
        className="flex justify-start w-full mx-auto max-w-7xl overflow-hidden"
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={classNames(
              tab.name === activeTab?.name
                ? `border-white ${hoverCss}`
                : 'border-transparent text-dark-400 hover:text-dark-300 hover:border-gray-300',
              'whitespace-nowrap p-3 flex gap-2 items-center justify-center border-b-2 text-xs font-semibold',
            )}
            aria-current={tab.current ? 'page' : undefined}
            onClick={() => onClick(tab)}
          >
            <div className="flex items-center justify-center w-5 h-5">
              {tab.icon}
            </div>
            {t(categoriesDictonary[tab.name], tab.name)}
          </button>
        ))}
        {!hideMore && (
          <button
            key={'more'}
            onClick={() => setIsModalOpen(true)}
            className={classNames(
              'border-transparent text-dark-400 hover:text-dark-300 hover:border-gray-300',
              'whitespace-nowrap p-3 flex gap-2 items-center justify-center border-b-2 text-xs font-semibold',
            )}
            aria-current={undefined}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <Plus />
            </div>
            {t('ComingSoon', 'Coming Soon')}
          </button>
        )}
      </nav>
      <Modal
        visible={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        width={842}
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <CommingSoon />
      </Modal>
    </div>
  );
};

export default HorizontalTabs;
