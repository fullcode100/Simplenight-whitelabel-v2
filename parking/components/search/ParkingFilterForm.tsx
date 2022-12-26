import { ParkingFilter, ParkingListMetaData } from '../../types/ParkingFilter';
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

export interface ParkingFilterFormProps {
  filter: ParkingFilter;
  handleReset: () => void;
  parkingMetaData: ParkingListMetaData;
  onMinMaxPriceChange: ([minPrice, maxPrice]: [number, number]) => void;
  onMinMaxPriceAfterChange: ([minPrice, maxPrice]: [number, number]) => void;
  onHighAvailabilityChange: (highAvailability: boolean) => void;
  onSurfaceTypeChange: (surfaceType: string[]) => void;
  onFeaturesChange: (features: string[]) => void;
  onMinMaxHeightChange: ([minHeight, maxHeight]: [number, number]) => void;
  onMinMaxHeightAfterChange: ([minHeight, maxHeight]: [number, number]) => void;
  noHeader?: boolean;
}

export const ParkingFilterForm: FC<ParkingFilterFormProps> = ({
  filter,
  parkingMetaData,
  handleReset,
  onFeaturesChange,
  onMinMaxHeightAfterChange,
  onHighAvailabilityChange,
  onMinMaxPriceAfterChange,
  onMinMaxHeightChange,
  onSurfaceTypeChange,
  onMinMaxPriceChange,
  noHeader,
}) => {
  return (
    <section className="lg:h-full py-4">
      {!noHeader && <FilterHeader handleClearFilters={handleReset} />}
      <PriceFilter
        minPrice={parkingMetaData.minPrice}
        maxPrice={parkingMetaData.maxPrice}
        value={[filter.minPrice, filter.maxPrice]}
        onChange={onMinMaxPriceChange}
        onAfterChange={onMinMaxPriceAfterChange}
        currency={
          parkingMetaData.currencySymbol || `${parkingMetaData.currency} `
        }
      />
      <Divider className="my-6" />
      <AvailabilityFilter
        highAvailability={filter.highAvailability}
        onChangeHighAvailability={onHighAvailabilityChange}
      />
      <Divider className="my-6" />
      <SurfaceTypeFilter
        value={filter.surfaceType}
        onChange={onSurfaceTypeChange}
      />
      <Divider className="my-6" />
      <FeaturesFilter value={filter.features} onChange={onFeaturesChange} />
      <Divider className="my-6" />
      <VehicleHeightFilter
        minHeight={0}
        maxHeight={
          parkingMetaData.heightRestrictionsList[
            parkingMetaData.heightRestrictionsList.length - 1
          ]
        }
        value={[filter.minHeight, filter.maxHeight]}
        onChange={onMinMaxHeightChange}
        onAfterChange={onMinMaxHeightAfterChange}
      />
    </section>
  );
};
