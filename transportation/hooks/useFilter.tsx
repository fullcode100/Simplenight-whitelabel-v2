import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';

interface UseFilter {
    (transportationList: Quote[], metadata: any): UseFilterReturnType;
}

type filter = {
    minPrice: number
    maxPrice: number
    minPassengers: number
    maxPassengers: number
    carType: any[]
}

interface UseFilterReturnType {
    filteredList: Quote[];
    onFilterValuesChanged: UpdateFilterFn;
    filter: filter
}


type UpdateFilterFn = (filterValues: filter) => void

export const useFilter: UseFilter = (transportationList, metadata) => {
    const [filter, setFilter] = useState<filter>({
        minPrice: metadata.minPrice,
        maxPrice: metadata.maxPrice,
        minPassengers: metadata.minPassengers,
        maxPassengers: metadata.maxPassengers,
        carType: metadata.carType

    });

    const transportationFilterFn = useCallback(
        (transportation: Quote) => {
            let match = true;
            const { minPrice, maxPrice, minPassengers, maxPassengers } = filter;
            const price = Math.max(transportation?.fare?.price || 0, 0);
            const passenger = Math.max(transportation?.service_info?.max_pax || 0, 0);
            if (price < minPrice || price > maxPrice) {
                return false;
            }
            return !(passenger < minPassengers || passenger > maxPassengers);
        },
        [
            filter.minPrice,
            filter.maxPrice,
            filter.minPassengers,
            filter.maxPassengers
        ],
    );
    const filteredList = useMemo(() => {
        return transportationList.filter(transportationFilterFn);
    }, [transportationList, transportationFilterFn]);


    const onFilterValuesChanged = debounce((partialFilter: Partial<filter>) => {
        setFilter((current) => ({ ...current, ...partialFilter }));
    }, 0);

    return {
        filteredList: filteredList,
        onFilterValuesChanged,
        filter
    };
};
