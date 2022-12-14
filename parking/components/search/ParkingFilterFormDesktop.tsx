import React, { FC, useState } from 'react';
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
  filter,
  onFilterChange,
  parkingMetaData,
}) => {
  const [highAvailability, setHighAvailability] = useState(
    filter.highAvailability,
  );
  const [surfaceType, setSurfaceType] = useState(filter.surfaceType);
  const [features, setFeatures] = useState(filter.features);

  const [minPrice, setMinPrice] = useState(filter.minPrice);
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice);

  const [minHeight, setMinHeight] = useState(filter.minHeight);
  const [maxHeight, setMaxHeight] = useState(filter.maxHeight);

  const onHighAvailabilityChange = (highAvailability: boolean) => {
    setHighAvailability(highAvailability);
    onFilterChange({ highAvailability });
  };

  const onSurfaceTypeChange = (surfaceType: string[]) => {
    setSurfaceType(surfaceType);
    onFilterChange({ surfaceType });
  };

  const onFeaturesChange = (features: string[]) => {
    setFeatures(features);
    onFilterChange({ features });
  };

  const onMinMaxPriceChange = ([minPrice, maxPrice]: [number, number]) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const onMinMaxPriceAfterChange = ([minPrice, maxPrice]: [number, number]) => {
    onFilterChange({ minPrice, maxPrice });
  };

  const onMinMaxHeightChange = ([minHeight, maxHeight]: [number, number]) => {
    setMinHeight(minHeight);
    setMaxHeight(maxHeight);
  };

  const onMinMaxHeightAfterChange = ([minHeight, maxHeight]: [
    number,
    number,
  ]) => {
    onFilterChange({ minHeight, maxHeight });
  };

  const handleClearFilters = () => {
    setHighAvailability(false);
    setSurfaceType([]);
    setFeatures([]);
    setMinPrice(0);
    setMaxPrice(30);
    setMinHeight(0);
    setMaxHeight(10);

    onFilterChange({
      parkingType: 'ALL',
      highAvailability: false,
      features: [],
      surfaceType: [],
      sortBy: 'distance',
      minPrice: 0,
      maxPrice: 30,
      minHeight: 0,
      maxHeight: 5,
    });
  };

  return (
    <section className="h-full py-4">
      <FilterHeader handleClearFilters={handleClearFilters} />
      <PriceFilter
        minPrice={parkingMetaData.minPrice}
        maxPrice={parkingMetaData.maxPrice}
        value={[minPrice, maxPrice]}
        onChange={onMinMaxPriceChange}
        onAfterChange={onMinMaxPriceAfterChange}
        currency={
          '$'
          // parkingMetaData.currencySymbol || `${parkingMetaData.currency} `
        }
      />
      <Divider className="my-6" />
      <AvailabilityFilter
        highAvailability={highAvailability}
        onChangeHighAvailability={onHighAvailabilityChange}
      />
      <Divider className="my-6" />
      <SurfaceTypeFilter value={surfaceType} onChange={onSurfaceTypeChange} />
      <Divider className="my-6" />
      <FeaturesFilter value={features} onChange={onFeaturesChange} />
      <Divider className="my-6" />
      <VehicleHeightFilter
        minHeight={0}
        maxHeight={
          parkingMetaData.heightRestrictionsList[
            parkingMetaData.heightRestrictionsList.length - 1
          ]
        }
        value={[minHeight, maxHeight]}
        onChange={onMinMaxHeightChange}
        onAfterChange={onMinMaxHeightAfterChange}
      />
    </section>
  );
};
