import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Room } from 'hotels/types/response/SearchResponse';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { hasCartMode } from 'helpers/purchaseModeUtils';

interface RoomProps {
  room: Room;
  hotelId: string;
  rooms?: number;
}

const RoomCardActions = ({ room, hotelId, rooms = 1 }: RoomProps) => {
  const router = useRouter();

  const bookingCode = room.rates.min_rate.sn_booking_code;
  const itemToBook = {
    sn_booking_code: bookingCode,
  };
  const [t, i18next] = useTranslation('hotels');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookText = t('book', 'Book');
  const tRoom = t('room', 'Room');
  const tRooms = t('rooms', 'Rooms');
  const ROOM_TEXT = usePlural(rooms, tRoom, tRooms);
  const showAddToItinerary = hasCartMode();

  let url = '/itinerary';

  const handleAction = async () => {
    await addToCart(itemToBook, i18next);
  };

  const { mutate, isLoading } = useMutation(handleAction, {
    onSuccess: () => {
      router.push(url);
    },
  });

  return (
    <footer className="px-4 py-4">
      <section className="flex gap-3">
        {showAddToItinerary && (
          <Button
            value={addToItineraryText}
            size="full"
            type="outlined"
            textColor="primary"
            onClick={() => mutate()}
            className="text-base font-semibold leading-base"
            disabled={isLoading}
          />
        )}
        <Button
          value={`${bookText} ${rooms} ${ROOM_TEXT}`}
          size="full"
          onClick={() => {
            url = '/checkout/client';
            mutate();
          }}
          className="text-base font-semibold leading-base"
          disabled={isLoading}
        />
      </section>
    </footer>
  );
};

export default RoomCardActions;
