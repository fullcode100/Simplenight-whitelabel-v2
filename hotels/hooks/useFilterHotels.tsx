import { Hotel } from 'hotels/types/response/SearchResponse';
import { availableFilters } from '../components/search/HotelResultsDisplay';

export const useFilterHotels = (
  hotels: Hotel[],
  setfilteredHotels: React.Dispatch<React.SetStateAction<Hotel[]>>,
) => {
  const handleFilterHotels = (
    filterToApply: availableFilters,
    valueToFilter?: string | boolean,
  ) => {
    let filterResult = hotels;
    switch (filterToApply) {
      case 'minPrice':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.amount_min.amount >= Number(valueToFilter),
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'maxPrice':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.amount_min.amount <= Number(valueToFilter),
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'minRating':
        {
          filterResult = filterResult.filter(
            (hotel) =>
              Number(hotel.details.star_rating) >= Number(valueToFilter),
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'maxRating':
        {
          filterResult = filterResult.filter(
            (hotel) =>
              Number(hotel.details.star_rating) <= Number(valueToFilter),
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'freeCancelation':
        {
          if (valueToFilter) {
            setfilteredHotels(
              filterResult.filter(
                (hotel) =>
                  hotel.min_rate_room.rates.min_rate.cancellation_policy
                    ?.cancellation_type === 'FREE_CANCELLATION',
              ),
            );
          } else {
            setfilteredHotels(hotels);
          }
        }
        break;
      case 'priceLowFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) => a.amount_min.amount - b.amount_min.amount,
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'priceHighFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) => b.amount_min.amount - a.amount_min.amount,
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'ratingLowFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) =>
              Number(a.details.star_rating) - Number(b.details.star_rating),
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'ratingHighFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) =>
              Number(b.details.star_rating) - Number(a.details.star_rating),
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'propertyHotel':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.accommodation_type === 'HOTELS',
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'propertyRental':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.accommodation_type === 'VACATION_RENTALS',
          );
          setfilteredHotels(filterResult);
        }
        break;
      case 'propertyHotel&Rental':
        {
          filterResult = filterResult.filter(
            (hotel) =>
              hotel.accommodation_type === 'VACATION_RENTALS' ||
              hotel.accommodation_type === 'HOTELS',
          );
          setfilteredHotels(filterResult);
        }
        break;
      default:
        setfilteredHotels(hotels);
    }
  };
  return { handleFilterHotels };
};
