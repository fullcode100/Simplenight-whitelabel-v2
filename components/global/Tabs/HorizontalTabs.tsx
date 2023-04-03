import classNames from 'classnames';
import { TabsProps } from './types';
import Plus from '../../../public/icons/assets/Plus.svg';
import { useState } from 'react';
import { Modal } from 'antd';
import CommingSoon from '../ComingSoon';
import { useTranslation } from 'react-i18next';

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

  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].name == 'Ground Transportation') {
      tabs[i].name = t('GroundTransportation', tabs[i].name);
    }
    if (tabs[i].name == 'Hotels') {
      tabs[i].name = t('hotelName', tabs[i].name);
    }
    if (tabs[i].name == 'Shows & Events') {
      tabs[i].name = t('ShowsEvents', tabs[i].name);
    }
    if (tabs[i].name == 'Flights') {
      tabs[i].name = t('FlightsName', tabs[i].name);
    }
    if (tabs[i].name == 'Dining') {
      tabs[i].name = t('DiningName', tabs[i].name);
    }
    if (tabs[i].name == 'Entertainment') {
      tabs[i].name = t('EntertainmentName', tabs[i].name);
    }
    if (tabs[i].name == 'Transportation') {
      tabs[i].name = t('TransportationName', tabs[i].name);
    }
    if (tabs[i].name == 'Classes & Workshops') {
      tabs[i].name = t('ClassesWorkshops', tabs[i].name);
    }
    if (tabs[i].name == 'Car Rental') {
      tabs[i].name = t('CarRental', tabs[i].name);
    }
    if (tabs[i].name == 'Parking') {
      tabs[i].name = t('ParkingName', tabs[i].name);
    }
    if (tabs[i].name == 'Food & Beverage') {
      tabs[i].name = t('FoodBeverage', tabs[i].name);
    }
    if (tabs[i].name == 'Other') {
      tabs[i].name = t('OtherName', tabs[i].name);
    }
  }
  if (tabs?.length <= 1) return <></>;
  return (
    <div
      className={`sticky overflow-scroll scrollbar-hide z-30 bg-dark-900 block ${className}`}
    >
      <nav className="flex justify-start lg:justify-center" aria-label="Tabs">
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
            {tab.name}
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
