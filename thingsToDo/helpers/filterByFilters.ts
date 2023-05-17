import { SearchItem } from 'thingsToDo/types/adapters/SearchItem';

interface FiltersApplied {
  keywordSearch: string;
  price: { minPrice: string; maxPrice: string };
  freeCancellation: boolean;
  starRating: { minStarRating: string; maxStarRating: string };
  sortBy: string;
}

export const filterByFilters = (
  items: SearchItem[] | undefined,
  appliedFilters: FiltersApplied,
) => {
  const filteredItemsByKeyword: SearchItem[] = [];
  const filteredItemsByPrice: SearchItem[] = [];
  const filteredItemsByPaymentType: SearchItem[] = [];
  const filteredItemsByRating: SearchItem[] = [];
  // keyword filter
  if (items) {
    const keywordSearch = appliedFilters.keywordSearch.toLowerCase();
    if (keywordSearch.length > 0) {
      items.forEach((item: SearchItem) => {
        const name = item.name.toLocaleLowerCase().trim();
        const description = item.description.toLowerCase().trim();
        if (
          name.includes(keywordSearch) ||
          description.includes(keywordSearch)
        ) {
          filteredItemsByKeyword.push(item);
        }
      });
    } else {
      filteredItemsByKeyword.push(...items);
    }
  }
  // price filter
  if (filteredItemsByKeyword) {
    const minPrice = parseInt(appliedFilters.price.minPrice);
    const maxPrice = parseInt(appliedFilters.price.maxPrice);
    filteredItemsByKeyword.forEach((item: SearchItem) => {
      const amount = item.rate.total.net.amount;
      if (amount >= minPrice && amount <= maxPrice) {
        filteredItemsByPrice.push(item);
      }
    });
  }
  // payment type filter
  if (filteredItemsByPrice) {
    if (appliedFilters.freeCancellation) {
      filteredItemsByPrice.forEach((item: SearchItem) => {
        if (item.cancellationPolicy.cancellation_type === 'FREE_CANCELLATION') {
          filteredItemsByPaymentType.push(item);
        }
      });
    } else {
      filteredItemsByPaymentType.push(...filteredItemsByPrice);
    }
    // rating filter
    if (filteredItemsByPaymentType) {
      const minRate = parseInt(appliedFilters.starRating.minStarRating);
      const maxRate = parseInt(appliedFilters.starRating.maxStarRating);
      filteredItemsByPaymentType.forEach((item: SearchItem) => {
        let rate = Math.round(item.rating ?? 0);
        if (rate === 0) {
          rate = 1;
        }
        if (rate >= minRate && rate <= maxRate) {
          filteredItemsByRating.push(item);
        }
      });
    }

    if (filteredItemsByRating) {
      const sortBy = appliedFilters.sortBy;
      switch (sortBy) {
        case 'sortByPriceAsc':
          filteredItemsByRating.sort((a: any, b: any) => {
            return a.rate.total.net.amount - b.rate.total.net.amount;
          });
          break;
        case 'sortByPriceDesc':
          filteredItemsByRating.sort((a: any, b: any) => {
            return b.rate.total.net.amount - a.rate.total.net.amount;
          });
          break;
        case 'sortByStarRatingDesc':
          filteredItemsByRating.sort((a: any, b: any) => {
            return Math.floor(b.rating ?? 0) - Math.floor(a.rating ?? 0);
          });
          break;
        case 'sortByStarRatingAsc':
          filteredItemsByRating.sort((a: any, b: any) => {
            return Math.floor(a.rating ?? 0) - Math.floor(b.rating ?? 0);
          });
          break;
        default:
          break;
      }
    }
  }
  return filteredItemsByRating;
};
