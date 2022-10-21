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
        description:
          'From 2022-10-06 is non-refundable reservation with $106.29 penalty',
        details: [
          {
            from_date: '2022-10-06T00:00:00Z',
            to_date: '2022-10-06T23:59:59Z',
            penalty_percentage: 100,
            penalty_amount: {
              amount: 106.29,
              formatted: '$106.29',
              currency: 'USD',
            },
            cancellation_type: 'NON_REFUNDABLE',
          },
        ],
        cancellation_type: 'NON_REFUNDABLE',
      },
      /* availabilty? maximum availability? */
    },
  ],
  details: {
    duration: {
      /* hs, min? */
      total: 12,
      unit: 'hs',
    },
    ticket_type: 'Mobile Ticket',
    pickup: 'Hotel Pickup' /* que opciones habría? siempre se muestra? */,
    feature: 'Lorem ipsum' /* que va aca? en el diseño el icono es una foto */,
    languages: ['English', 'Spanish', 'German'],
    description:
      'The Richard H. Driehaus Museum engages and inspires the global community through exploration and ongoing conversations in art, architecture, and design of the late nineteenth and early twentieth centuries. Its permanent collection and temporary exhibitions are ',
    additional_information:
      '* Lorem ipsum \n Lorem ipsum \n Lorem ipsum \n Lorem ipsum sit amet' /* sería así o nos llegarían un array de items y una description? */,
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
      longitude: -115.2461073 /* esto es lo que se necesita para el mapa? */,
    },
  },
};
