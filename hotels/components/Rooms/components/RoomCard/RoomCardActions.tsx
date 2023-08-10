import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Room } from 'hotels/types/response/SearchResponse';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { hasCartMode } from 'helpers/purchaseModeUtils';
import { useGA4 } from 'hooks/ga4/useGA4';
import { TRACK_ACTION, TRACK_CATEGORY, TRACK_LABEL } from 'constants/events';
import AngleTop from 'public/icons/assets/angle-top.svg';
import AngleBottom from 'public/icons/assets/chevron-down-arrow.svg';

interface RoomProps {
  room: Room;
  hotelId: string;
  rooms?: number;
  name: string;
  handleOpenClose: () => void;
  open: boolean;
}

const RoomCardActions = ({
  room,
  name,
  hotelId,
  rooms = 1,
  handleOpenClose,
  open,
}: RoomProps) => {
  const router = useRouter();
  const { trackEvent } = useGA4();

  const bookingCode = room.rates.min_rate.sn_booking_code;
  const itemToBook = {
    sn_booking_code: bookingCode,
  };
  const [t, i18next] = useTranslation('hotels');
  const [g] = useTranslation('global');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookText = t('book', 'Book');
  const tRoom = t('room', 'Room');
  const tRooms = t('rooms', 'Rooms');
  const seeMoreLabel = g('seeMore');
  const seeLessLabel = g('seeLess');
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

  const addRoom = () => {
    trackEvent({
      action: TRACK_ACTION.CLICK,
      category: TRACK_CATEGORY.HOTELS,
      label: TRACK_LABEL.ADD_ROOM,
      value: name,
    });
    url = '/checkout/client';
    mutate();
  };

  const addItinerary = () => {
    trackEvent({
      action: TRACK_ACTION.CLICK,
      category: TRACK_CATEGORY.HOTELS,
      label: TRACK_LABEL.ADD_ITINERARY,
      value: name,
    });
    mutate();
  };

  const AngleComponent = open ? AngleTop : AngleBottom;
  return (
    <footer className="px-4 py-4">
      <section className="flex gap-3">
        {showAddToItinerary && (
          <Button
            value={addToItineraryText}
            size="full"
            type="outlined"
            textColor="primary"
            onClick={addItinerary}
            className="text-base font-semibold leading-base"
            disabled={isLoading}
          />
        )}
        <Button
          value={open ? seeLessLabel : seeMoreLabel}
          size="full"
          onClick={() => handleOpenClose()}
          className="text-xs md:text-base font-semibold leading-base bg-white text-black border-dark-1000 border-2 hover:bg-white active:bg-white"
          disabled={isLoading}
          leftIcon={<AngleComponent className={'text-black'} />}
        />
        <Button
          value={`${bookText} ${rooms} ${ROOM_TEXT}`}
          size="full"
          onClick={addRoom}
          className="text-xs md:text-base font-semibold leading-base"
          disabled={isLoading}
        />
      </section>
    </footer>
  );
};

export default RoomCardActions;
