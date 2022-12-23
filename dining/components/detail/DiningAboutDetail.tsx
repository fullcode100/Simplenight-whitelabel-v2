import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import { WeekDaysAvailability } from 'dining/types/response/SearchResponse';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DiningCategoryDetail from './DiningCategoryDetail';
import DiningCoverSelect from './DiningCoverSelect';
import DiningDateDetail from './DiningDateDetail';
import DiningOpenTimes from './DiningOpenTimes';
import DiningPhoneEmail from './DiningPhoneEmail';
import DiningTimeDetail from './DiningTimeDetail';
import DiningTimeSelector from './DiningTimeSelector';

const DiningAboutDetail = ({
  phone,
  categories,
  hours,
  onSelectDate,
  isOpen,
  onChange,
  defaultTime,
  onChangeCovers,
  defaultCovers,
  hoursByDay,
}: {
  phone?: string;
  categories: string[];
  hours?: string[];
  onSelectDate: (date: string) => void;
  isOpen: boolean;
  onChange: (time: string) => void;
  defaultTime?: string;
  onChangeCovers?: (covers: number) => void;
  defaultCovers?: number;
  hoursByDay?: WeekDaysAvailability;
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
      <SectionTitle title={t('about')} />
      <DiningOpenTimes hoursByDay={hoursByDay} />
      <h5 className="mt-10 text-lg text-dark-800">{t('reservation')}</h5>
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
        {hours && hours.length > 0 ? (
          hours?.map((value) => (
            <DiningTimeSelector
              key={value}
              label={value}
              onSelect={onSelect}
              status={defaultTime === value ? 'selected' : 'enabled'}
            />
          ))
        ) : (
          <div>{t('closedDate')}</div>
        )}
      </div>
    </>
  );
};

export default DiningAboutDetail;
