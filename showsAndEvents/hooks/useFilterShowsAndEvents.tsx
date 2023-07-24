import { useEffect } from 'react';
import { useSearchFilterStore } from 'hooks/showsAndEvents/useSearchFilterStore';
import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';

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
  showsAndEvents: SearchItem[],
) => {
  const { setShowsAndEvents, setFilters, filters } = useSearchFilterStore(
    (state) => state,
  );

  useEffect(() => {
    if (showsAndEvents) {
      let filterResults = [...showsAndEvents];
      for (const filterToApply in filters) {
        if (filters[filterToApply]) {
          switch (filterToApply) {
            case 'minPrice':
              {
                filterResults = filterResults.filter(
                  ({ rate }: SearchItem) =>
                    rate.total.net.amount >= Number(filters[filterToApply]),
                );
              }
              break;
            case 'maxPrice':
              {
                filterResults = filterResults.filter(
                  ({ rate }: SearchItem) =>
                    rate.total.net.amount <= Number(filters[filterToApply]),
                );
              }
              break;
            case 'minSeats':
              {
                filterResults = filterResults.filter(
                  ({ extraData }: SearchItem) =>
                    extraData.ticket_count >= Number(filters[filterToApply]),
                );
              }
              break;
            case 'maxSeats':
              {
                filterResults = filterResults.filter(
                  ({ extraData }: SearchItem) =>
                    extraData.ticket_count <= Number(filters[filterToApply]),
                );
              }
              break;
            case 'minDistance':
              {
                filterResults = filterResults.filter((filterResult) => {
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
                  return distance >= Number(filters[filterToApply]);
                });
              }
              break;
            case 'maxDistance':
              {
                filterResults = filterResults.filter((filterResult) => {
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
                  return distance <= Number(filters[filterToApply]);
                });
              }
              break;
            default:
              break;
          }
        }
      }
      setShowsAndEvents(filterResults);
    }
  }, [filters, showsAndEvents]);

  const handleFilterShowsAndEvents = (
    filterToApply: availableFilters,
    valueToFilter?: string,
  ) => {
    setFilters({
      ...filters,
      [filterToApply]: valueToFilter,
    });
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
