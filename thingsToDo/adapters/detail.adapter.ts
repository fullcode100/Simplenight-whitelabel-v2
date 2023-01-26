import {
  ThingsDetailItem,
  ThingsDetailResponse,
} from '../types/response/ThingsDetailResponse';

export const detailAdapter = ({
  items,
}: ThingsDetailResponse): ThingsDetailItem => {
  const item: ThingsDetailItem = items[0];
  const adaptedDetail = {
    ...item,
    rate: {
      discounts: item.rate.discounts,
      total: item.rate.total,
    },
  };

  return adaptedDetail;
};
