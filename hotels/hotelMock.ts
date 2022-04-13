import { Hotel } from './types/response/SearchResponse';

export default [
  {
    id: '704f71db:160156',
    name: 'Homewood Suites by Hilton Edgewater-NYC Area',
    description:
      "The following services and amenities are available, but with **reduced service**: Complimentary Evening Social, Fitness Center, Breakfast.The Homewood Suites by Hilton Edgewater-NYC Area, NJ hotel overlooks Manhattan from the western banks of the Hudson River in New Jersey. The convenient location of Homewood Suites by Hilton offers you easy access to all of the Tri-State area's corporate and industrial parks, popular tourist sites and attractions. \n\nThe Homewood Suites by Hilton in Edgewater, New Jersey features 122 spacious studio (king) suites and one-bedroom suites (with a king bed or two queen beds). The EMPIRE Suites boast a Manhattan skyline view and a whirlpool tub overlooking the master bedroom. Our suites will make guests feel right at home and pampered with a fully equipped kitchen including a full-size refrigerator, range top, microwave, dishwasher, and coffeemaker. Each suite has a sofa bed in the living area. Large flat-screen TVs, two-line telephones, iron with ironing board and hairdryers are just a few of the amenities found at our Edgewater, New Jersey Homewood Suites by Hilton hotel.",
    thumbnail:
      'http://photos.hotelbeds.com/giata/16/160156/160156a_hb_f_001.jpg',
    rooms: [
      {
        code: 'SUI.C2',
        room_type: 'SUI',
        description: 'SUITE CAPACITY 2',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|SUI.C2|BAR RO NRF|RO||1~2~0||N@06~A-SIC~20ba72~-670247369~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000522097b',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 20,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 2427.32,
                    str: '$2,427.32',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -364.09,
                    str: '$-364.09',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 2063.22,
                str: '$2,063.22',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.C2|BAR RO|RO||1~2~0||N@06~A-SIC~248a9c~-41175335~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005260992',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 20,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2450.96,
                      str: '$2,450.96',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -367.64,
                      str: '$-367.64',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2083.31,
                  str: '$2,083.31',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.C2|BAR RO NRF|AB||1~2~0||N@06~A-SIC~256b7e~-2124945018~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000520ca6f',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 20,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2671.12,
                      str: '$2,671.12',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -400.66,
                      str: '$-400.66',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2270.45,
                  str: '$2,270.45',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.C2|BAR RO|AB||1~2~0||N@06~A-SIC~248b9d~-1722467710~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005248a7a',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 20,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2682.72,
                      str: '$2,682.72',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -402.4,
                      str: '$-402.40',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2280.31,
                  str: '$2,280.31',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
      {
        code: 'SUI.KG',
        room_type: 'SUI',
        description: 'SUITE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|SUI.KG|BAR RO NRF|RO||1~2~0||N@06~A-SIC~20ba72~226981642~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000522097b',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 34,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 2427.32,
                    str: '$2,427.32',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -364.09,
                    str: '$-364.09',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 2063.22,
                str: '$2,063.22',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.KG|BAR RO|RO||1~2~0||N@06~A-SIC~248a9c~2135275820~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005260992',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 34,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2450.96,
                      str: '$2,450.96',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -367.64,
                      str: '$-367.64',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2083.31,
                  str: '$2,083.31',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.KG|BAR RO NRF|AB||1~2~0||N@06~A-SIC~256b7e~-1227716007~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000520ca6f',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 34,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2671.12,
                      str: '$2,671.12',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -400.66,
                      str: '$-400.66',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2270.45,
                  str: '$2,270.45',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.KG|BAR RO|AB||1~2~0||N@06~A-SIC~248b9d~453983445~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005248a7a',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 34,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2682.72,
                      str: '$2,682.72',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -402.4,
                      str: '$-402.40',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2280.31,
                  str: '$2,280.31',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
      {
        code: 'DBL.KG',
        room_type: 'DBL',
        description: 'DOUBLE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 5,
          min_adults: 1,
          max_adults: 4,
          min_children: 4,
          max_children: 4,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|DBL.KG|BAR RO NRF|RO||1~2~0||N@06~A-SIC~246683~-387425095~S~~~NRF~48628E060662424164977423332403AAUS000000100000000052105eb',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 10,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 1515.16,
                    str: '$1,515.16',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -227.27,
                    str: '$-227.27',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 1287.88,
                str: '$1,287.88',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.KG|BAR RO NRF|AB||1~2~0||N@06~A-SIC~22e790~-1256559437~S~~~NRF~48628E060662424164977423332403AAUS000000100000000052606de',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 10,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 1758.96,
                      str: '$1,758.96',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -263.84,
                      str: '$-263.84',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1495.11,
                  str: '$1,495.11',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.KG|BAR RO|RO||1~2~0||N@06~A-SIC~246b3b~-1688402622~S~~~NOR~48628E060662424164977423332403AAUS0000001000000000521ca22',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 10,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2594.28,
                      str: '$2,594.28',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -389.14,
                      str: '$-389.14',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2205.13,
                  str: '$2,205.13',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.KG|BAR RO|AB||1~2~0||N@06~A-SIC~246c3c~924519836~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005204b0a',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 10,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2826.04,
                      str: '$2,826.04',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -423.9,
                      str: '$-423.90',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2402.13,
                  str: '$2,402.13',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
      {
        code: 'DBL.C2',
        room_type: 'DBL',
        description: 'DOUBLE CAPACITY 2',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 5,
          min_adults: 1,
          max_adults: 4,
          min_children: 4,
          max_children: 4,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|DBL.C2|BAR RO NRF|RO||1~2~0||N@06~A-SIC~24573a~1849946851~S~~~NRF~48628E060662424164977423332403AAUS00000010000000005209691',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 44,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 1681.09,
                    str: '$1,681.09',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -252.16,
                    str: '$-252.16',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 1428.92,
                str: '$1,428.92',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.C2|BAR RO|RO||1~2~0||N@06~A-SIC~241833~-1666903420~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005208767',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 44,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 1895.08,
                      str: '$1,895.08',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -284.26,
                      str: '$-284.26',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1610.81,
                  str: '$1,610.81',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.C2|BAR RO NRF|AB||1~2~0||N@06~A-SIC~22c847~-2104959709~S~~~NRF~48628E060662424164977423332403AAUS00000010000000005259784',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 44,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 1924.89,
                      str: '$1,924.89',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -288.73,
                      str: '$-288.73',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1636.15,
                  str: '$1,636.15',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.C2|BAR RO|AB||1~2~0||N@06~A-SIC~241934~952841176~S~~~NOR~48628E060662424164977423332403AAUS0000001000000000525484e',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 44,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2126.84,
                      str: '$2,126.84',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -319.02,
                      str: '$-319.02',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1807.81,
                  str: '$1,807.81',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
    ],
    amount_min: {
      amount: 3308.8,
      str: '$3,308.80',
      currency: 'USD',
    },
    relative_position: {
      distance: 5.9816,
      distance_unit: 'mi',
      near_to: [
        {
          location_type: 'example',
          location_code: '123',
          location_name: 'Example Location',
          distance: '0',
        },
      ],
      distance_to_city_centre: 0.0,
      distance_to_nearest_airport: 0.0,
    },
    address: {
      coordinates: {
        latitude: 40.8065189832902,
        longitude: -73.9901393651826,
        radius: 15,
        unit: 'mi',
      },
      country_code: 'US',
      country: 'United States',
      state: 'NEW JERSEY',
      city: 'Edgewater',
      zone: 'Edgewater',
      district: '',
      address1: '10 The Promenade',
      address2: '',
      postal_code: '',
    },
    type: 'Hotel',
    star_rating: '3',
    web: 'https://www.hilton.com/en/hotels/ewrewhw-homewood-suites-edgewater-nyc-area/',
    email: 'EWREW_Homewood@hilton.com',
    phones: [
      {
        phone_number: '+180022554663',
        phone_type: 'PHONEBOOKING',
      },
    ],
    checkin_time: '14:00:00',
    checkout_time: '10:00:00',
    facilities: [
      'Minor - AvaniSHIELD',
      'Rosen - Total Commitment',
      'Morocco - Tourisme au Maroc post Covid-19',
      'RIU - Covid-19 Health Protocol',
      'Table tennis',
      'Morocco - Tourisme au Maroc post Covid-19',
      'Pedal boating',
      'Extra beds on demand',
      'Breakfast a la carte',
      'Fitness',
      'Cycling / mountain biking',
      'Blue Diamond Resorts - Enhanced Health, Safety & Cleanliness Protocols',
      'Table tennis',
      'Golf',
      'Minimum check-in age',
      'Pedal boating',
      'Wi-fi',
      'Skiing',
      'Squash',
      'Aerobics',
      'Launderette',
      'Multilingual staff',
      'Golf practice facility',
      'Bellboy service',
      'RIU - Covid-19 Health Protocol',
      'NH - Feel safe at NH',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Minor - AvaniSHIELD',
      'WTTC - Safe Travels Stamp',
      'Newspapers',
      'Luggage room',
      'Clothes dryer',
      'Diving',
      'Smoking area',
      'Catamaran sailing',
      'Waterskiing',
      'Online check-in',
      'Spa centre',
      'Business centre',
      'Turkish bath (hamam)',
      'WaterSlides',
      'TV lounge',
      'Sauna',
      'Surfing',
      'Hairdressing salon',
      'Mauritian Standard on Sustainable Tourism',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Non-smoking establishment',
      'Fitness',
      'Tennis',
      'Hilton - CleanStay',
    ],
    amenities: [],
    chain: {
      chain_code: '',
      chain_name: '',
    },
    supplier_prefix: '704f71db',
    supplier_id: '160156',
  },
  {
    id: '704f71db:160156',
    name: 'Homewood Suites by Hilton Edgewater-NYC Area',
    description:
      "The following services and amenities are available, but with **reduced service**: Complimentary Evening Social, Fitness Center, Breakfast.The Homewood Suites by Hilton Edgewater-NYC Area, NJ hotel overlooks Manhattan from the western banks of the Hudson River in New Jersey. The convenient location of Homewood Suites by Hilton offers you easy access to all of the Tri-State area's corporate and industrial parks, popular tourist sites and attractions. \n\nThe Homewood Suites by Hilton in Edgewater, New Jersey features 122 spacious studio (king) suites and one-bedroom suites (with a king bed or two queen beds). The EMPIRE Suites boast a Manhattan skyline view and a whirlpool tub overlooking the master bedroom. Our suites will make guests feel right at home and pampered with a fully equipped kitchen including a full-size refrigerator, range top, microwave, dishwasher, and coffeemaker. Each suite has a sofa bed in the living area. Large flat-screen TVs, two-line telephones, iron with ironing board and hairdryers are just a few of the amenities found at our Edgewater, New Jersey Homewood Suites by Hilton hotel.",
    thumbnail:
      'http://photos.hotelbeds.com/giata/16/160156/160156a_hb_f_001.jpg',
    rooms: [
      {
        code: 'SUI.C2',
        room_type: 'SUI',
        description: 'SUITE CAPACITY 2',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|SUI.C2|BAR RO NRF|RO||1~2~0||N@06~A-SIC~20ba72~-670247369~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000522097b',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 20,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 2427.32,
                    str: '$2,427.32',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -364.09,
                    str: '$-364.09',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 2063.22,
                str: '$2,063.22',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.C2|BAR RO|RO||1~2~0||N@06~A-SIC~248a9c~-41175335~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005260992',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 20,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2450.96,
                      str: '$2,450.96',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -367.64,
                      str: '$-367.64',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2083.31,
                  str: '$2,083.31',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.C2|BAR RO NRF|AB||1~2~0||N@06~A-SIC~256b7e~-2124945018~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000520ca6f',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 20,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2671.12,
                      str: '$2,671.12',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -400.66,
                      str: '$-400.66',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2270.45,
                  str: '$2,270.45',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.C2|BAR RO|AB||1~2~0||N@06~A-SIC~248b9d~-1722467710~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005248a7a',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 20,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2682.72,
                      str: '$2,682.72',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -402.4,
                      str: '$-402.40',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2280.31,
                  str: '$2,280.31',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
      {
        code: 'SUI.KG',
        room_type: 'SUI',
        description: 'SUITE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|SUI.KG|BAR RO NRF|RO||1~2~0||N@06~A-SIC~20ba72~226981642~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000522097b',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 34,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 2427.32,
                    str: '$2,427.32',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -364.09,
                    str: '$-364.09',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 2063.22,
                str: '$2,063.22',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.KG|BAR RO|RO||1~2~0||N@06~A-SIC~248a9c~2135275820~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005260992',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 34,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2450.96,
                      str: '$2,450.96',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -367.64,
                      str: '$-367.64',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2083.31,
                  str: '$2,083.31',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.KG|BAR RO NRF|AB||1~2~0||N@06~A-SIC~256b7e~-1227716007~S~~~NRF~48628E060662424164977423332403AAUS0000001000000000520ca6f',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 34,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2671.12,
                      str: '$2,671.12',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -400.66,
                      str: '$-400.66',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2270.45,
                  str: '$2,270.45',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|SUI.KG|BAR RO|AB||1~2~0||N@06~A-SIC~248b9d~453983445~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005248a7a',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 34,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2682.72,
                      str: '$2,682.72',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -402.4,
                      str: '$-402.40',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2280.31,
                  str: '$2,280.31',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
      {
        code: 'DBL.KG',
        room_type: 'DBL',
        description: 'DOUBLE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 5,
          min_adults: 1,
          max_adults: 4,
          min_children: 4,
          max_children: 4,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|DBL.KG|BAR RO NRF|RO||1~2~0||N@06~A-SIC~246683~-387425095~S~~~NRF~48628E060662424164977423332403AAUS000000100000000052105eb',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 10,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 1515.16,
                    str: '$1,515.16',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -227.27,
                    str: '$-227.27',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 1287.88,
                str: '$1,287.88',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.KG|BAR RO NRF|AB||1~2~0||N@06~A-SIC~22e790~-1256559437~S~~~NRF~48628E060662424164977423332403AAUS000000100000000052606de',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 10,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 1758.96,
                      str: '$1,758.96',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -263.84,
                      str: '$-263.84',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1495.11,
                  str: '$1,495.11',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.KG|BAR RO|RO||1~2~0||N@06~A-SIC~246b3b~-1688402622~S~~~NOR~48628E060662424164977423332403AAUS0000001000000000521ca22',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 10,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2594.28,
                      str: '$2,594.28',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -389.14,
                      str: '$-389.14',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2205.13,
                  str: '$2,205.13',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.KG|BAR RO|AB||1~2~0||N@06~A-SIC~246c3c~924519836~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005204b0a',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 10,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2826.04,
                      str: '$2,826.04',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -423.9,
                      str: '$-423.90',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 2402.13,
                  str: '$2,402.13',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
      {
        code: 'DBL.C2',
        room_type: 'DBL',
        description: 'DOUBLE CAPACITY 2',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 5,
          min_adults: 1,
          max_adults: 4,
          min_children: 4,
          max_children: 4,
        },
        rates: {
          avg_amount: {
            amount: 1.0,
            str: '$1',
            currency: 'USD',
          },
          min_rate: {
            rate_type: 'SN_PRIVATE',
            meal_plan: {
              code: 'RO',
              text: 'ROOM ONLY',
            },
            booking_code_sn: '',
            booking_code_supplier:
              '20220901|20220905|W|254|13007|DBL.C2|BAR RO NRF|RO||1~2~0||N@06~A-SIC~24573a~1849946851~S~~~NRF~48628E060662424164977423332403AAUS00000010000000005209691',
            comments: '',
            requires_validation_before_booking: false,
            available_qty: 44,
            rate: {
              rate_breakdown: {
                diff_min_rate: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                discounts: {
                  total_amount_before_apply: {
                    amount: 1681.09,
                    str: '$1,681.09',
                    currency: 'USD',
                  },
                  amount_to_apply: {
                    amount: -252.16,
                    str: '$-252.16',
                    currency: 'USD',
                  },
                },
                rate_type: 'SN_PUBLIC',
                taxes: [],
                total_base_amount: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
                total_taxes: {
                  amount: 1.0,
                  str: '$1',
                  currency: 'USD',
                },
              },
              total_amount: {
                amount: 1428.92,
                str: '$1,428.92',
                currency: 'USD',
              },
            },
          },
          upgrades: [
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'RO',
                text: 'ROOM ONLY',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.C2|BAR RO|RO||1~2~0||N@06~A-SIC~241833~-1666903420~S~~~NOR~48628E060662424164977423332403AAUS00000010000000005208767',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 44,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 1895.08,
                      str: '$1,895.08',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -284.26,
                      str: '$-284.26',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1610.81,
                  str: '$1,610.81',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.C2|BAR RO NRF|AB||1~2~0||N@06~A-SIC~22c847~-2104959709~S~~~NRF~48628E060662424164977423332403AAUS00000010000000005259784',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 44,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 1924.89,
                      str: '$1,924.89',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -288.73,
                      str: '$-288.73',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1636.15,
                  str: '$1,636.15',
                  currency: 'USD',
                },
              },
            },
            {
              rate_type: 'SN_PRIVATE',
              meal_plan: {
                code: 'AB',
                text: 'AMERICAN BREAKFAST',
              },
              booking_code_sn: '',
              booking_code_supplier:
                '20220901|20220905|W|254|13007|DBL.C2|BAR RO|AB||1~2~0||N@06~A-SIC~241934~952841176~S~~~NOR~48628E060662424164977423332403AAUS0000001000000000525484e',
              comments: '',
              requires_validation_before_booking: false,
              available_qty: 44,
              rate: {
                rate_breakdown: {
                  diff_min_rate: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  discounts: {
                    total_amount_before_apply: {
                      amount: 2126.84,
                      str: '$2,126.84',
                      currency: 'USD',
                    },
                    amount_to_apply: {
                      amount: -319.02,
                      str: '$-319.02',
                      currency: 'USD',
                    },
                  },
                  rate_type: 'SN_PUBLIC',
                  taxes: [],
                  total_base_amount: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                  total_taxes: {
                    amount: 1.0,
                    str: '$1',
                    currency: 'USD',
                  },
                },
                total_amount: {
                  amount: 1807.81,
                  str: '$1,807.81',
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
    ],
    amount_min: {
      amount: 3308.8,
      str: '$3,308.80',
      currency: 'USD',
    },
    relative_position: {
      distance: 5.9816,
      distance_unit: 'mi',
      near_to: [
        {
          location_type: 'example',
          location_code: '123',
          location_name: 'Example Location',
          distance: '0',
        },
      ],
      distance_to_city_centre: 0.0,
      distance_to_nearest_airport: 0.0,
    },
    address: {
      coordinates: {
        latitude: 40.8065189832902,
        longitude: -73.9901393651826,
        radius: 15,
        unit: 'mi',
      },
      country_code: 'US',
      country: 'United States',
      state: 'NEW JERSEY',
      city: 'Edgewater',
      zone: 'Edgewater',
      district: '',
      address1: '10 The Promenade',
      address2: '',
      postal_code: '',
    },
    type: 'Hotel',
    star_rating: '3',
    web: 'https://www.hilton.com/en/hotels/ewrewhw-homewood-suites-edgewater-nyc-area/',
    email: 'EWREW_Homewood@hilton.com',
    phones: [
      {
        phone_number: '+180022554663',
        phone_type: 'PHONEBOOKING',
      },
    ],
    checkin_time: '14:00:00',
    checkout_time: '10:00:00',
    facilities: [
      'Minor - AvaniSHIELD',
      'Rosen - Total Commitment',
      'Morocco - Tourisme au Maroc post Covid-19',
      'RIU - Covid-19 Health Protocol',
      'Table tennis',
      'Morocco - Tourisme au Maroc post Covid-19',
      'Pedal boating',
      'Extra beds on demand',
      'Breakfast a la carte',
      'Fitness',
      'Cycling / mountain biking',
      'Blue Diamond Resorts - Enhanced Health, Safety & Cleanliness Protocols',
      'Table tennis',
      'Golf',
      'Minimum check-in age',
      'Pedal boating',
      'Wi-fi',
      'Skiing',
      'Squash',
      'Aerobics',
      'Launderette',
      'Multilingual staff',
      'Golf practice facility',
      'Bellboy service',
      'RIU - Covid-19 Health Protocol',
      'NH - Feel safe at NH',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Minor - AvaniSHIELD',
      'WTTC - Safe Travels Stamp',
      'Newspapers',
      'Luggage room',
      'Clothes dryer',
      'Diving',
      'Smoking area',
      'Catamaran sailing',
      'Waterskiing',
      'Online check-in',
      'Spa centre',
      'Business centre',
      'Turkish bath (hamam)',
      'WaterSlides',
      'TV lounge',
      'Sauna',
      'Surfing',
      'Hairdressing salon',
      'Mauritian Standard on Sustainable Tourism',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Non-smoking establishment',
      'Fitness',
      'Tennis',
      'Hilton - CleanStay',
    ],
    amenities: [],
    chain: {
      chain_code: '',
      chain_name: '',
    },
    supplier_prefix: '704f71db',
    supplier_id: '160156',
  },
  {
    id: '704f71db:160156',
    name: 'Homewood Suites by Hilton Edgewater-NYC Area',
    description:
      "The following services and amenities are available, but with **reduced service**: Complimentary Evening Social, Fitness Center, Breakfast.The Homewood Suites by Hilton Edgewater-NYC Area, NJ hotel overlooks Manhattan from the western banks of the Hudson River in New Jersey. The convenient location of Homewood Suites by Hilton offers you easy access to all of the Tri-State area's corporate and industrial parks, popular tourist sites and attractions. \n\nThe Homewood Suites by Hilton in Edgewater, New Jersey features 122 spacious studio (king) suites and one-bedroom suites (with a king bed or two queen beds). The EMPIRE Suites boast a Manhattan skyline view and a whirlpool tub overlooking the master bedroom. Our suites will make guests feel right at home and pampered with a fully equipped kitchen including a full-size refrigerator, range top, microwave, dishwasher, and coffeemaker. Each suite has a sofa bed in the living area. Large flat-screen TVs, two-line telephones, iron with ironing board and hairdryers are just a few of the amenities found at our Edgewater, New Jersey Homewood Suites by Hilton hotel.",
    thumbnail:
      'http://photos.hotelbeds.com/giata/16/160156/160156a_hb_f_001.jpg',
    rooms: [
      {
        code: 'SUI.KG',
        room_type: 'SUI',
        description: 'SUITE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        amount_total: {
          amount: 3456.56,
          str: '$3,456.56',
          currency: 'USD',
        },
      },
      {
        code: 'SUI.CV-KG',
        room_type: 'SUI',
        description: 'SUITE CITY VIEW KING BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        amount_total: {
          amount: 3604.24,
          str: '$3,604.24',
          currency: 'USD',
        },
      },
      {
        code: 'SUI.KG-3',
        room_type: 'SUI',
        description: 'SUITE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        amount_total: {
          amount: 3308.8,
          str: '$3,308.80',
          currency: 'USD',
        },
      },
    ],
    amount_min: {
      amount: 3308.8,
      str: '$3,308.80',
      currency: 'USD',
    },
    relative_position: {
      distance: 5.9816,
      distance_unit: 'mi',
      near_to: [
        {
          location_type: 'example',
          location_code: '123',
          location_name: 'Example Location',
          distance: '0',
        },
      ],
      distance_to_city_centre: 0.0,
      distance_to_nearest_airport: 0.0,
    },
    address: {
      coordinates: {
        latitude: 40.8065189832902,
        longitude: -73.9901393651826,
        radius: 15,
        unit: 'mi',
      },
      country_code: 'US',
      country: 'United States',
      state: 'NEW JERSEY',
      city: 'Edgewater',
      zone: 'Edgewater',
      district: '',
      address1: '10 The Promenade',
      address2: '',
      postal_code: '',
    },
    type: 'Hotel',
    star_rating: '3',
    web: 'https://www.hilton.com/en/hotels/ewrewhw-homewood-suites-edgewater-nyc-area/',
    email: 'EWREW_Homewood@hilton.com',
    phones: [
      {
        phone_number: '+180022554663',
        phone_type: 'PHONEBOOKING',
      },
    ],
    checkin_time: '14:00:00',
    checkout_time: '10:00:00',
    facilities: [
      'Minor - AvaniSHIELD',
      'Rosen - Total Commitment',
      'Morocco - Tourisme au Maroc post Covid-19',
      'RIU - Covid-19 Health Protocol',
      'Table tennis',
      'Morocco - Tourisme au Maroc post Covid-19',
      'Pedal boating',
      'Extra beds on demand',
      'Breakfast a la carte',
      'Fitness',
      'Cycling / mountain biking',
      'Blue Diamond Resorts - Enhanced Health, Safety & Cleanliness Protocols',
      'Table tennis',
      'Golf',
      'Minimum check-in age',
      'Pedal boating',
      'Wi-fi',
      'Skiing',
      'Squash',
      'Aerobics',
      'Launderette',
      'Multilingual staff',
      'Golf practice facility',
      'Bellboy service',
      'RIU - Covid-19 Health Protocol',
      'NH - Feel safe at NH',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Minor - AvaniSHIELD',
      'WTTC - Safe Travels Stamp',
      'Newspapers',
      'Luggage room',
      'Clothes dryer',
      'Diving',
      'Smoking area',
      'Catamaran sailing',
      'Waterskiing',
      'Online check-in',
      'Spa centre',
      'Business centre',
      'Turkish bath (hamam)',
      'WaterSlides',
      'TV lounge',
      'Sauna',
      'Surfing',
      'Hairdressing salon',
      'Mauritian Standard on Sustainable Tourism',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Non-smoking establishment',
      'Fitness',
      'Tennis',
      'Hilton - CleanStay',
    ],
    amenities: [],
    chain: {
      chain_code: '',
      chain_name: '',
    },
    supplier_prefix: '704f71db',
    supplier_id: '160156',
  },
  {
    id: '704f71db:160156',
    name: 'Homewood Suites by Hilton Edgewater-NYC Area',
    description:
      "The following services and amenities are available, but with **reduced service**: Complimentary Evening Social, Fitness Center, Breakfast.The Homewood Suites by Hilton Edgewater-NYC Area, NJ hotel overlooks Manhattan from the western banks of the Hudson River in New Jersey. The convenient location of Homewood Suites by Hilton offers you easy access to all of the Tri-State area's corporate and industrial parks, popular tourist sites and attractions. \n\nThe Homewood Suites by Hilton in Edgewater, New Jersey features 122 spacious studio (king) suites and one-bedroom suites (with a king bed or two queen beds). The EMPIRE Suites boast a Manhattan skyline view and a whirlpool tub overlooking the master bedroom. Our suites will make guests feel right at home and pampered with a fully equipped kitchen including a full-size refrigerator, range top, microwave, dishwasher, and coffeemaker. Each suite has a sofa bed in the living area. Large flat-screen TVs, two-line telephones, iron with ironing board and hairdryers are just a few of the amenities found at our Edgewater, New Jersey Homewood Suites by Hilton hotel.",
    thumbnail:
      'http://photos.hotelbeds.com/giata/16/160156/160156a_hb_f_001.jpg',
    rooms: [
      {
        code: 'SUI.KG',
        room_type: 'SUI',
        description: 'SUITE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        amount_total: {
          amount: 3456.56,
          str: '$3,456.56',
          currency: 'USD',
        },
      },
      {
        code: 'SUI.CV-KG',
        room_type: 'SUI',
        description: 'SUITE CITY VIEW KING BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        amount_total: {
          amount: 3604.24,
          str: '$3,604.24',
          currency: 'USD',
        },
      },
      {
        code: 'SUI.KG-3',
        room_type: 'SUI',
        description: 'SUITE KING SIZE BED',
        name: 'Bed room',
        capacity: {
          min_pax: 1,
          max_pax: 8,
          min_adults: 1,
          max_adults: 8,
          min_children: 5,
          max_children: 5,
        },
        amount_total: {
          amount: 3308.8,
          str: '$3,308.80',
          currency: 'USD',
        },
      },
    ],
    amount_min: {
      amount: 3308.8,
      str: '$3,308.80',
      currency: 'USD',
    },
    relative_position: {
      distance: 5.9816,
      distance_unit: 'mi',
      near_to: [
        {
          location_type: 'example',
          location_code: '123',
          location_name: 'Example Location',
          distance: '0',
        },
      ],
      distance_to_city_centre: 0.0,
      distance_to_nearest_airport: 0.0,
    },
    address: {
      coordinates: {
        latitude: 40.8065189832902,
        longitude: -73.9901393651826,
        radius: 15,
        unit: 'mi',
      },
      country_code: 'US',
      country: 'United States',
      state: 'NEW JERSEY',
      city: 'Edgewater',
      zone: 'Edgewater',
      district: '',
      address1: '10 The Promenade',
      address2: '',
      postal_code: '',
    },
    type: 'Hotel',
    star_rating: '3',
    web: 'https://www.hilton.com/en/hotels/ewrewhw-homewood-suites-edgewater-nyc-area/',
    email: 'EWREW_Homewood@hilton.com',
    phones: [
      {
        phone_number: '+180022554663',
        phone_type: 'PHONEBOOKING',
      },
    ],
    checkin_time: '14:00:00',
    checkout_time: '10:00:00',
    facilities: [
      'Minor - AvaniSHIELD',
      'Rosen - Total Commitment',
      'Morocco - Tourisme au Maroc post Covid-19',
      'RIU - Covid-19 Health Protocol',
      'Table tennis',
      'Morocco - Tourisme au Maroc post Covid-19',
      'Pedal boating',
      'Extra beds on demand',
      'Breakfast a la carte',
      'Fitness',
      'Cycling / mountain biking',
      'Blue Diamond Resorts - Enhanced Health, Safety & Cleanliness Protocols',
      'Table tennis',
      'Golf',
      'Minimum check-in age',
      'Pedal boating',
      'Wi-fi',
      'Skiing',
      'Squash',
      'Aerobics',
      'Launderette',
      'Multilingual staff',
      'Golf practice facility',
      'Bellboy service',
      'RIU - Covid-19 Health Protocol',
      'NH - Feel safe at NH',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Minor - AvaniSHIELD',
      'WTTC - Safe Travels Stamp',
      'Newspapers',
      'Luggage room',
      'Clothes dryer',
      'Diving',
      'Smoking area',
      'Catamaran sailing',
      'Waterskiing',
      'Online check-in',
      'Spa centre',
      'Business centre',
      'Turkish bath (hamam)',
      'WaterSlides',
      'TV lounge',
      'Sauna',
      'Surfing',
      'Hairdressing salon',
      'Mauritian Standard on Sustainable Tourism',
      'Colombia - Check in certificado, COVID-19 bioseguro',
      'Non-smoking establishment',
      'Fitness',
      'Tennis',
      'Hilton - CleanStay',
    ],
    amenities: [],
    chain: {
      chain_code: '',
      chain_name: '',
    },
    supplier_prefix: '704f71db',
    supplier_id: '160156',
  },
] as Hotel[];
