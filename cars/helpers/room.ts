export interface Room {
  adults: number;
  children: number;
  infants: number;
  childrenAges: number[];
}

export const createRoom = (): Room => ({
  adults: 2,
  children: 0,
  infants: 0,
  childrenAges: [],
});
