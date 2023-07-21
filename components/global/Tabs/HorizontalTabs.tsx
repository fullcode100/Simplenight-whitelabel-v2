import classNames from 'classnames';
import { TabsProps } from './types';
import Plus from '../../../public/icons/assets/Plus.svg';
import { useState, useRef } from 'react';
import { Modal } from 'antd';
import CommingSoon from '../ComingSoon';
import { useTranslation } from 'react-i18next';
import categoriesDictonary from './categories-dictionary.util';
import { useRouter } from 'next/router';

const HorizontalTabs = ({
  tabs,
  activeTab,
  onClick,
  className = '',
  boderBottomColor = 'border-white',
  primary = false,
  hideMore,
}: TabsProps) => {
  const [t] = useTranslation('global');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  if (typeof window !== 'undefined') {
    if (
      window.localStorage.getItem('scrollPositionNavHeader') &&
      scrollContainerRef.current
    ) {
      const scrollPosition =
        window.localStorage.getItem('scrollPositionNavHeader') || '0';
      scrollContainerRef.current.scrollLeft = parseInt(scrollPosition);
    }
  }

  const handleSetScrollPosition = () => {
    if (
      scrollContainerRef.current &&
      scrollContainerRef.current.scrollLeft &&
      typeof window !== 'undefined'
    ) {
      window.localStorage.setItem(
        'scrollPositionNavHeader',
        scrollContainerRef.current.scrollLeft.toString(),
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const hoverCss = primary ? 'text-white' : '';
  if (tabs?.length <= 1) return <></>;
  return (
    <div
      className={`sticky ${
        pathname === '/' ? 'z-30' : 'z-30'
      } lg:z-30 block ${className}`}
    >
      <nav
        className="flex justify-start w-full mx-auto overflow-scroll scrollbar-hide max-w-7xl"
        aria-label="Tabs"
        ref={scrollContainerRef}
        onScroll={() => handleSetScrollPosition()}
      >
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={classNames(
              tab.name === activeTab?.name
                ? `${boderBottomColor} ${hoverCss}`
                : 'border-transparent text-dark-400 hover:text-dark-300 hover:border-gray-300',
              'whitespace-nowrap p-3 flex flex-col lg:flex-row gap-1 lg:gap-2 items-center justify-center border-b-2 text-xs font-semibold',
            )}
            aria-current={tab.current ? 'page' : undefined}
            onClick={() => onClick(tab)}
          >
            <div className="flex items-center justify-center w-full h-5">
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
