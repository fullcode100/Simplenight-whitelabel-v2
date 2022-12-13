import TravelersInput from 'cars/components/TravelersInput/TravelersInput';
import { Dispatch, SetStateAction, useState } from 'react';
import Bed from 'public/icons/assets/bed.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import { Room } from 'cars/helpers/room';
import { useTranslation } from 'react-i18next';
import { usePlural } from 'hooks/stringBehavior/usePlural';

type setRoomDataType = Dispatch<SetStateAction<Room[]>>;
interface GuestsRoomsInputProps {
  roomsData: Room[];
  setRoomsData: (data: Room[]) => void | setRoomDataType;
  adults: string;
  childrens: string;
  rooms: number;
}

const GuestsRoomsInput = ({
  roomsData,
  setRoomsData,
  adults,
  childrens,
  rooms,
}: GuestsRoomsInputProps) => {
  const [t] = useTranslation('cars');
  const [showTravelersInput, setShowTravelersInout] = useState(false);
  const guestLabel = t('guest', 'Guest');
  const guestsLabel = t('guests', 'Guests');
  const roomLabel = t('room', 'Room');
  const roomsLabel = t('rooms', 'Rooms');
  const guestAndRoomsText = t('guestsAndRooms', 'Guests & Rooms');
  return (
    <>
      <TravelersInput
        showTravelersInput={showTravelersInput}
        onClose={() => setShowTravelersInout(false)}
        rooms={roomsData}
        setRooms={setRoomsData as setRoomDataType}
      />
      <p className="text-sm font-semibold text-dark-800">{guestAndRoomsText}</p>
      <button
        onClick={() => setShowTravelersInout(true)}
        className="mt-1 grid grid-cols-2 rounded-md border border-gray-300 w-full py-2 px-[13px] text-sm text-dark-1000 cursor-default"
      >
        <section className="flex items-center gap-2">
          <MultiplePersons className="text-dark-700" />
          {parseInt(adults) + parseInt(childrens) || '0'}{' '}
          {usePlural(
            parseInt(adults) + parseInt(childrens) || 0,
            guestLabel,
            guestsLabel,
          )}
        </section>
        <section className="flex items-center gap-2">
          <Bed className="text-dark-700" />
          {rooms} {usePlural(rooms, roomLabel, roomsLabel)}
        </section>
      </button>
    </>
  );
};

export default GuestsRoomsInput;
