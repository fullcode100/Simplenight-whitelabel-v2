export type filters = {
  minPrice: string;
  maxPrice: string;
  minSeats: string;
  maxSeats: string;
};

export interface iDetailFilterFormProps {
  onChange(filter: filters): void;
  maxPrice?: string;
  maxSeats?: string;
}
