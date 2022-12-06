import React, { FC, useEffect, useState } from 'react';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from '../../../components/global/AltRadioButton/AltRadioButton';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import useQuerySetter from '../../../hooks/pageInteraction/useQuerySetter';
import MapIcon from '../../../public/icons/assets/map.svg';
import ListIcon from '../../../public/icons/assets/list.svg';
import SortIcon from '../../../public/icons/assets/sort.svg';
import Dropdown from '../../../components/global/Dropdown/Dropdown';
import { useTranslation } from 'react-i18next';
import { ParkingFilter, ParkingSortBy } from '../../types/ParkingFilter';
import { useDebounce } from '../../hooks/useDebounce';

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
  return (
    <div className="w-[100%] bg-white relative z-10">
      <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center gap-2">
        {isLoading ? (
          <div className="w-40 h-8 rounded bg-dark-200 animate-pulse" />
        ) : (
          <div>
            {length} <span>{t('Items')}</span>
          </div>
        )}
        <ParkingTypeFilter onFilterChange={onFilterChange} filter={filter} />
        <ParkingSortingAndViewType
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      </section>
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
    <section className="flex-1 flex justify-center items-center gap-2">
      <AltRadioButtonGroup
        items={parkingTypeFilterItems}
        value={filter.parkingType}
        onChange={setParkingType}
        name="parkingType"
      />
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

  return (
    <section className="flex gap-1">
      <section
        style={{ width: 128, height: 32 }}
        className="w-auto flex justify-start items-center"
      >
        <Dropdown
          title={t(sortByVal)}
          leftIcon={<SortIcon />}
          options={[
            {
              value: t('distance'),
              checkboxName: 'sorting',
              selected: sortByVal === 'distance',
              checkboxValue: sortByVal === 'distance',
              checkboxMethod: () => setSortByVal('distance'),
            },
            {
              value: t('price'),
              checkboxName: 'sorting',
              selected: sortByVal === 'price',
              checkboxValue: sortByVal === 'price',
              checkboxMethod: () => setSortByVal('price'),
            },
          ]}
        />
      </section>
      <AltRadioButtonGroup
        items={viewTypeFilterItems}
        value={view as string}
        onChange={handleViewTypeChange}
        name="parkingType"
      />
    </section>
  );
};
