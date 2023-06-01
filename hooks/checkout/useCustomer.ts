import { create } from 'zustand';

export interface Customer {
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_prefix: string;
}

type State = {
  customer: Customer | null;
};

type Action = {
  updateCustomer: (customer: Customer) => void;
};

export const useCustomer = create<State & Action>((set) => ({
  customer: null,
  updateCustomer: (customer: Customer) => {
    set(() => ({ customer }));
  },
}));
