import { ShowsSearchResponse } from 'showsAndEvents/types/response/ShowsSearchResponse';
import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';

export const searchAdapter = (items: ShowsSearchResponse[]) => {
  const adapterSearchResponse: SearchItem[] = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      address: item.address,
      cancellationType: item.cancellation_policy.cancellation_type,
      extraData: item.extra_data,
      rate: item.rate,
      thumbnail: item.thumbnail,
    };
  });

  return adapterSearchResponse;
};
