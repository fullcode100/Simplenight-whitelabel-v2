export const thingToDo = {
  id: 'x',
  name: 'Richard H. Driehaus Museum',
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
  },
  phone_number: '+598 123 456 789',
  reviews: {
    amount: 230,
    rating: 3,
  },
  images: [
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/14557066.jpg?k=ec0a8068f06ab7a8f90e20a984859a83fd4f10f2d3d19da9579198252fc35cfb&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/14557066.jpg?k=ec0a8068f06ab7a8f90e20a984859a83fd4f10f2d3d19da9579198252fc35cfb&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/14557066.jpg?k=ec0a8068f06ab7a8f90e20a984859a83fd4f10f2d3d19da9579198252fc35cfb&o=',
  ],
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
  },
  tags: ['tag 1', 'tag 2', 'tag 3'],
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
};
