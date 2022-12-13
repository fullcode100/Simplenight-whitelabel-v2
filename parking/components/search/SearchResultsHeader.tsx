import React, { FC, useEffect, useState } from 'react';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from '../../../components/global/AltRadioButton/AltRadioButton';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import useQuerySetter from '../../../hooks/pageInteraction/useQuerySetter';
import MapIcon from '../../../public/icons/assets/map.svg';
import ListIcon from '../../../public/icons/assets/list.svg';
import { useTranslation } from 'react-i18next';
import { ParkingFilter, ParkingSortBy } from '../../types/ParkingFilter';
import { useDebounce } from '../../hooks/useDebounce';
import Sort from '@/icons/assets/sort.svg';
import Filter from '@/icons/assets/filter.svg';
import Chevron from '@/icons/assets/chevron-down-small.svg';
import { Radio, RadioGroup } from '../../../components/global/Radio/Radio';
import { Divider } from 'antd';
import classNames from 'classnames';

interface SearchResultsHeaderProps {
  length: number;
  isLoading: boolean;
  onFilterChange: (filter: Partial<ParkingFilter>) => void;
  onSortChange: (sortBy: ParkingSortBy) => void;
  sortBy: ParkingSortBy;
  filter: ParkingFilter;
}

export const SearchResultsHeader: FC<SearchResultsHeaderProps> = ({
  isLoading,
  length,
  onFilterChange,
  filter,
  onSortChange,
  sortBy,
}) => {
  const [t] = useTranslation('parking');
  const { view } = useQuery();
  const isMapView = view === 'map';
  return (
    <div
      className={classNames('w-[100%] lg:mb-0 bg-white relative z-10', {
        'mb-16': !isMapView,
      })}
    >
      <section className="mt-6 lg:mt-0 py-3 text-dark-1000 font-semibold text-[20px] leading-[24px] flex justify-between items-center gap-2 px-4 lg:px-0">
        {isLoading ? (
          <span className="w-24 h-8 rounded bg-dark-200 animate-pulse" />
        ) : (
          <span className="whitespace-nowrap">
            {length} <span>{t('results')}</span>
          </span>
        )}
        <ParkingTypeFilter onFilterChange={onFilterChange} filter={filter} />
        <ParkingSortingAndViewType
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      </section>
      <Divider className="m-0 lg:hidden" />
    </div>
  );
};

const ParkingTypeFilter: FC<{
  filter: ParkingFilter;
  onFilterChange: (filter: Partial<ParkingFilter>) => void;
}> = ({ filter, onFilterChange }) => {
  const [t] = useTranslation('parking');

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

  const setParkingType = (parkingType: string) => {
    onFilterChange({ parkingType });
  };

  return (
    <section className="absolute w-full lg:static top-[100%] left-0 p-4 flex justify-center">
      <section className="flex-1 flex justify-center items-center gap-2 max-w-[400px]">
        <AltRadioButtonGroup
          items={parkingTypeFilterItems}
          value={filter.parkingType}
          onChange={setParkingType}
          name="parkingType"
        />
      </section>
    </section>
  );
};

const ParkingSortingAndViewType: FC<{
  sortBy: ParkingSortBy;
  onSortChange: (sortBy: ParkingSortBy) => void;
}> = ({ sortBy, onSortChange }) => {
  const { t } = useTranslation('parking');
  const { view = 'list' } = useQuery();
  const setQueryParam = useQuerySetter();
  const handleViewTypeChange = (view: string) => {
    setQueryParam({ view });
  };

  const [sortByVal, setSortByVal] = useState(sortBy);
  const debouncedSortBy = useDebounce(sortByVal, 200);

  useEffect(() => {
    onSortChange(debouncedSortBy);
  }, [debouncedSortBy]);

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
              <Sort />
            </span>
            <span className="text-xs font-semibold text-left text-dark-1000 flex-1">
              <span className="hidden lg:inline">{t(sortByVal)}</span>
              <span className="inline lg:hidden">{t('sort')}</span>
            </span>
            <span className="text-dark-800">
              <Chevron />
            </span>
          </button>

          <section
            className={`absolute z-10 border border-dark-300 rounded shadow-container top-[100%] right-0 bg-white w-[256px] transition-all duration-500 text-dark-1000 ${
              !showSortingDropdown && 'opacity-0 invisible'
            }`}
          >
            <RadioGroup onChange={setSortByVal} value={sortBy} gap="gap-0">
              <Radio
                value="distance"
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t('distance')}
              </Radio>
              <Radio
                value="price"
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t('price')}
              </Radio>
            </RadioGroup>
          </section>
        </section>

        <button
          className="flex items-center gap-2 lg:w-[100px] h-6 lg:hidden"
          onClick={() => setShowSortingDropdown((p) => !p)}
          onBlur={() => setShowSortingDropdown(false)}
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
          value={view as string}
          onChange={handleViewTypeChange}
          name="viewType"
          square={true}
        />
      </section>
    </section>
  );
};
