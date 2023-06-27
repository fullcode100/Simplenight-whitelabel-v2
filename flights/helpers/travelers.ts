import { Dispatch, SetStateAction } from 'react';
import { Traveler } from './traveler';

export const setTravelersTotals = (
  rooms: Traveler[],
  setAdultsCount: Dispatch<SetStateAction<string>>,
  setChildrenCount: Dispatch<SetStateAction<string>>,
  setInfantsCount: Dispatch<SetStateAction<string>>,
  setChildrenAges: Dispatch<SetStateAction<string>>,
  setInfantsAges: Dispatch<SetStateAction<string>>,
) => {
  let adults = 0;
  let children = 0;
  let infants = 0;
  let childrenAges: number[] = [];
  let infantsAges: number[] = [];
  rooms.forEach((room: Traveler) => {
    adults = room.adults;
    children = room.children;
    infants = room.infants;
    childrenAges = childrenAges.concat(room.childrenAges);
    infantsAges = infantsAges.concat(room.infantsAges);
  });

  setAdultsCount(adults.toString());
  setChildrenCount(children.toString());
  setInfantsCount(infants.toString());
  setChildrenAges(childrenAges.join());
  setInfantsAges(infantsAges.join());
};
