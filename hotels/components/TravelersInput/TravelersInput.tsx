/* eslint-disable indent */
import {
  useState,
  MouseEvent,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import RoomHeader from './components/RoomHeader';
import AddRoomButton from './components/AddRoomButton';
import ChildrenAges from './components/ChildrenAges';
import TravelersCount from './components/TravelersCount';
import { Room, createRoom } from 'hotels/helpers/room';

interface TravelersInputProps {
  showTravelersInput: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
}

const TravelersInput = ({
  showTravelersInput,
  onClose,
  rooms,
  setRooms,
}: TravelersInputProps) => {
  const [t, i18next] = useTranslation('global');
  const applyLabel = t('apply', 'Apply');
  const roomsLabel = t('rooms', 'Rooms');

  const [newRooms, setNewRooms] = useState<Room[]>(rooms);

  const handleAddRoom = () => {
    setNewRooms([...newRooms, createRoom()]);
  };

  const handleDeleteRoom = (room: Room) => {
    const updatedRooms = newRooms.filter((r) => r !== room);
    setNewRooms(updatedRooms);
  };

  const handleCountChange = (value: number, index: number, type: string) => {
    const updatedRoom = newRooms[index];
    switch (type) {
      case 'adults':
        updatedRoom['adults'] = value;
        break;
      case 'children':
        updatedRoom['children'] = value;
        break;
    }
    const isLastChildrenRemoved = type === 'children' && value === 0;
    if (isLastChildrenRemoved) updatedRoom['childrenAges'] = [];
    const updatedRooms = [...newRooms];
    updatedRooms[index] = updatedRoom;
    setNewRooms(updatedRooms);
  };

  const handleAgesChange = (
    value: number,
    indexAge: number,
    roomNumber: number,
  ) => {
    const updatedRoom = newRooms[roomNumber];
    updatedRoom.childrenAges[indexAge] = value;

    const updatedRooms = [...newRooms];
    updatedRooms[roomNumber] = updatedRoom;
    setNewRooms(updatedRooms);
  };

  const setTravelers = () => {
    setRooms(newRooms);
    onClose();
  };

  const Divider = () => <div className="w-full border-t border-gray-300" />;

  return (
    <FullScreenModal
      open={showTravelersInput}
      closeModal={onClose}
      title={roomsLabel}
      primaryButtonText={applyLabel}
      primaryButtonAction={setTravelers}
    >
      <section className="h-full px-5 py-[22px] overflow-y-scroll">
        {newRooms.map((room: Room, index) => {
          return (
            <Fragment key={index}>
              <RoomHeader
                index={index}
                room={room}
                newRooms={newRooms}
                handleDeleteRoom={handleDeleteRoom}
              />

              <TravelersCount
                room={room}
                index={index}
                handleCountChange={handleCountChange}
              />

              {room.children > 0 && (
                <ChildrenAges
                  room={room}
                  roomNumber={index}
                  handleAgesChange={handleAgesChange}
                />
              )}

              <Divider />
            </Fragment>
          );
        })}

        {newRooms.length < 10 && (
          <AddRoomButton handleAddRoom={handleAddRoom} />
        )}
      </section>
    </FullScreenModal>
  );
};

export default TravelersInput;
