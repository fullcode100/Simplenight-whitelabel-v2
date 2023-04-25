import { Flight } from './types/response/FlightSearchResponse';

export const flightsListMock: Flight[] = [
  {
    departure: {
      iata_code: 'DFW',
      airport: 'Dallas/Fort Worth International Airport (DFW)',
    },
    arrival: {
      iata_code: 'JFK',
      airport: 'John F. Kennedy International Airport (JFK)',
    },
    include: [],
    availability: {
      rate: {
        taxes: {
          prepaid: [],
          postpaid: [],
          full: {},
          total_postpaid: {},
        },
        fees: {},
        total: {
          prepaid: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          postpaid: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          net: {
            amount: 25.64,
            formatted: '$25.64',
            currency: 'USD',
          },
          full: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
        },
        discounts: {
          amount_to_apply: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          breakdown: null,
          total_amount_before_apply: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          net_amount_before_apply: null,
          percentage_to_apply: '0%',
        },
      },
      departure_date: '2023-05-15T07:44:00',
      departure_terminal: 'E',
      arrival_date: '2023-05-15T00:22:00',
      arrival_terminal: '4',
      stops: 0,
      segments: [
        {
          id: 'DFW_JFK_DL_330',
          destination: {
            iata_code: 'JFK',
            airport: 'John F. Kennedy International Airport (JFK)',
          },
          origin: {
            iata_code: 'DFW',
            airport: 'Dallas/Fort Worth International Airport (DFW)',
          },
          departure_date: '2023-05-15T07:44:00',
          departure_terminal: 'E',
          arrival_date: '2023-05-15T00:22:00',
          arrival_terminal: '4',
          duration: '0000',
          next_segment: 0,
          aircraft: '221',
          flight_number: '330',
          carrier_name: 'Delta',
          carrier: 'DL',
        },
      ],
    },
  },
  {
    departure: {
      iata_code: 'DFW',
      airport: 'Dallas/Fort Worth International Airport (DFW)',
    },
    arrival: {
      iata_code: 'JFK',
      airport: 'John F. Kennedy International Airport (JFK)',
    },
    include: [],
    availability: {
      rate: {
        taxes: {
          prepaid: [],
          postpaid: [],
          full: {},
          total_postpaid: {},
        },
        fees: {},
        total: {
          prepaid: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          postpaid: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          net: {
            amount: 27.74,
            formatted: '$27.74',
            currency: 'USD',
          },
          full: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
        },
        discounts: {
          amount_to_apply: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          breakdown: null,
          total_amount_before_apply: {
            amount: 0.0,
            formatted: '$0.00',
            currency: 'USD',
          },
          net_amount_before_apply: null,
          percentage_to_apply: '0%',
        },
      },
      departure_date: '2023-05-15T07:44:00',
      departure_terminal: 'E',
      arrival_date: '2023-05-15T00:22:00',
      arrival_terminal: '4',
      stops: 0,
      segments: [
        {
          id: 'DFW_JFK_DL_330',
          destination: {
            iata_code: 'JFK',
            airport: 'John F. Kennedy International Airport (JFK)',
          },
          origin: {
            iata_code: 'DFW',
            airport: 'Dallas/Fort Worth International Airport (DFW)',
          },
          departure_date: '2023-05-15T07:44:00',
          departure_terminal: 'E',
          arrival_date: '2023-05-15T00:22:00',
          arrival_terminal: '4',
          duration: '0000',
          next_segment: 0,
          aircraft: '221',
          flight_number: '330',
          carrier_name: 'Delta',
          carrier: 'DL',
        },
      ],
    },
  },
];
