export interface Room {
  adults: number;
  children: number;
  infants: number;
  childrenAges: number[];
  infantsAges: number[];
}

export const createRoom = (): Room => ({
  adults: 1,
  children: 0,
  infants: 0,
  childrenAges: [],
  infantsAges: [],
});
