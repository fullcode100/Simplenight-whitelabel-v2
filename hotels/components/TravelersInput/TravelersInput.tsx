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
import ChildrenAges from './components/ChildrenAges';
import InfantsAges from './components/InfantsAges';
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
  const guestsLabel = t('guests', 'Guests');

  const [newRooms, setNewRooms] = useState<Room[]>(rooms);
  const [childrenAges, setchildrenAges] = useState<number[]>([]);
  const [infantAges, setinfantAges] = useState<number[]>([]);
  const [indexOnFocus, setIndexOnFocus] = useState<number>(0);
  const handleCountChange = (value: number, index: number, type: string) => {
    const updatedRoom = newRooms[index];
    switch (type) {
      case 'adults':
        updatedRoom['adults'] = value;
        break;
      case 'children':
        updatedRoom['children'] = value;
        const updatedChildrenAges = [...childrenAges];
        updatedChildrenAges[value - 1] = 1; // Set the value at the specified index
        setchildrenAges(updatedChildrenAges);
        break;
      case 'infants':
        updatedRoom['infants'] = value;
        const updatedInfantsAges = [...infantAges];
        updatedInfantsAges[value - 1] = 1;
        setinfantAges(updatedInfantsAges);
        break;
    }
    const isLastChildrenRemoved =
      type === 'children' || (type === 'infants' && value === 0);
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
    const updatedChildrenAges = [...childrenAges];

    if (updatedChildrenAges.length <= indexAge) {
      // If the array is not long enough to accommodate the index, fill it with NaN values
      updatedChildrenAges.length = indexAge + 1;
      updatedChildrenAges.fill(NaN, childrenAges.length);
    }

    updatedChildrenAges[indexAge] = value; // Set the value at the specified index

    setchildrenAges(updatedChildrenAges);
    /* updatedRoom.childrenAges[indexAge] = value;
    const updatedRooms = [...newRooms];
    updatedRooms[roomNumber] = updatedRoom;
    setNewRooms(updatedRooms); */
  };

  const handleInfantsAgesChange = (
    value: number,
    indexAge: number,
    roomNumber: number,
  ) => {
    const updatedInfantsAges = [...infantAges];

    if (updatedInfantsAges.length <= indexAge) {
      // If the array is not long enough to accommodate the index, fill it with NaN values
      updatedInfantsAges.length = indexAge + 1;
      updatedInfantsAges.fill(NaN, childrenAges.length);
    }

    updatedInfantsAges[indexAge] = value; // Set the value at the specified index

    setinfantAges(updatedInfantsAges);
    /* const updatedRoom = newRooms[roomNumber];
    updatedRoom.childrenAges[indexAge + 1] = value;
    
    const updatedRooms = [...newRooms];
    updatedRooms[roomNumber] = updatedRoom;
    setNewRooms(updatedRooms); */
  };

  const setTravelers = () => {
    setRooms([
      { ...newRooms[0], childrenAges: [...childrenAges, ...infantAges] },
    ]);
    onClose();
  };

  return (
    <FullScreenModal
      open={showTravelersInput}
      closeModal={onClose}
      title={guestsLabel}
      primaryButtonText={applyLabel}
      primaryButtonAction={setTravelers}
      className={
        'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
      }
    >
      <section className="h-full px-5 py-[22px] overflow-y-scroll">
        {newRooms.map((room: Room, index) => {
          return (
            <Fragment key={index}>
              <TravelersCount
                room={room}
                index={index}
                handleCountChange={handleCountChange}
              />

              {room.children > 0 && (
                <ChildrenAges
                  childrenAges={childrenAges}
                  room={room}
                  roomNumber={index}
                  handleAgesChange={handleAgesChange}
                  indexOnFocus={indexOnFocus}
                  setIndexOnFocus={setIndexOnFocus}
                />
              )}

              {room.infants > 0 && (
                <InfantsAges
                  infantAges={infantAges}
                  room={room}
                  roomNumber={index + 1}
                  handleInfantsAgesChange={handleInfantsAgesChange}
                  indexOnFocus={indexOnFocus}
                  setIndexOnFocus={setIndexOnFocus}
                />
              )}
            </Fragment>
          );
        })}
      </section>
    </FullScreenModal>
  );
};

export default TravelersInput;
