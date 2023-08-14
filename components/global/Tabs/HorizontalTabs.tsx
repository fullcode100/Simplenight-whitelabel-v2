import React from 'react';
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
  itemTabClassName = '',
  aditionalItemTabClassName = '',
  boderBottomColor = 'border-white',
  inactiveTabClassName = 'text-dark-400 hover:text-dark-300 hover:border-gray-300 ',
  activeTabClassName = '',
  primary = false,
  hideMore,
}: TabsProps) => {
  const [t] = useTranslation('global');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setScrollPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    const diff = e.clientX - scrollPosition;
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollLeft -= diff;
    }

    setScrollPosition(e.clientX);
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
        className="flex justify-start w-full"
        aria-label="Tabs"
        ref={scrollContainerRef}
        onScroll={() => handleSetScrollPosition()}
      >
        <div
          ref={scrollContentRef}
          className="scroll-content whitespace-nowrap grab-cursor flex justify-start w-full mx-auto overflow-scroll scrollbar-hide max-w-7xl"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={classNames(
                'whitespace-nowrap flex flex-col lg:flex-row p-3 pb-1 gap-1 lg:gap-2 items-center justify-center border-b-2 text-xs font-semibold',
                tab.name === activeTab?.name
                  ? `${boderBottomColor} ${hoverCss} ${activeTabClassName}`
                  : `border-transparent text-dark-400 ${inactiveTabClassName}`,
                itemTabClassName,
              )}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => onClick(tab)}
            >
              {t(categoriesDictonary[tab.name], tab.name)}
            </button>
          ))}
          {!hideMore && (
            <button
              key={'more'}
              onClick={() => setIsModalOpen(true)}
              className={classNames(
                'border-transparent text-dark-400 hover:text-dark-300 hover:border-gray-300 whitespace-nowrap p-3 pb-1 flex gap-2 items-center justify-center border-b-2 text-xs font-semibold',
                aditionalItemTabClassName,
              )}
              aria-current={undefined}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <Plus />
              </div>
              {t('ComingSoon', 'Coming Soon')}
            </button>
          )}
        </div>
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
