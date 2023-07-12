import { DetailItem } from '../types/adapters/DetailItem';
import { Hotel } from '../types/response/SearchResponse';

export const detailAdapter = (items: Hotel[]): DetailItem => {
  const item = items[0];
  const adaptedDetailResponse: DetailItem = {
    id: item.id,
    details: {
      name: item.details.name,
      fullAddress: {
        address: item.details.address.address1,
        city: item.details.address.city,
        coordinates: item.details.address.coordinates,
        state: item.details.address.state,
        countryCode: item.details.address.country_code,
        postalCode: item.details.address.postal_code,
        country: item.details.address.country,
      },
      starRating: item.details.star_rating,
      description: item.details.description,
      checkinTime: item.details.checkin_time,
      checkoutTime: item.details.checkout_time,
      checkInInstructions: item.details.check_in_instructions,
      specialInstructions: item.details.special_instructions,
      policies: item.details.policies,
      fees: item.details.fees,
    },
    rooms: item.rooms,
    photos: item.photos,
    nights: item.nights,
    checkInInstructions: item.check_in_instructions,
    roomsQty: item.roomsQty,
  };

  return adaptedDetailResponse;
};
