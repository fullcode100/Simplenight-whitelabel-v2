import { useDispatch, useSelector } from 'react-redux';
import { ShowsSearchResponse as iShowAndEventsResult } from 'showsAndEvents/types/response/ShowsSearchResponse';
import {
  updateShowsAndEvents,
  updateShowsAndEventsFilters,
} from 'showsAndEvents/redux/actions';
import { useEffect } from 'react';

export type availableFilters =
  | 'minPrice'
  | 'maxPrice'
  | 'minSeats'
  | 'maxSeats'
  | 'minDistance'
  | 'maxDistance';

export const useFilterShowsAndEvents = (
  latitude: string,
  longitude: string,
) => {
  const { showsAndEvents, filters } = useSelector(
    ({ showsAndEvents }: any) => showsAndEvents,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let filterResults = [...showsAndEvents];
    for (const filterToApply in filters) {
      if (filters[filterToApply]) {
        switch (filterToApply) {
          case 'minPrice':
            {
              filterResults = filterResults.filter(
                ({ rate }: iShowAndEventsResult) =>
                  rate.total.net.amount >= Number(filters[filterToApply]),
              );
            }
            break;
          case 'maxPrice':
            {
              filterResults = filterResults.filter(
                ({ rate }: iShowAndEventsResult) =>
                  rate.total.net.amount <= Number(filters[filterToApply]),
              );
            }
            break;
          case 'minSeats':
            {
              filterResults = filterResults.filter(
                ({ extra_data: extraData }: iShowAndEventsResult) =>
                  extraData.ticket_count >= Number(filters[filterToApply]),
              );
            }
            break;
          case 'maxSeats':
            {
              filterResults = filterResults.filter(
                ({ extra_data: extraData }: iShowAndEventsResult) =>
                  extraData.ticket_count <= Number(filters[filterToApply]),
              );
            }
            break;
          case 'minDistance':
            {
              filterResults = filterResults.map((filterResult) => {
                const {
                  address: {
                    coordinates: {
                      latitude: showAndEventLatitude,
                      longitude: showAndEventLongitude,
                    },
                  },
                } = filterResult;
                const distance = getDistance(
                  Number(latitude),
                  Number(longitude),
                  Number(showAndEventLatitude),
                  Number(showAndEventLongitude),
                );
                return {
                  ...filterResult,
                  distance,
                };
              });
              filterResults = filterResults.filter(
                ({ distance }) => distance >= Number(filters[filterToApply]),
              );
            }
            break;
          case 'maxDistance':
            {
              filterResults = filterResults.map((filterResult) => {
                const {
                  address: {
                    coordinates: {
                      latitude: showAndEventLatitude,
                      longitude: showAndEventLongitude,
                    },
                  },
                } = filterResult;
                const distance = getDistance(
                  Number(latitude),
                  Number(longitude),
                  Number(showAndEventLatitude),
                  Number(showAndEventLongitude),
                );
                return {
                  ...filterResult,
                  distance,
                };
              });
              filterResults = filterResults.filter(({ distance }) => {
                return distance <= Number(filters[filterToApply]);
              });
            }
            break;
          default:
            break;
        }
      }
    }
    dispatch(updateShowsAndEvents(filterResults));
  }, [filters, showsAndEvents]);

  const handleFilterShowsAndEvents = (
    filterToApply: availableFilters,
    valueToFilter?: string,
  ) => {
    switch (filterToApply) {
      case 'minPrice': {
        dispatch(
          updateShowsAndEventsFilters({
            ...filters,
            minPrice: Number(valueToFilter),
          }),
        );
        break;
      }
      case 'maxPrice': {
        dispatch(
          updateShowsAndEventsFilters({
            ...filters,
            maxPrice: valueToFilter,
          }),
        );
        break;
      }
      case 'minSeats': {
        dispatch(
          updateShowsAndEventsFilters({
            ...filters,
            minSeats: valueToFilter,
          }),
        );
        break;
      }
      case 'maxSeats': {
        dispatch(
          updateShowsAndEventsFilters({
            ...filters,
            maxSeats: valueToFilter,
          }),
        );
        break;
      }
      case 'minDistance': {
        dispatch(
          updateShowsAndEventsFilters({
            ...filters,
            minDistance: valueToFilter,
          }),
        );
        break;
      }
      case 'maxDistance': {
        dispatch(
          updateShowsAndEventsFilters({
            ...filters,
            maxDistance: valueToFilter,
          }),
        );
        break;
      }
      default:
        break;
    }
  };
  return { handleFilterShowsAndEvents };
};

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
};
