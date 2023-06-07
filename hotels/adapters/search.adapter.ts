import { SearchItem } from '../types/adapters/SearchItem';
import { Hotel } from '../types/response/SearchResponse';

export const searchAdapter = (items: Hotel[]) => {
  const adaptedSearchResponse = items.map((item) => {
    const i: SearchItem = {
      id: item.id,
      amountMin: item.amount_min,
      accommodationType: item.accommodation_type,
      details: {
        name: item.details.name,
        fullAddress: {
          address: item.details.address.address1,
          city: item.details.address.city,
          coordinates: item.details.address.coordinates,
          state: item.details.address.state,
          countryCode: item.details.address.country_code,
          postalCode: item.details.address.postal_code,
        },
        starRating: item.details.star_rating,
        sn_amenities: item.details.sn_amenities,
      },
      minRate: item.min_rate_room.rates,
      thumbnail: item.thumbnail,
    };
    return i;
  });

  return adaptedSearchResponse;
};
