export interface Traveler {
  adults: number;
  children: number;
  infants: number;
  childrenAges: number[];
  infantsAges: number[];
}

export const createTraveler = (): Traveler => ({
  adults: 1,
  children: 0,
  infants: 0,
  childrenAges: [],
  infantsAges: [],
});
