import { Hotel } from 'hotels/types/response/SearchResponse';
import { availableFilters } from '../components/search/HotelResultsDisplay';
import { updateHotels } from 'hotels/redux/actions';
import { useDispatch } from 'react-redux';

export const useFilterHotels = (hotels: Hotel[]) => {
  const dispatch = useDispatch();
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
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'maxPrice':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.amount_min.amount <= Number(valueToFilter),
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'minRating':
        {
          filterResult = filterResult.filter(
            (hotel) =>
              Number(hotel.details.star_rating) >= Number(valueToFilter),
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'maxRating':
        {
          filterResult = filterResult.filter(
            (hotel) =>
              Number(hotel.details.star_rating) <= Number(valueToFilter),
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'freeCancelation':
        {
          if (valueToFilter) {
            dispatch(
              updateHotels(
                filterResult.filter(
                  (hotel) =>
                    hotel.min_rate_room.rates.min_rate.cancellation_policy
                      ?.cancellation_type === 'FREE_CANCELLATION',
                ),
              ),
            );
          } else {
            dispatch(updateHotels(filterResult));
          }
        }
        break;
      case 'priceLowFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) => a.amount_min.amount - b.amount_min.amount,
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'priceHighFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) => b.amount_min.amount - a.amount_min.amount,
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'ratingLowFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) =>
              Number(a.details.star_rating) - Number(b.details.star_rating),
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'ratingHighFirst':
        {
          filterResult = [...filterResult].sort(
            (a, b) =>
              Number(b.details.star_rating) - Number(a.details.star_rating),
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'propertyHotel':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.accommodation_type === 'HOTELS',
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'propertyRental':
        {
          filterResult = filterResult.filter(
            (hotel) => hotel.accommodation_type === 'VACATION_RENTALS',
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'propertyHotel&Rental':
        {
          filterResult = filterResult.filter(
            (hotel) =>
              hotel.accommodation_type === 'VACATION_RENTALS' ||
              hotel.accommodation_type === 'HOTELS',
          );
          dispatch(updateHotels(filterResult));
        }
        break;
      case 'hotelName':
        {
          if (valueToFilter) {
            filterResult = filterResult.filter((hotel) =>
              hotel.details.name
                .toUpperCase()
                .match(valueToFilter.toString().toUpperCase()),
            );
            dispatch(updateHotels(filterResult));
          } else {
            dispatch(updateHotels(filterResult));
          }
        }
        break;
      default:
        dispatch(updateHotels(hotels));
    }
  };
  return { handleFilterHotels };
};
