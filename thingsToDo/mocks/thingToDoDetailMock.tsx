export const thingToDoDetail = {
  id: 'x',
  name: 'Richard H. Driehaus Museum',
  reviews: {
    reviews_amount: 230,
    activity_score: 4.3,
    total_score: 5,
  },
  images: [
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/14557066.jpg?k=ec0a8068f06ab7a8f90e20a984859a83fd4f10f2d3d19da9579198252fc35cfb&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/14557066.jpg?k=ec0a8068f06ab7a8f90e20a984859a83fd4f10f2d3d19da9579198252fc35cfb&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/14557066.jpg?k=ec0a8068f06ab7a8f90e20a984859a83fd4f10f2d3d19da9579198252fc35cfb&o=',
  ],
  policies: [
    {
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      list: [
        'The property has connecting/adjoining rooms, which are subject to availability and can be requested by contacting the property using the number on the booking confirmation.',
        'The property allows pets in specific rooms only and has other pet restrictions (surcharges apply and can be found in the Fees section). Guests can arrange to bring pets by contacting the property directly, using the contact information on the booking confirmation.',
      ],
    },
  ],
  additional_information: {
    paragraph: '',
    list: [
      'Confirmation will be received at time of booking.',
      'Service animals allowed.',
      'Suitable for all physical fitness levels.',
      'Duration of this tour is approximately 6 hours. You may extend the tour. Extra time will be billed in 30 minutes increments at the same hourly rate.',
      'Advance reservations required for concierge service and winery tasting appointment.',
      'Tasting fees and food costs are not included.',
      'Out of area pickup may be available for an extra charge.',
      'Hand sanitiser available to travellers and staff',
      'Transportation vehicles regularly sanitised',
      'Guides required to regularly wash hands',
      'Contactless payments for gratuities and add-ons',
      'COVID-19 vaccination required for guides',
    ],
  },
  cancellation_policy: {
    cancellation_type: 'FREE_CANCELLATION',
    details: [
      {
        cancellation_type: 'FREE_CANCELLATION',
        from_date: '2022-10-20T13:46:45.483976Z',
        to_date: '2022-11-09T00:00:00Z',
        penalty_amount: {
          amount: 0,
          currency: 'USD',
          formatted: '$0.00',
        },
      },
      {
        cancellation_type: 'NON_REFUNDABLE',
        from_date: '2022-11-09T00:00:01Z',
        to_date: '2022-11-10T00:00:00Z',
        penalty_amount: {
          amount: 40.94,
          currency: 'USD',
          formatted: '$40.94',
        },
      },
    ],
    description:
      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
    flags: [
      {
        flag_id: 'CANCEL_IF_BAD_WEATHER',
        value: true,
      },
      {
        flag_id: 'CANCEL_IF_INSUFFICIENT_TRAVELERS',
        value: true,
      },
    ],
  },
  tickets: [
    /* info de cada ticket */
    /* podría haber varios tipos de ticket (?) */
    {
      name: 'All Access Premium Pass',
      rates: {
        total: {
          amount: 190.23,
          formatted: '$190.23',
          currency: 'USD',
        },
        discount_percentage: '25%',
        total_amount_before_discount: {
          amount: 237.79,
          formatted: '$237.79',
          currency: 'USD',
        },
        taxes: {
          amount: 10,
          formatted: '$10',
          currency: 'USD',
        },
        additional_fees: {
          amount: 20,
          formatted: '$20',
          currency: 'USD',
        },
      },
      details: {
        /* esto sería para la sección de Ticket Details */
        duration: {
          /* hs, min? */
          total: 12,
          unit: 'hs',
        },
        ticket_description: 'Lorem ipsum ....',
        includes: [
          'Skip-the-line Service',
          '2 Free Postcards',
          'Guided Audio Tour',
        ],
        features_description: 'Lorem ipsum ....',
        supplier_terms_of_service: '?' /* ? */,
        /* faltaría el does not include? */
        /* los rates habría que mandarlos  también aca?*/
      },
      cancellation_policy: {
        cancellation_type: 'FREE_CANCELLATION',
        details: [
          {
            cancellation_type: 'FREE_CANCELLATION',
            from_date: '2022-10-20T13:46:45.483976Z',
            to_date: '2022-11-09T00:00:00Z',
            penalty_amount: {
              amount: 0,
              currency: 'USD',
              formatted: '$0.00',
            },
          },
          {
            cancellation_type: 'NON_REFUNDABLE',
            from_date: '2022-11-09T00:00:01Z',
            to_date: '2022-11-10T00:00:00Z',
            penalty_amount: {
              amount: 40.94,
              currency: 'USD',
              formatted: '$40.94',
            },
          },
        ],
        description:
          'For a full refund, cancel at least 24 hours before the scheduled departure time.',
        flags: [
          {
            flag_id: 'CANCEL_IF_BAD_WEATHER',
            value: false,
          },
          {
            flag_id: 'CANCEL_IF_INSUFFICIENT_TRAVELERS',
            value: false,
          },
        ],
      },
      /* availabilty? maximum availability? */
    },
  ],
  details: {
    duration: {
      total: 12,
      unit: 'hs',
    },
    ticket_type: 'Mobile Ticket',
    pickup: 'Hotel Pickup',
    feature: 'Lorem ipsum',
    languages: ['English', 'Spanish', 'German'],
    description:
      'The Richard H. Driehaus Museum engages and inspires the global community through exploration and ongoing conversations in art, architecture, and design of the late nineteenth and early twentieth centuries. Its permanent collection and temporary exhibitions are ',
    additional_information:
      '* Lorem ipsum \n Lorem ipsum \n Lorem ipsum \n Lorem ipsum sit amet',
  },
  address: {
    country_code: 'US',
    state: 'Illinois',
    city: 'Chicago',
    address1: '11 E. Walton',
    address2: '',
    postal_code: '188995',
    relative_position: {
      distance: 2,
      distance_unit: 'km',
    },
    coordinates: {
      latitude: 36.0954896,
      longitude: -115.2461073,
    },
  },
};
