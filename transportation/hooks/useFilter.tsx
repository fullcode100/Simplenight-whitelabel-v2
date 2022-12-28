import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import { TransportationFilter, TransportationListMetaData } from 'transportation/types/TransportationFilter';

interface UseFilter {
    (transportationList: Quote[], metadata: TransportationListMetaData): UseFilterReturnType;
}

interface UseFilterReturnType {
    filteredList: Quote[];
    onFilterValuesChanged: UpdateFilterFn;
    filter: TransportationFilter
}

type UpdateFilterFn = (filterValues: Partial<TransportationFilter>) => void

export const useFilter: UseFilter = (transportationList, metadata) => {
    const [filter, setFilter] = useState<TransportationFilter>({
        sortBy: 'sortByPriceAsc',
        minPrice: metadata.minPrice,
        maxPrice: metadata.maxPrice,
        minPassengers: metadata.minPassengers,
        maxPassengers: metadata.maxPassengers,
        carType: metadata.carType,
        minRating: metadata.maxRating,
        maxRating: metadata.maxRating
    });

    const transportationFilterFn = useCallback(
        (transportation: Quote) => {
            let match = true;
            if (filter.carType.length > 0) {
                match = filter.carType.includes(
                    transportation.service_info.vehicle_type,
                );

                if (!match) return false;
            }
            const { minPrice, maxPrice, minPassengers, maxPassengers, minRating, maxRating } = filter;
            const price = Math.max(transportation?.fare?.price || 0, 0);
            const passenger = Math.max(transportation?.service_info?.max_pax || 0, 0);
            const rating = Math.max(transportation?.service_info?.passenger_reviews?.average_rating || 0, 0);

            if (price < minPrice || price > maxPrice) {
                return false;
            }

            if (rating < minRating || rating > maxRating) {
                return false;
            }
            return !(passenger < minPassengers || passenger > maxPassengers);
        },
        [
            filter.minPrice,
            filter.maxPrice,
            filter.minPassengers,
            filter.maxPassengers,
            filter.carType,
            filter.minRating,
            filter.maxRating
        ],
    );

    const transportationSortFn = useCallback(
        (quote1: Quote, quote2: Quote) => {
            if (filter.sortBy === 'sortByPriceAsc') {
                const price1 = quote1.fare.price || 0;
                const price2 = quote2.fare.price || 0;

                if (price1 < price2) {
                    return -1;
                } else if (price1 > price2) {
                    return 1;
                } else return 0;
            } else if (filter.sortBy === 'sortByPriceDesc') {
                const price1 = quote1.fare.price || 0;
                const price2 = quote2.fare.price || 0;

                if (price1 > price2) {
                    return -1;
                } else if (price1 < price2) {
                    return 1;
                } else return 0;
            } else if (filter.sortBy === 'sortByRatingAsc') {
                const rate1 = quote1?.service_info?.passenger_reviews?.average_rating || 0;
                const rate2 = quote2?.service_info?.passenger_reviews?.average_rating || 0;

                if (rate1 < rate2) {
                    return -1;
                } else if (rate1 > rate2) {
                    return 1;
                } else return 0;
            } else {
                const rate1 = quote1?.service_info?.passenger_reviews?.average_rating || 0;
                const rate2 = quote2?.service_info?.passenger_reviews?.average_rating || 0;

                if (rate1 > rate2) {
                    return -1;
                } else if (rate1 < rate2) {
                    return 1;
                } else return 0;
            }
        },
        [filter.sortBy],
    );

    const filteredList = useMemo(() => {
        return transportationList.filter(transportationFilterFn);
    }, [transportationList, transportationFilterFn]);

    const sortedList = useMemo(() => {
        return filteredList.sort(transportationSortFn);
    }, [filteredList, transportationSortFn]);

    const onFilterValuesChanged = debounce((partialFilter: Partial<TransportationFilter>) => {
        setFilter((current) => ({ ...current, ...partialFilter }));
    }, 0);

    return {
        filteredList: sortedList,
        onFilterValuesChanged,
        filter
    };
};
