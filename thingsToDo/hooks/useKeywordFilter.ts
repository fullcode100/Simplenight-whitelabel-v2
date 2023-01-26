import React, { useMemo } from 'react';
import { SearchItem } from 'thingsToDo/types/adapters/SearchItem';

const useKeywordFilter = (
  entertainmentItems: SearchItem[],
  keywordSearch = '',
) => {
  const filterEntertainment = (array: SearchItem[]): SearchItem[] => {
    let filteredEntertainment = array;
    if (keywordSearch !== '') {
      filteredEntertainment = filteredEntertainment.filter(
        (entertainment: SearchItem) =>
          entertainment.name
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          entertainment.description
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
