import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import CarTypeFilter from './Filters/CarTypeFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import Heading from 'components/global/Typography/Heading';
import PassengersRangeFilter from './Filters/PassengersRangeFilter';
import BagsRangeFilter from './Filters/BagsRangeFilter';
import { FilterHeader } from '@/components/search';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

type filter = {
  minPrice: number
  maxPrice: number
  minPassengers: number
  maxPassengers: number
  carType: any[]
}

interface TransportationFilterFormDesktopProps {
  filterValuesChanged: (filterValues: filter) => void;
  transportationMetaData: any
  filter: filter;
}

export const TransportationFilterFormDesktop: FC<TransportationFilterFormDesktopProps> = ({
  filterValuesChanged,
  transportationMetaData,
  filter
}) => {

  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const [queryFilter, setQueryFilters] = useState(router.query);

  const [freeCancellation, setFreeCancellation] = useState<boolean>(
    queryFilter?.paymentTypes?.includes('freeCancellation') || false,
  );

  const [payAtProperty, setPayAtProperty] = useState<boolean>(
    queryFilter?.paymentTypes?.includes('payAtProperty') || false,
  );


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
  const [minPassengers, setMinPassengers] = useState<number>(filter.minPassengers);
  const [maxPassengers, setMaxPassengers] = useState<number>(filter.maxPassengers);

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

  const [t, i18n] = useTranslation('ground-transportation');
  const carTypeLabel = t('carType', 'Car Type');
  const priceTypeLabel = t('price', 'Price');
  const passengersTypeLabel = t('passengers', 'Passengers');
  const bagsTypeLabel = t('bags', 'Bags');


  const handleClearFilters = () => {
    setQueryParams({
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
    });
  };

  const onChangeMinPassengers = (value: string) => {
    setMinPassengers(parseInt(value));
    /*setQueryParams({
      minPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ ...filter, minPassengers: parseInt(value) })
  };

  const onChangeMaxPassengers = (value: string) => {
    setMaxPassengers(parseInt(value));
    /*setQueryParams({
      maxPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ ...filter, maxPassengers: parseInt(value) })

  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(parseInt(value));
    /*setQueryParams({
      minPassengers: value,
      ...((minPassengers || maxPassengers) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ ...filter, minPrice: parseInt(value) })
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(parseInt(value));
    /*setQueryParams({
      maxPassengers: value,
      ...((minPassengers || maxPassengers) && { isTotalPrice: 'false' }),
    });*/
    filterValuesChanged({ ...filter, maxPrice: parseInt(value) })
  };

  const onChangeMinBags = (value: string) => {
    setMinBags(value);
    /*setQueryParams({
      minBags: value,
      ...((minBags || maxBags) && { isTotalPrice: 'false' }),
    });*/
  };

  const onChangeMaxBags = (value: string) => {
    setMaxBags(value);
    /*setQueryParams({
      maxBags: value,
      ...((minBags || maxBags) && { isTotalPrice: 'false' }),
    });*/
  };

  const onChangeFreeCancellation = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('freeCancellation');
    if (payAtProperty) paymentTypes.push('payAtProperty');
    setFreeCancellation(value);
    setQueryParams({
      paymentTypes: paymentTypes.join('-'),
    });
  };

  useEffect(() => {
    if (transportationMetaData) {
      setMinPrice(transportationMetaData.minPrice)
      setMaxPrice(transportationMetaData.maxPrice)
      setMinPassengers(transportationMetaData.minPassengers)
      setMaxPassengers(transportationMetaData.maxPassengers)
    }
  }, [transportationMetaData])

  return (
    <section className="h-full py-4">
      <FilterHeader handleClearFilters={handleClearFilters} />
      <CollapseUnbordered
        title={<Heading tag="h5">{carTypeLabel}</Heading>}
        body={
          <CarTypeFilter
            carType={transportationMetaData.carTypeMetaData}
            onChangeFreeCancellation={onChangeFreeCancellation}
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
      <CollapseUnbordered
        title={<Heading tag="h5">{bagsTypeLabel}</Heading>}
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
    </section>
  );
};