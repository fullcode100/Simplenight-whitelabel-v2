/* eslint-disable indent */
import {
  useState,
  MouseEvent,
  Fragment,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';

import ChildrenAges from './components/ChildrenAges';
import InfantsAges from './components/InfantsAges';
import TravelersCount from './components/TravelersCount';
import { Room } from 'hotels/helpers/room';
import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Popper from 'components/global/Popper/Popper';

interface TravelersInputProps {
  showTravelersInput: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  setShowTravelersInput: (value: SetStateAction<boolean>) => void;
  adults: string;
  children: string;
}

const TravelersInput = ({
  showTravelersInput,
  onClose,
  rooms,
  setRooms,
  setShowTravelersInput,
  adults,
  children,
}: TravelersInputProps) => {
  const [t] = useTranslation('global');
  const guestsLabel = t('guests', 'Guests');
  const guestLabel = t('guest', 'Guest');
  const DEFAULT_CHILDREN_AGE = 2;
  const DEFAULT_INFANT_AGE = 0;
  const [newRooms, setNewRooms] = useState<Room[]>(rooms);

  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [infantAges, setInfantAges] = useState<number[]>([]);

  const [indexOnFocus, setIndexOnFocus] = useState<number>(0);

  const handleCountChange = (value: number, index: number, type: string) => {
    const updatedRoom = newRooms[index];
    let updatedChildrenAges = [];
    let updatedInfantsAges = [];
    switch (type) {
      case 'adults':
        updatedRoom['adults'] = value;
        break;
      case 'children':
        updatedRoom['children'] = value;
        updatedChildrenAges = [...childrenAges];
        updatedChildrenAges[value - 1] = DEFAULT_CHILDREN_AGE; // Set the default value at the specified index
        setChildrenAges(updatedChildrenAges);
        break;
      case 'infants':
        updatedRoom['infants'] = value;
        updatedInfantsAges = [...infantAges];
        updatedInfantsAges[value - 1] = DEFAULT_INFANT_AGE;
        setInfantAges(updatedInfantsAges);
        break;
    }
    const isLastChildrenRemoved =
      (type === 'children' || type === 'infants') && value === 0;

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
    setChildrenAges(updatedChildrenAges);
  };

  const handleInfantsAgesChange = (
    value: number,
    indexAge: number,
    roomNumber: number,
  ) => {
    const updatedRoom = newRooms[roomNumber];
    const updatedInfantsAges = [...infantAges];

    if (updatedInfantsAges.length <= indexAge) {
      // If the array is not long enough to accommodate the index, fill it with NaN values
      updatedInfantsAges.length = indexAge + 1;
      updatedInfantsAges.fill(NaN, infantAges.length);
    }

    updatedInfantsAges[indexAge] = value; // Set the value at the specified index
    setInfantAges(updatedInfantsAges);
  };

  useEffect(() => {
    setRooms([
      {
        ...newRooms[0],
        childrenAges: [...childrenAges, ...infantAges],
      },
    ]);
  }, [newRooms, childrenAges, infantAges]);

  return (
    <Popper
      open={showTravelersInput}
      content={
        <section className="h-full w-full lg:min-w-[400px] p-6 lg:p-2">
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
      }
      onClose={() => onClose()}
      placement="left"
    >
      <button
        onClick={() => setShowTravelersInput(true)}
        className="bg-white mt-2 rounded border border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000 cursor-default"
      >
        <section className="flex items-center gap-2">
          <MultiplePersons className="text-dark-700" />
          {`${parseInt(adults) + parseInt(children)}`}
          <section className="hidden lg:block">
            {usePlural(
              parseInt(adults) + parseInt(children),
              guestLabel,
              guestsLabel,
            )}
          </section>
        </section>
      </button>
    </Popper>
  );
};

export default TravelersInput;
