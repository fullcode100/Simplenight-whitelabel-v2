import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from '../../../components/global/AltRadioButton/AltRadioButton';
import MapIcon from '../../../public/icons/assets/map.svg';
import ListIcon from '../../../public/icons/assets/list.svg';
import { useTranslation } from 'react-i18next';
import { ParkingSortBy } from '../../types/ParkingFilter';
import SortAsc from '@/icons/assets/sort.svg';
import SortDesc from '@/icons/assets/sort-desc.svg';
import Filter from '@/icons/assets/filter.svg';
import Chevron from '@/icons/assets/chevron-down-small.svg';
import { Radio, RadioGroup } from '../../../components/global/Radio/Radio';
import { Divider } from 'antd';
import classNames from 'classnames';

interface SearchResultsHeaderProps {
  length: number;
  isLoading: boolean;
  sortBy: ParkingSortBy;
  parkingType: string;
  onParkingTypeChange: (parkingType: string) => void;
  onSortByChange: (sortBy: ParkingSortBy) => void;
  view: string;
  onViewChange: (view: string) => void;
  setMobileFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultsHeader: FC<SearchResultsHeaderProps> = ({
  isLoading,
  length,
  parkingType,
  sortBy,
  onParkingTypeChange,
  onSortByChange,
  view,
  onViewChange,
  setMobileFilterOpen,
}) => {
  const [t] = useTranslation('parking');
  const isMapView = view === 'map';

  return (
    <div
      className={classNames('w-[100%] lg:mb-0 bg-white relative z-[9]', {
        'mb-16': !isMapView,
        'lg:absolute lg:m-4 lg:rounded px-4': isMapView,
      })}
      style={{
        width: isMapView ? 'calc(100% - 32px)' : undefined,
      }}
    >
      <section className="lg:mt-0 py-3 text-dark-1000 font-semibold text-[20px] leading-[24px] flex justify-between items-center gap-2 px-4 lg:px-0">
        {isLoading ? (
          <span className="w-24 h-8 rounded bg-dark-200 animate-pulse" />
        ) : (
          <span className="whitespace-nowrap">
            {length} <span>{t('results')}</span>
          </span>
        )}
        <ParkingTypeFilter
          onParkingTypeChange={onParkingTypeChange}
          parkingType={parkingType}
          view={view}
        />

        <ParkingSortingAndViewType
          sortBy={sortBy}
          onSortChange={onSortByChange}
          view={view}
          onViewChange={onViewChange}
          setMobileFilterOpen={setMobileFilterOpen}
        />
      </section>
      <Divider className="m-0 lg:hidden" />
    </div>
  );
};

const ParkingTypeFilter: FC<{
  parkingType: string;
  onParkingTypeChange: (parkingType: string) => void;
  view: string;
}> = ({ parkingType, onParkingTypeChange, view }) => {
  const [t] = useTranslation('parking');
  const isMapView = view === 'map';
  const parkingTypeFilterItems: RadioItemType[] = [
    {
      value: 'ALL',
      label: t('all'),
    },
    {
      value: 'OFF_STREET',
      label: t('garages'),
    },
    {
      value: 'ON_STREET',
      label: t('street'),
    },
    {
      value: 'private',
      label: t('private'),
    },
  ];

  return (
    <section
      className={classNames(
        'absolute w-full lg:static top-[100%] left-0 flex justify-center p-4',
        { 'lg:p-0': isMapView },
      )}
    >
      <section className="flex-1 flex justify-center items-center gap-2 max-w-[400px]">
        <AltRadioButtonGroup
          items={parkingTypeFilterItems}
          value={parkingType}
          onChange={onParkingTypeChange}
          name="parkingType"
        />
      </section>
    </section>
  );
};

const ParkingSortingAndViewType: FC<{
  sortBy: ParkingSortBy;
  onSortChange: (sortBy: ParkingSortBy) => void;
  view: string;
  onViewChange: (view: string) => void;
  setMobileFilterOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ sortBy, onSortChange, view, onViewChange, setMobileFilterOpen }) => {
  const { t } = useTranslation('parking');
  const viewTypeFilterItems: RadioItemType[] = [
    {
      value: 'list',
      label: <ListIcon />,
    },
    {
      value: 'map',
      label: <MapIcon />,
    },
  ];

  const [showSortingDropdown, setShowSortingDropdown] = useState(false);

  return (
    <section className="flex gap-4">
      <section className="w-auto flex justify-start items-center gap-4 rounded px-2 lg:px-0 bg-primary-100 lg:bg-transparent">
        <section className="relative">
          <button
            className="flex items-center gap-2 lg:w-[100px] h-6"
            onClick={() => setShowSortingDropdown((p) => !p)}
            onBlur={() => setShowSortingDropdown(false)}
          >
            <span className="text-primary-1000">
              {sortBy.includes('ASC') ? <SortAsc /> : <SortDesc />}
            </span>
            <span className="text-xs font-semibold text-left text-dark-1000 flex-1">
              <span className="hidden lg:inline">
                {t(sortBy.includes('distance') ? 'distance' : 'price')}
              </span>
              <span className="inline lg:hidden">{t('sort')}</span>
            </span>
            <span className="text-dark-800">
              <Chevron />
            </span>
          </button>

          <section
            className={`absolute z-[9] border border-dark-300 rounded shadow-container top-[100%] right-0 bg-white w-[320px] transition-all duration-500 text-dark-1000 ${
              !showSortingDropdown && 'opacity-0 invisible'
            }`}
          >
            <RadioGroup onChange={onSortChange} value={sortBy} gap="gap-0">
              <Radio
                value="distanceASC"
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t('distanceASC')}
              </Radio>
              <Radio
                value="distanceDESC"
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t('distanceDESC')}
              </Radio>
              <Radio
                value="priceASC"
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t('priceASC')}
              </Radio>
              <Radio
                value="priceDESC"
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t('priceDESC')}
              </Radio>
            </RadioGroup>
          </section>
        </section>

        <button
          className="flex items-center gap-2 lg:w-[100px] h-6 lg:hidden"
          onClick={() => setMobileFilterOpen(true)}
        >
          <span className="text-primary-1000">
            <Filter />
          </span>
          <span className="text-xs font-semibold text-left text-dark-1000 flex-1">
            {t('filter')}
          </span>
        </button>
      </section>
      <section className="hidden lg:block">
        <AltRadioButtonGroup
          items={viewTypeFilterItems}
          value={view}
          onChange={onViewChange}
          name="viewType"
          square={true}
        />
      </section>
    </section>
  );
};
