import { SearchItem } from 'thingsToDo/types/adapters/SearchItem';
import { ThingsSearchItem } from 'thingsToDo/types/response/ThingsSearchResponse';

export const searchAdapter = (items: ThingsSearchItem[]) => {
  const adaptedSearchResponse = items.map((item) => {
    const i: SearchItem = {
      id: item.id,
      name: item.name,
      cancellationPolicy: item.cancellation_policy,
      rate: item.rate,
      thumbnail: item.thumbnail,
      description: item.extra_data.description,
      rating: item.extra_data.avg_rating,
      reviewAmount: item.extra_data.review_amount,
      totalAmount: item.rate.total.full.formatted,
      categories: item.categories,
      address: item.address,
      mainCategory: item.main_category,
    };
    return i;
  });

  return adaptedSearchResponse;
};
