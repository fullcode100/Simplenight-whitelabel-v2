import React, { useMemo } from 'react';
import { ThingsSearchItem } from 'thingsToDo/types/response/ThingsSearchResponse';

const useKeywordFilter = (
  entertainmentItems: ThingsSearchItem[],
  keywordSearch = '',
) => {
  const filterEntertainment = (
    array: ThingsSearchItem[],
  ): ThingsSearchItem[] => {
    let filteredEntertainment = array;
    if (keywordSearch !== '') {
      filteredEntertainment = filteredEntertainment.filter(
        (entertainment: ThingsSearchItem) =>
          entertainment.name
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          entertainment.extra_data.description
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          entertainment.address.city
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()),
      );
    }
    return filteredEntertainment;
  };

  const memoizedEntertainmentItems = useMemo(() => {
    return filterEntertainment(entertainmentItems);
  }, [keywordSearch, entertainmentItems]);

  return memoizedEntertainmentItems;
};

export default useKeywordFilter;
