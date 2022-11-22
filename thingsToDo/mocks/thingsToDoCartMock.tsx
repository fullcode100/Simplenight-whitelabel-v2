export const thingsToDoCartMock = {
  cart_id: 'd7de940c-10b0-4e84-94d1-fcae0677540e',
  created_at: '2022-11-17T18:10:20.417054Z',
  currency: 'USD',
  customer: {
    id: 56,
    first_name: 'test_fist_name',
    last_name: 'test_last_name',
    phone_number: '0000',
    phone_prefix: '00',
    email: 'test@simplenight.com',
    country: 'CO',
    extra_fields: {
      lang: 'en',
      extra_1: 1,
      extra_2: 2,
    },
  },
  items: [
    {
      booking_data: {
        inventory_id: '7e6cfd32:7264P3',
        booking_code_supplier: 'XQfefns...',
        date: '2022-11-27',
        time: '13:00',
        product_code: 'TG3',
        paxes: [
          {
            age_band: 'ADULT',
            quantity: 2,
            age_band_label: 'Adult',
          },
        ],
      },
      cart_id: 'd7de940c-10b0-4e84-94d1-fcae0677540e',
      cart_item_id: '0b4591f2-9ac4-4f2d-afdd-d1a869ff623e',
      category: 'attractions',
      created_at: '2022-11-17T18:10:20.431036Z',
      item_data: {
        id: '7e6cfd32:7264P3',
        name: 'Private Luxury Tour of New York City',
        cancellation_policy: {
          cancellation_type: 'FREE_CANCELLATION',
        },
        supplier: '7e6cfd32',
        address: {
          city: 'New York City',
          area: 'New York',
          country: 'USA',
          coordinates: {
            latitude: 40.7163629124,
            longitude: -74.0132188797,
          },
        },
        phone_number: null,
        reviews: null,
        thumbnail:
          'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/74/27/a9.jpg',
        extra_data: {
          avg_rating: 4.75,
          review_amount: 32,
          images: [
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/74/27/a9.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/74/27/aa.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/dd/1e/b7.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/03/76/a7.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/dd/1e/7d.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/0f/8b/10.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/0f/8b/15.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/0f/8b/4a.jpg',
            'https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/dd/1e/09.jpg',
          ],
          tickets: [
            {
              name: 'Luxury Limo 6 hour tour',
              description:
                'Luxury Limo 6 hours\n\nUp to 10 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.812077Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1116.26,
                          currency: 'USD',
                          formatted: '$1,116.26',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1116.26,
                      currency: 'USD',
                      formatted: '$1,116.26',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1116.26,
                      currency: 'USD',
                      formatted: '$1,116.26',
                    },
                    recommended_amount: {
                      amount: 1500,
                      currency: 'USD',
                      formatted: '$1,500.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc0IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Luxury Limo 6 hour tour',
              description:
                'Luxury Limo 6 hours\n\nUp to 10 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.814670Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1116.26,
                          currency: 'USD',
                          formatted: '$1,116.26',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1116.26,
                      currency: 'USD',
                      formatted: '$1,116.26',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1116.26,
                      currency: 'USD',
                      formatted: '$1,116.26',
                    },
                    recommended_amount: {
                      amount: 1500,
                      currency: 'USD',
                      formatted: '$1,500.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc0IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Luxury Limo 4 hour tour',
              description:
                '4 hour limo\n\nUp to 10 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.817490Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 893,
                          currency: 'USD',
                          formatted: '$893.00',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    recommended_amount: {
                      amount: 1200,
                      currency: 'USD',
                      formatted: '$1,200.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEcxIiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Luxury Limo 4 hour tour',
              description:
                '4 hour limo\n\nUp to 10 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.819857Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 893,
                          currency: 'USD',
                          formatted: '$893.00',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    recommended_amount: {
                      amount: 1200,
                      currency: 'USD',
                      formatted: '$1,200.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEcxIiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Luxury Mini Coach',
              description:
                'Private tour on a luxury mini Coach up to 4 hours<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.822182Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1190.67,
                          currency: 'USD',
                          formatted: '$1,190.67',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1190.67,
                      currency: 'USD',
                      formatted: '$1,190.67',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1190.67,
                      currency: 'USD',
                      formatted: '$1,190.67',
                    },
                    recommended_amount: {
                      amount: 1600,
                      currency: 'USD',
                      formatted: '$1,600.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc5IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Luxury Mini Coach',
              description:
                'Private tour on a luxury mini Coach up to 4 hours<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.824540Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1190.67,
                          currency: 'USD',
                          formatted: '$1,190.67',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1190.67,
                      currency: 'USD',
                      formatted: '$1,190.67',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1190.67,
                      currency: 'USD',
                      formatted: '$1,190.67',
                    },
                    recommended_amount: {
                      amount: 1600,
                      currency: 'USD',
                      formatted: '$1,600.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc5IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Jet Sprinter 6 hour tour',
              description:
                'Jet Sprinter 6 hour tour\n\nUp to 7 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.827652Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 2009.26,
                          currency: 'USD',
                          formatted: '$2,009.26',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 2009.26,
                      currency: 'USD',
                      formatted: '$2,009.26',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 2009.26,
                      currency: 'USD',
                      formatted: '$2,009.26',
                    },
                    recommended_amount: {
                      amount: 2700,
                      currency: 'USD',
                      formatted: '$2,700.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc4IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Jet Sprinter 6 hour tour',
              description:
                'Jet Sprinter 6 hour tour\n\nUp to 7 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.830026Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 2009.26,
                          currency: 'USD',
                          formatted: '$2,009.26',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 2009.26,
                      currency: 'USD',
                      formatted: '$2,009.26',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 2009.26,
                      currency: 'USD',
                      formatted: '$2,009.26',
                    },
                    recommended_amount: {
                      amount: 2700,
                      currency: 'USD',
                      formatted: '$2,700.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc4IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Sprinter Van 4 hour tour',
              description:
                'Sprinter Van 4 hours\n\nUp to 12 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.832354Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 893,
                          currency: 'USD',
                          formatted: '$893.00',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    recommended_amount: {
                      amount: 1200,
                      currency: 'USD',
                      formatted: '$1,200.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc1IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Sprinter Van 4 hour tour',
              description:
                'Sprinter Van 4 hours\n\nUp to 12 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.834682Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 893,
                          currency: 'USD',
                          formatted: '$893.00',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 893,
                      currency: 'USD',
                      formatted: '$893.00',
                    },
                    recommended_amount: {
                      amount: 1200,
                      currency: 'USD',
                      formatted: '$1,200.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc1IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Jet Sprinter 4 hour tour',
              description:
                'Jet Sprinter 4 hours\n\nUp to 7 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.837238Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1339.5,
                          currency: 'USD',
                          formatted: '$1,339.50',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    recommended_amount: {
                      amount: 1800,
                      currency: 'USD',
                      formatted: '$1,800.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc3IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Jet Sprinter 4 hour tour',
              description:
                'Jet Sprinter 4 hours\n\nUp to 7 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.839486Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1339.5,
                          currency: 'USD',
                          formatted: '$1,339.50',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    recommended_amount: {
                      amount: 1800,
                      currency: 'USD',
                      formatted: '$1,800.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc3IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Sprinter Van 6 hour tour',
              description:
                'Sprinter Van 6 hours\n\nUp to 12 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.841869Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1339.5,
                          currency: 'USD',
                          formatted: '$1,339.50',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    recommended_amount: {
                      amount: 1800,
                      currency: 'USD',
                      formatted: '$1,800.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc2IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
            {
              name: 'Sprinter Van 6 hour tour',
              description:
                'Sprinter Van 6 hours\n\nUp to 12 passengers<br/>Pickup included',
              duration: 240,
              start_date: '2022-11-27',
              full_day: false,
              ticket_types: [
                {
                  id: 'TRAVELER',
                  label: 'Traveler',
                  available_qty: 0,
                  cancellation_policy: {
                    cancellation_type: 'FREE_CANCELLATION',
                    details: [
                      {
                        cancellation_type: 'FREE_CANCELLATION',
                        from_date: '2022-11-17T18:10:23.844120Z',
                        to_date: '2022-11-26T00:00:00Z',
                        penalty_amount: {
                          amount: 0,
                          currency: 'USD',
                          formatted: '$0.00',
                        },
                        penalty_percentage: 0,
                      },
                      {
                        cancellation_type: 'NON_REFUNDABLE',
                        from_date: '2022-11-26T00:00:01Z',
                        to_date: '2022-11-27T00:00:00Z',
                        penalty_amount: {
                          amount: 1339.5,
                          currency: 'USD',
                          formatted: '$1,339.50',
                        },
                        penalty_percentage: 100,
                      },
                    ],
                    description:
                      'For a full refund, cancel at least 24 hours before the scheduled departure time.',
                    flags: [
                      {
                        flag_id: 'CUT_OFF_TIMES_LOCAL_BASED',
                        description:
                          // eslint-disable-next-line prettier/prettier
                          'Cut-off times are based on the experience\'s local time.',
                        value: true,
                      },
                    ],
                  },
                  rate: {
                    rate_type: 'SN_PUBLIC',
                    avg_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    taxes: [],
                    total_taxes: {
                      amount: 0,
                      currency: 'USD',
                      formatted: '$0.00',
                    },
                    total_amount: {
                      amount: 1339.5,
                      currency: 'USD',
                      formatted: '$1,339.50',
                    },
                    recommended_amount: {
                      amount: 1800,
                      currency: 'USD',
                      formatted: '$1,800.00',
                    },
                  },
                },
              ],
              booking_code_supplier:
                'eyJwcm9kdWN0X2NvZGUiOiAiNzI2NFAzIiwgInByb2R1Y3Rfb3B0aW9uX2NvZGUiOiAiVEc2IiwgInRyYXZlbF9kYXRlIjogIjIwMjItMTEtMjciLCAic3RhcnRfdGltZSI6IG51bGx9',
            },
          ],
          pricing: {
            type: 'PER_UNIT',
            ticket_types: [
              {
                ticket_type_id: 'TRAVELER',
                start_age: 0,
                end_age: 99,
                min_travelers: 1,
                max_travelers: 15,
                label: 'Traveler',
              },
            ],
            unit_type: 'VEHICLE',
          },
          description:
            'Customize your own 4-hour, private tour of New York City with top-of-the-line professional service and comfort by traveling in a luxurious limo, luxury Sprinter van, or luxury mini coach. On the exclusive, private tours, you and your group are able to customize an itinerary, tailor the pick up/drop off locations and times to your needs per your request. You can arrange your private tour pick up and drop off at any location in the \n\nNew York City/metro area, including the three airports that service the area. You will also be assisted with pre-purchasing any tickets to attractions you may want to add as part of your NYC experience and make recommendations based on your interests.',
          includes: [
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Transport by private, luxury vehicle',
            },
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Concierge service',
            },
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Hotel pickup and drop-off',
            },
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Professional guide',
            },
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Start/end time per your request',
            },
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Customized itinerary',
            },
          ],
          excludes: [
            {
              category: 'FEES_AND_TAXES',
              category_description: 'Fees',
              description: 'Gratuities',
            },
            {
              category: 'OTHER',
              category_description: 'Other',
              description: 'Food and drinks',
            },
          ],
          grouping: {
            type: 'PER_BOOKING',
            description: 'One per booking',
          },
          presentation: [
            {
              label: 'Mobile ticket',
              id: 'MOBILE',
            },
          ],
          booking_questions: [
            {
              id: 'AGEBAND',
              label: 'Age band',
              hint: '',
              is_required: true,
              grouping: 'PER_TRAVELER',
              answer_type: 'TEXT',
              answer_max_length: 50,
              answer_options: [
                {
                  answer: 'ADULT',
                },
                {
                  answer: 'SENIOR',
                },
                {
                  answer: 'YOUTH',
                },
                {
                  answer: 'CHILD',
                },
                {
                  answer: 'INFANT',
                },
                {
                  answer: 'TRAVELER',
                },
              ],
              is_conditional: false,
            },
            {
              id: 'FULL_NAMES_FIRST',
              label: 'First name',
              hint: '',
              is_required: true,
              grouping: 'PER_TRAVELER',
              answer_type: 'TEXT',
              answer_max_length: 50,
              is_conditional: false,
            },
            {
              id: 'FULL_NAMES_LAST',
              label: 'Last name',
              hint: '',
              is_required: true,
              grouping: 'PER_TRAVELER',
              answer_type: 'TEXT',
              answer_max_length: 50,
              is_conditional: false,
            },
            {
              id: 'PICKUP_POINT',
              label: 'Hotel pickup',
              hint: 'E.g. 1234 Cedar Way, Brooklyn NY 00123',
              is_required: true,
              grouping: 'PER_BOOKING',
              answer_type: 'LOCATION_FREE_TEXT',
              answer_max_length: 1000,
              answer_units: ['LOCATION_REFERENCE', 'FREETEXT'],
              is_conditional: false,
            },
            {
              id: 'SPECIAL_REQUIREMENTS',
              label: 'Special requirements',
              hint: '',
              is_required: false,
              grouping: 'PER_BOOKING',
              answer_type: 'TEXT',
              answer_max_length: 1000,
              is_conditional: false,
            },
          ],
          lang_guides: [
            {
              lang_code: 'de',
              language: 'German',
            },
            {
              lang_code: 'ru',
              language: 'Russian',
            },
            {
              lang_code: 'cmn',
              language: 'Mandarin Chinese',
            },
            {
              lang_code: 'en',
              language: 'English',
            },
            {
              lang_code: 'it',
              language: 'Italian',
            },
            {
              lang_code: 'fr',
              language: 'French',
            },
            {
              lang_code: 'es',
              language: 'Spanish',
            },
          ],
          pickup: {
            allow_custom_location: true,
            options: ['PICKUP'],
            description: 'We pick up from all Hotels and address in New York',
            locations: [
              {
                location: {
                  ref: 'CONTACT_SUPPLIER_LATER',
                  provider: 'TRIPADVISOR',
                  name: 'I will contact the supplier later',
                },
                pickup_type: 'OTHER',
              },
              {
                location: {
                  ref: 'LOC-6eKJ+or5y8o99Qw0C8xWyCcXS0to8J3vkyD/FKwtNhw=',
                  provider: 'TRIPADVISOR',
                  name: 'New York Hilton Midtown',
                  address: {
                    address1: '1335 Avenue Of The Americas',
                    address2: '',
                    city: 'New York City',
                    state: 'New York',
                    country_code: 'US',
                    country: 'United States',
                    postal_code: '10019-6078',
                  },
                  coordinates: {
                    latitude: 40.762245,
                    longitude: -73.97919,
                  },
                },
                pickup_type: 'HOTEL',
              },
              {
                location: {
                  ref: 'LOC-6eKJ+or5y8o99Qw0C8xWyOsTWibU1xzX2U5TpMgySa4=',
                  provider: 'TRIPADVISOR',
                  name: 'New York Marriott Marquis',
                  address: {
                    address1: '1535 Broadway',
                    address2: '',
                    city: 'New York City',
                    state: 'New York',
                    country_code: 'US',
                    country: 'United States',
                    postal_code: '10036',
                  },
                  coordinates: {
                    latitude: 40.758583,
                    longitude: -73.98582,
                  },
                },
                pickup_type: 'HOTEL',
              },
              {
                location: {
                  ref: 'LOC-6eKJ+or5y8o99Qw0C8xWyDIBL92fJeEWhKbE4UGOPZM=',
                  provider: 'TRIPADVISOR',
                  name: 'The New Yorker, A Wyndham Hotel',
                  address: {
                    address1: '481 8th Avenue & 34th Street',
                    address2: '',
                    city: 'New York City',
                    state: 'New York',
                    country_code: 'US',
                    country: 'United States',
                    postal_code: '10001-1809',
                  },
                  coordinates: {
                    latitude: 40.75263,
                    longitude: -73.993385,
                  },
                },
                pickup_type: 'HOTEL',
              },
              {
                location: {
                  ref: 'LOC-6eKJ+or5y8o99Qw0C8xWyCvZOkPXvWaIt6RBcmp3TF4=',
                  provider: 'TRIPADVISOR',
                  name: 'The New York EDITION',
                  address: {
                    address1:
                      '5 Madison Ave, Hotel Entrance on 24th Street between Madison & Park Avenues',
                    address2: '',
                    city: 'New York City',
                    state: 'New York',
                    country_code: 'US',
                    country: 'United States',
                    postal_code: '10010-3678',
                  },
                  coordinates: {
                    latitude: 40.74139,
                    longitude: -73.987366,
                  },
                },
                pickup_type: 'HOTEL',
              },
              {
                location: {
                  ref: 'LOC-6eKJ+or5y8o99Qw0C8xWyKplI23BR6gCGPSQU61Tvoc=',
                  provider: 'TRIPADVISOR',
                  name: 'Trump International Hotel and Tower New York',
                  address: {
                    address1: '1 Central Park West, ',
                    address2: '',
                    city: 'New York City',
                    state: 'New York',
                    country_code: 'US',
                    country: 'United States',
                    postal_code: '10023-7703',
                  },
                  coordinates: {
                    latitude: 40.76907,
                    longitude: -73.98157,
                  },
                },
                pickup_type: 'HOTEL',
              },
            ],
          },
          safety_measures: [],
          amenities: [
            'Wheelchair accessible',
            'Infants and small children can ride in a pram or stroller',
            'Service animals allowed',
            'Public transportation options are available nearby',
            'Specialized infant seats are available',
            'Not recommended for travelers with poor cardiovascular health',
            'Travelers should have at least a moderate level of physical fitness',
            'Limo: A maximum of ten (10) people per booking',
            'Sprinter Van: A maximum of twelve (12) people per booking',
            'Jet Sprinter: A maximum of seven (7) people per booking',
            'Luxury Mini Coach bus: A maximum of thirty (30) people per booking',
            'Luxury Coach bus: A maximum of fifty five (55) people per booking',
            'Price shown is per vehicle',
            'Wheelchair and infant seats are available upon reuqest. Please let us know',
          ],
          min_travelers: 1,
          max_travelers: 15,
          is_adult_required: true,
          booking_confirmation_settings: {
            confirmation_type: 'INSTANT',
            cut_off_type: 'START_TIME',
            cut_off_in_minutes: 480,
          },
          redemption: {
            redemption_type: 'NO_REDEMPTION',
            locations: [],
            instructions:
              '• LIMO: A maximum of eight (8) people per booking; select 1 Adult at booking for 1 limo\n • SPRINTER VAN: A maximum of twelve (12) people per booking; select 1 Adult at booking for 1 Sprinter van\n • MINI COACH: A maximum of twenty-three (23) people per booking; select 1 Adult at booking for 1 mini coach',
          },
          duration: 240,
          full_day: false,
          start_date: '2022-11-27',
        },
        categories: [
          {
            id: 'sport',
            label: 'Sport',
          },
          {
            id: 'tours',
            label: 'Tours',
          },
          {
            id: 'outdoor',
            label: 'Outdoor',
          },
        ],
        rate: {
          taxes: {
            prepaid: [],
            postpaid: [],
            full: {
              description: '',
              type: '',
              amount: {
                amount: 0,
                formatted: '$0',
                currency: 'USD',
              },
            },
          },
          fees: {
            prepaid: [],
            postpaid: [],
            full: {
              description: '',
              type: '',
              amount: {
                amount: 0,
                formatted: '$0',
                currency: 'USD',
              },
            },
          },
          total: {
            prepaid: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
            postpaid: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
            net: {
              amount: 893,
              formatted: '$893',
              currency: 'USD',
            },
            full: {
              amount: 893,
              formatted: '$893',
              currency: 'USD',
            },
          },
          discounts: {
            amount_to_apply: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
            breakdown: null,
            total_amount_before_apply: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
            base_amount_before_apply: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
            net_amount_before_apply: null,
            percentage_to_apply: '0%',
          },
        },
      },
      inventory_id: '7e6cfd32:7264P3',
      inventory_name: '',
      quantity: 1,
      rate: {
        taxes: {
          prepaid: [],
          postpaid: [],
          full: {
            description: '',
            type: '',
            amount: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
          },
        },
        fees: {
          prepaid: [],
          postpaid: [],
          full: {
            description: '',
            type: '',
            amount: {
              amount: 0,
              formatted: '$0',
              currency: 'USD',
            },
          },
        },
        total: {
          prepaid: {
            amount: 0,
            formatted: '$0',
            currency: 'USD',
          },
          postpaid: {
            amount: 0,
            formatted: '$0',
            currency: 'USD',
          },
          net: {
            amount: 461.89,
            formatted: '$461.89',
            currency: 'USD',
          },
          full: {
            amount: 461.89,
            formatted: '$461.89',
            currency: 'USD',
          },
        },
        discounts: {
          amount_to_apply: {
            amount: 0,
            formatted: '$0',
            currency: 'USD',
          },
          breakdown: null,
          total_amount_before_apply: {
            amount: 0,
            formatted: '$0',
            currency: 'USD',
          },
          base_amount_before_apply: {
            amount: 0,
            formatted: '$0',
            currency: 'USD',
          },
          net_amount_before_apply: null,
          percentage_to_apply: '0%',
        },
      },
      status: 'active',
      supplier: '',
      thumbnail_url: '',
    },
  ],
  lang: 'en',
  last_update_at: '2022-11-17T18:10:20.417118Z',
  sandbox_mode: true,
  status: 'active',
  total_amount_post_paid: {
    amount: 0,
    formatted: '$0',
    currency: 'USD',
  },
  total_amount_taxes_postpaid: {
    amount: 0,
    formatted: '$0',
    currency: 'USD',
  },
  total_amount_taxes: {
    amount: 0,
    formatted: '$0',
    currency: 'USD',
  },
  total_amount: {
    amount: 0,
    formatted: '$0',
    currency: 'USD',
  },
  total_item_qty: 1,
};
