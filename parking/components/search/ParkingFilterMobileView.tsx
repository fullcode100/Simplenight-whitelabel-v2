import React, { FC, useState } from 'react';
import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';
import { ParkingFilterForm } from './ParkingFilterForm';
import { ParkingFilter, ParkingListMetaData } from '../../types/ParkingFilter';

interface ParkingFilterMobileView {
  filter: ParkingFilter;
  handleReset: () => void;
  parkingMetaData: ParkingListMetaData;
  onChange: (input: ParkingFilter) => void;
  onClose: () => void;
}

export const ParkingFilterMobileView: FC<ParkingFilterMobileView> = ({
  onClose,
  filter,
  parkingMetaData,
  onChange,
}) => {
  const [tg] = useTranslation('global');

  // Form state
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
  };

  const onSurfaceTypeChange = (surfaceType: string[]) => {
    setSurfaceType(surfaceType);
  };

  const onFeaturesChange = (features: string[]) => {
    setFeatures(features);
  };

  const onMinMaxPriceChange = ([minPrice, maxPrice]: [number, number]) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const onMinMaxHeightChange = ([minHeight, maxHeight]: [number, number]) => {
    setMinHeight(minHeight);
    setMaxHeight(maxHeight);
  };

  const applyFiltersHandler = () => {
    onChange({
      highAvailability,
      surfaceType,
      features,
      minPrice,
      maxPrice,
      minHeight,
      maxHeight,
      parkingType: filter.parkingType,
      sortBy: filter.sortBy,
    });
    onClose();
  };

  const onReset = () => {
    setHighAvailability(false);
    setSurfaceType([]);
    setFeatures([]);
    setMinPrice(parkingMetaData.minPrice);
    setMaxPrice(parkingMetaData.maxPrice);
    setMinHeight(0);
    setMaxHeight(
      parkingMetaData.heightRestrictionsList[
        parkingMetaData.heightRestrictionsList.length - 1
      ],
    );
  };

  const closeHandler = () => {
    setHighAvailability(filter.highAvailability);
    setSurfaceType(filter.surfaceType);
    setFeatures(filter.features);
    setMinPrice(filter.minPrice);
    setMaxPrice(filter.maxPrice);
    setMinHeight(filter.minHeight);
    setMaxHeight(filter.maxHeight);
    onClose();
  };

  return (
    <FullScreenModal
      open={true}
      closeModal={closeHandler}
      title={tg('filters')}
      primaryButtonText={tg('apply')}
      primaryButtonAction={applyFiltersHandler}
      headerAction={
        <button
          className="text-base font-semibold underline text-primary-1000 hover:text-primary-600"
          onClick={onReset}
        >
          {tg('clearFilters')}
        </button>
      }
    >
      <section className="h-full overflow-y-auto p-5">
        <ParkingFilterForm
          noHeader
          handleReset={onReset}
          filter={{
            highAvailability,
            surfaceType,
            features,
            minPrice,
            maxPrice,
            minHeight,
            maxHeight,
            parkingType: filter.parkingType,
            sortBy: filter.sortBy,
          }}
          parkingMetaData={parkingMetaData}
          onFeaturesChange={onFeaturesChange}
          onHighAvailabilityChange={onHighAvailabilityChange}
          onMinMaxHeightAfterChange={onMinMaxHeightChange}
          onMinMaxHeightChange={onMinMaxHeightChange}
          onMinMaxPriceAfterChange={onMinMaxPriceChange}
          onMinMaxPriceChange={onMinMaxPriceChange}
          onSurfaceTypeChange={onSurfaceTypeChange}
        />
      </section>
    </FullScreenModal>
  );
};
