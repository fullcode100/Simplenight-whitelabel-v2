import { useTranslation } from 'react-i18next';
import { Room } from 'flights/types/response/SearchResponse';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { hasCartMode } from 'helpers/purchaseModeUtils';

interface RoomProps {
  room: Room;
  flightId: string;
}

const RoomCardActions = ({ room, flightId }: RoomProps) => {
  const router = useRouter();

  const bookingCode = room.rates.min_rate.sn_booking_code;
  const itemToBook = {
    sn_booking_code: bookingCode,
  };
  const [t, i18next] = useTranslation('flights');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');
  const showAddToItinerary = hasCartMode();

  return (
    <footer className="px-4 py-4">
      <section className="grid grid-cols-2 gap-3">
        {showAddToItinerary && (
          <Button
            value={addToItineraryText}
            size="full"
            type="outlined"
            textColor="primary"
            onClick={() => {
              addToCart(itemToBook, i18next);
            }}
            className="text-base font-semibold leading-base"
          />
        )}
        <Button
          value={bookNowText}
          size="full"
          onClick={() => {
            addToCart(itemToBook, i18next);
            router.replace('/checkout/client');
          }}
          className="text-base font-semibold leading-base"
        />
      </section>
    </footer>
  );
};

export default RoomCardActions;
