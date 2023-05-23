import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import { Times } from 'dining/types/response/SearchResponse';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DiningCategoryDetail from './DiningCategoryDetail';
import DiningCoverSelect from './DiningCoverSelect';
import DiningDateDetail from './DiningDateDetail';
import DiningPhoneEmail from './DiningPhoneEmail';
import DiningTimeDetail from './DiningTimeDetail';
import DiningTimeSelector from './DiningTimeSelector';
import DiningIcon from 'public/icons/categories/Category-Dining.svg';

const DiningAboutDetail = ({
  phone,
  categories,
  times,
  onSelectDate,
  isOpen,
  onChange,
  defaultTime,
  onChangeCovers,
  defaultCovers,
}: {
  phone?: string;
  categories: string[];
  times?: Times[];
  onSelectDate: (date: string) => void;
  isOpen: boolean;
  onChange: (time: string) => void;
  defaultTime?: string;
  onChangeCovers?: (covers: number) => void;
  defaultCovers?: number;
}) => {
  const [t] = useTranslation('dining');

  const onSelect = (value: string) => {
    onChange(value);
  };

  return (
    <>
      <DiningPhoneEmail className="py-1 lg:hidden" phone={phone} />
      <DiningTimeDetail className="py-1 lg:hidden" isOpen={isOpen} />
      <DiningCategoryDetail
        className="py-1 pb-4 lg:hidden"
        categories={categories}
      />
      <SectionTitle title={t('bookTable')} icon={<DiningIcon />} />
      <div className="relative grid grid-cols-1 mt-6 gap-x-3 md:grid-cols-2">
        <div className="w-full lg:w-[446px] mr-3">
          <DiningDateDetail onDateChange={onSelectDate} />
        </div>
        <div className="w-full lg:w-[446px] mt-6 md:mt-0">
          <DiningCoverSelect
            onChange={onChangeCovers}
            defaultCovers={defaultCovers}
          />
        </div>
      </div>
      <h6 className="mt-6 text-sm text-dark-800 lg:hidden">{t('timeSlots')}</h6>
      <div className="grid grid-cols-4 mt-6 lg:grid-cols-6 gap-x-3">
        {times &&
          times.length > 0 &&
          times?.map((item) => (
            <DiningTimeSelector
              key={item.time}
              label={item.time}
              onSelect={onSelect}
              status={defaultTime === item.time ? 'selected' : 'enabled'}
            />
          ))}
      </div>
      {!times && <div>{t('reservationNotAvailable')}</div>}
    </>
  );
};

export default DiningAboutDetail;
