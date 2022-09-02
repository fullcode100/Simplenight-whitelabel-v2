import { useTranslation } from 'react-i18next';
import { Room } from 'hotels/types/response/SearchResponse';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface RoomProps {
  room: Room;
  hotelId: string;
}

const RoomCardActions = ({ room, hotelId }: RoomProps) => {
  const router = useRouter();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const bookingCode = room.rates.min_rate.sn_booking_code;
  const itemToBook = {
    sn_booking_code: bookingCode,
  };
  const [t, i18next] = useTranslation('hotels');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');

  const handleAction = async (url: string) => {
    await addToCart(itemToBook, i18next, store);
    router.replace(url);
  };

  return (
    <footer className="px-4 py-4">
      <section className="grid grid-cols-2 gap-3">
        <Button
          value={addToItineraryText}
          size="full"
          type="outlined"
          textColor="primary"
          onClick={() => handleAction('/itinerary')}
          className="text-base font-semibold leading-base"
        />
        <Button
          value={bookNowText}
          size="full"
          onClick={() => handleAction('/checkout/client')}
          className="text-base font-semibold leading-base"
        />
      </section>
    </footer>
  );
};

export default RoomCardActions;
