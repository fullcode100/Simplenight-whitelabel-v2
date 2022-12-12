import { createMachine } from 'xstate';

// TODO: Create machine context
// TODO: Add actions
// TODO: Manipulate filters

const hotelFilterMachine = createMachine({
  id: 'hotelFilters',
  initial: 'Idle',
  states: {
    Idle: {
      on: {
        keywordSearch: {
          target: 'handleFilters',
        },
        priceRange: {
          target: 'handleFilters',
        },
        starRating: {
          target: 'handleFilters',
        },
        sortBy: {
          target: 'handleFilters',
        },
        paymentTypes: {
          target: 'handleFilters',
        },
      },
    },
    handleFilters: {
      on: {
        filterHotels: {
          target: 'filteredHotels',
        },
      },
    },
    filteredHotels: {
      on: {
        clearFilters: {
          target: 'Idle',
        },
      },
    },
  },
});

const carFilterMachine = createMachine({
  id: 'carFilters',
  initial: 'Idle',
  states: {
    Idle: {
      on: {
        keywordSearch: {
          target: 'handleFilters',
        },
        priceRange: {
          target: 'handleFilters',
        },
        starRating: {
          target: 'handleFilters',
        },
        sortBy: {
          target: 'handleFilters',
        },
        paymentTypes: {
          target: 'handleFilters',
        },
      },
    },
    handleFilters: {
      on: {
        filterCars: {
          target: 'filteredCars',
        },
      },
    },
    filteredCars: {
      on: {
        clearFilters: {
          target: 'Idle',
        },
      },
    },
  },
});
