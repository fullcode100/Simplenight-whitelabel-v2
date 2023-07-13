import TravelersInput from 'hotels/components/TravelersInput/TravelersInput';
import { Dispatch, SetStateAction, useState } from 'react';
import { Room } from 'hotels/helpers/room';
import { useTranslation } from 'react-i18next';

interface GuestsRoomsInputProps {
  roomsData: Room[];
  setRoomsData: Dispatch<SetStateAction<Room[]>>;
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
  const [t] = useTranslation('hotels');
  const [showTravelersInput, setShowTravelersInout] = useState(false);
  const guestText = t('guests', 'Guests');
  return (
    <>
      <p className="text-sm font-semibold text-dark-800">{guestText}</p>
      <TravelersInput
        setShowTravelersInput={setShowTravelersInout}
        adults={adults}
        children={childrens}
        showTravelersInput={showTravelersInput}
        onClose={() => setShowTravelersInout(false)}
        rooms={roomsData}
        setRooms={setRoomsData}
      />
    </>
  );
};

export default GuestsRoomsInput;
