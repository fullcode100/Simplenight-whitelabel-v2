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
    inventory_id: hotelId,
    sn_booking_code: bookingCode,
  };
  const [t, i18next] = useTranslation('hotels');
  const addToItineraryText = t('addToItinerary', 'Add to Itinernary');
  const bookNowText = t('bookNow', 'Book Now');

  return (
    <footer className="px-4 py-4">
      <section className="grid grid-cols-2 gap-3">
        <Button
          value={addToItineraryText}
          size="full"
          type="outlined"
          textColor="primary"
          onClick={() => {
            addToCart(itemToBook, i18next, store);
          }}
          className="font-normal text-sm"
        />
        <Button
          value={bookNowText}
          size="full"
          onClick={() => {
            addToCart(itemToBook, i18next, store);
            router.replace('/checkout/client');
          }}
          className="font-normal text-sm"
        />
      </section>
    </footer>
  );
};

export default RoomCardActions;
