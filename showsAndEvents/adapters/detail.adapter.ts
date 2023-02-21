import { DetailItem } from 'showsAndEvents/types/adapters/DetailItem';
import {
  ShowDetailItem,
  ShowDetailResponse,
} from 'showsAndEvents/types/response/ShowsDetailResponse';

export const detailAdapter = ({ items }: ShowDetailResponse) => {
  const item: ShowDetailItem = items[0];
  const adapterDetailResponse: DetailItem = {
    id: item.id,
    name: item.name,
    description: item.extra_data.description,
    category: item.main_category,
    address: item.address,
    rate: item.rate,
    seats: item.extra_data.seats,
    relationId: item.extra_data.relation_id,
    startsAt: item.extra_data.starts_at,
  };

  return adapterDetailResponse;
};
