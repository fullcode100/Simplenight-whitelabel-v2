import React, { FC } from 'react';
import { FilterHeader } from '@/components/search';
import {
  AvailabilityFilter,
  FeaturesFilter,
  PriceFilter,
  SurfaceTypeFilter,
  VehicleHeightFilter,
} from './Filters';
import { Divider } from 'antd';
import { ParkingFilter, ParkingListMetaData } from '../../types/ParkingFilter';

interface ParkingFilterFormDesktopProps {
  filter: ParkingFilter;
  onFilterChange: (filters: Partial<ParkingFilter>) => void;
  parkingMetaData: ParkingListMetaData;
}

export const ParkingFilterFormDesktop: FC<ParkingFilterFormDesktopProps> = ({
  filter: {
    highAvailability,
    // surfaceType,
    // features,
    minPrice,
    maxPrice,
    minHeight,
    maxHeight,
  },
  onFilterChange,
  parkingMetaData,
}) => {
  const onHighAvailabilityChange = (highAvailability: boolean) => {
    onFilterChange({ highAvailability });
  };

  const onSurfaceTypeChange = (surfaceType: string[]) => {
    onFilterChange({ surfaceType });
  };

  const onFeaturesChange = (features: string[]) => {
    onFilterChange({ features });
  };

  const handleClearFilters = () => false;

  const onMinMaxPriceChange = ([minPrice, maxPrice]: [number, number]) => {
    onFilterChange({ minPrice, maxPrice });
  };

  const onMinMaxHeightChange = ([minHeight, maxHeight]: [number, number]) => {
    onFilterChange({ minHeight, maxHeight });
  };

  return (
    <section className="h-full py-4">
      <FilterHeader handleClearFilters={handleClearFilters} />
      <PriceFilter
        minPrice={parkingMetaData.minPrice}
        maxPrice={parkingMetaData.maxPrice}
        value={[minPrice, maxPrice]}
        onChange={onMinMaxPriceChange}
        currency={
          parkingMetaData.currencySymbol || `${parkingMetaData.currency} `
        }
      />
      <Divider className="my-6" />
      <AvailabilityFilter
        highAvailability={highAvailability}
        onChangeHighAvailability={onHighAvailabilityChange}
      />
      <Divider className="my-6" />
      <SurfaceTypeFilter onChange={onSurfaceTypeChange} />
      <Divider className="my-6" />
      <FeaturesFilter onChange={onFeaturesChange} />
      <Divider className="my-6" />
      <VehicleHeightFilter
        minHeight={parkingMetaData.heightRestrictionsList[0]}
        maxHeight={
          parkingMetaData.heightRestrictionsList[
            parkingMetaData.heightRestrictionsList.length - 1
          ]
        }
        value={[minHeight, maxHeight]}
        marks={parkingMetaData.heightRestrictionsList}
        onChange={onMinMaxHeightChange}
      />
    </section>
  );
};
