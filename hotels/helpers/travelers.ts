import { Dispatch, SetStateAction } from 'react';
import { Room } from './room';

export const setTravelersTotals = (
  rooms: Room[],
  setAdultsCount: Dispatch<SetStateAction<string>>,
  setChildrenCount: Dispatch<SetStateAction<string>>,
  setChildrenAges: Dispatch<SetStateAction<string>>,
) => {
  let adults = 0;
  let children = 0;
  let ages: number[] = [];
  rooms.forEach((room: Room) => {
    adults += room.adults;
    children += room.children;
    ages = ages.concat(room.childrenAges);
  });

  setAdultsCount(adults.toString());
  setChildrenCount(children.toString());
  setChildrenAges(JSON.stringify(ages));
};
