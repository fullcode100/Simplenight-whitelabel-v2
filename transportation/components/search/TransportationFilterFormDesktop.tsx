import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import CarTypeFilter from './Filters/CarTypeFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import Heading from 'components/global/Typography/Heading';
import PassengersRangeFilter from './Filters/PassengersRangeFilter';
import { FilterHeader } from '@/components/search';
import {
  TransportationFilter,
  TransportationListMetaData,
} from 'transportation/types/TransportationFilter';
import RatingRangeFilter from './Filters/RatingRangeFilter';
import BagsRangeFilter from './Filters/BagsRangeFilter';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface TransportationFilterFormDesktopProps {
  filterValuesChanged: (filterValues: Partial<TransportationFilter>) => void;
  transportationMetaData: TransportationListMetaData;
  filter: TransportationFilter;
}

export const TransportationFilterFormDesktop: FC<
  TransportationFilterFormDesktopProps
> = ({ filterValuesChanged, transportationMetaData, filter }) => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const [queryFilter, setQueryFilters] = useState(router.query);

  const initialPriceRange = {
    min: transportationMetaData?.minPrice,
    max: transportationMetaData?.maxPrice,
  };
  const [minPrice, setMinPrice] = useState<number>(filter.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(filter.maxPrice);

  const initialPassengersRange = {
    min: transportationMetaData?.minPassengers,
    max: transportationMetaData?.maxPassengers,
  };
  const [minPassengers, setMinPassengers] = useState<number>(
    filter.minPassengers,
  );
  const [maxPassengers, setMaxPassengers] = useState<number>(
    filter.maxPassengers,
  );

  const initialBagsRange = {
    min: '1',
    max: '3',
  };
  const [minBags, setMinBags] = useState<string>(
    (queryFilter?.minBags as string) || initialBagsRange.min,
  );
  const [maxBags, setMaxBags] = useState<string>(
    (queryFilter?.maxBags as string) || initialBagsRange.max,
  );
  const [carType, setCarType] = useState(filter.carType);

  const initialRatingRange = {
    min: transportationMetaData?.minRating,
    max: transportationMetaData?.maxRating,
  };
  const [minRating, setMinRating] = useState<number>(filter.minRating);
  const [maxRating, setMaxRating] = useState<number>(filter.minRating);

  const [t, i18n] = useTranslation('ground-transportation');
  const carTypeLabel = t('carType', 'Car Type');
  const priceTypeLabel = t('price', 'Price');
  const passengersTypeLabel = t('passengers', 'Passengers');
  const bagsLabel = t('bags', 'Bags');
  const ratingLabel = t('rating', 'Rating');
  const featuresLabel = t(
    'VehicleFeaturesOrSpaces',
    'Vehicle Features Or Spaces',
  );

  const handleClearFilters = () => {
    /* setQueryParams({
      propertyTypes: '',
      paymentTypes: '',
      amenities: '',
      priceRange: '',
      sortBy: '',
      isTotalPrice: '',
      minPrice: '',
      maxPrice: '',
      minPassengers: '',
      maxPassengers: '',
      minBags: '',
      maxBags: ''
    });*/
    setCarType([]);
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setMinPassengers(initialPassengersRange.min);
    setMaxPassengers(initialPassengersRange.max);
    setMinRating(initialRatingRange.min);
    setMaxRating(initialRatingRange.max);

    filterValuesChanged({
      minPrice: transportationMetaData.minPrice,
      maxPrice: transportationMetaData.maxPrice,
      minPassengers: transportationMetaData.minPassengers,
      maxPassengers: transportationMetaData.maxPassengers,
      carType: transportationMetaData.carType,
      minRating: transportationMetaData.minRating,
      maxRating: transportationMetaData.maxRating,
    });
  };

  const onChangeMinPassengers = (value: string) => {
    setMinPassengers(parseInt(value));
    /* setQueryParams({
      minPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ minPassengers: parseInt(value) });
  };

  const onChangeMaxPassengers = (value: string) => {
    setMaxPassengers(parseInt(value));
    /* setQueryParams({
      maxPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ maxPassengers: parseInt(value) });
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(parseInt(value));
    /* setQueryParams({
      minPassengers: value,
      ...((minPassengers || maxPassengers) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ minPrice: parseInt(value) });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(parseInt(value));
    /* setQueryParams({
      maxPassengers: value,
      ...((minPassengers || maxPassengers) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ maxPrice: parseInt(value) });
  };

  const onChangeMinBags = (value: string) => {
    setMinBags(value);
    /* setQueryParams({
      minBags: value,
      ...((minBags || maxBags) && { isTotalPrice: 'false' }),
    });*/
  };

  const onChangeMaxBags = (value: string) => {
    setMaxBags(value);
    /* setQueryParams({
      maxBags: value,
      ...((minBags || maxBags) && { isTotalPrice: 'false' }),
    });*/
  };

  const onCarTypeChange = (carType: string[]) => {
    setCarType(carType);
    filterValuesChanged({ carType: carType });
    /* setQueryParams({
  paymentTypes: paymentTypes.join('-'),
});*/
  };

  const onChangeMinRating = (value: string) => {
    setMinRating(parseInt(value));
    filterValuesChanged({ minRating: parseInt(value) });
  };

  const onChangeMaxRating = (value: string) => {
    setMaxRating(parseInt(value));
    filterValuesChanged({ maxRating: parseInt(value) });
  };

  useEffect(() => {
    if (transportationMetaData) {
      setMinPrice(transportationMetaData.minPrice);
      setMaxPrice(transportationMetaData.maxPrice);
      setMinPassengers(transportationMetaData.minPassengers);
      setMaxPassengers(transportationMetaData.maxPassengers);
      setMinRating(transportationMetaData.minRating);
      setMaxRating(transportationMetaData.maxRating);
    }
  }, [transportationMetaData]);

  return (
    <section className="h-full py-4">
      <FilterHeader handleClearFilters={handleClearFilters} />
      <CollapseUnbordered
        title={<Heading tag="h5">{carTypeLabel}</Heading>}
        body={
          <CarTypeFilter
            value={carType}
            items={transportationMetaData.carType}
            onChange={onCarTypeChange}
          />
        }
        initialState
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{priceTypeLabel}</Heading>}
        body={
          <PriceRangeFilter
            minPrice={minPrice?.toString()}
            maxPrice={maxPrice?.toString()}
            min={initialPriceRange?.min}
            max={initialPriceRange?.max}
            onChangeMinPrice={onChangeMinPrice}
            onChangeMaxPrice={onChangeMaxPrice}
            setMaxValue={setMaxPrice}
            setMinValue={setMinPrice}
          />
        }
        initialState
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{passengersTypeLabel}</Heading>}
        body={
          <PassengersRangeFilter
            minPassengers={minPassengers?.toString()}
            maxPassengers={maxPassengers?.toString()}
            min={initialPassengersRange?.min}
            max={initialPassengersRange?.max}
            onChangeMinPrice={onChangeMinPassengers}
            onChangeMaxPrice={onChangeMaxPassengers}
            setMaxValue={setMaxPassengers}
            setMinValue={setMinPassengers}
          />
        }
        initialState
      />
      <Divider className="my-6" />
      {/* <CollapseUnbordered
        title={<Heading tag="h5">{bagsLabel}</Heading>}
        body={
          <BagsRangeFilter
            minBags={minBags}
            maxBags={maxBags}
            onChangeMinPrice={onChangeMinBags}
            onChangeMaxPrice={onChangeMaxBags}
            setMaxValue={setMaxBags}
            setMinValue={setMinBags}
          />
        }
        initialState
      />
      <Divider className="my-6" />*/}
      <CollapseUnbordered
        title={<Heading tag="h5">{ratingLabel}</Heading>}
        body={
          <RatingRangeFilter
            minRating={minRating?.toString()}
            maxRating={maxRating?.toString()}
            onChangeMinRating={onChangeMinRating}
            onChangeMaxRating={onChangeMaxRating}
            setMinValue={setMinRating}
            setMaxValue={setMaxRating}
            min={initialRatingRange?.min}
            max={initialRatingRange?.max}
          />
        }
        initialState
      />
      {/* <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{featuresLabel}</Heading>}
        body={<></>}
        initialState
      />*/}
    </section>
  );
};
