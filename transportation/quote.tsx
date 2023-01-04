export const qoute = {
  response: {
    quote: {
      book_url:
        'https%3A%2F%2Fstaging-booking.jayride.com%2Ffind%3Ffrom-type%3Daddress%26from-description%3DAmman%2C%20Jordan%26from-lat%3D31.9539494%26from-lng%3D35.910635%26to-type%3Dairport-terminal%26to-description%3DAmman%20Airport%20%28AMM%29%2C%20Main%20Terminal%26to-lat%3D31.722133%26to-lng%3D35.986167%26passengers%3D1%26include-return-trip%3Dfalse%26quote-request-id%3D617a32ab-c6ba-4199-a1f9-0e0dfeee2476%26quote-id%3Da093337b-cac1-4626-9f88-84c107140339%26utm_source%3Dmember-35335%26utm_medium%3Dweb%26utm_campaign%3Dapi',
      expire_datetime_utc: '2022-12-16T14:34:40',
      fare: {
        currency_code: 'USD',
        price: 42.0,
        refund_cancellation_policy:
          'You are eligible for a 100% refund on your booking, with no cancellation fees, for cancellations greater than 24 hours prior to your pick-up departure time.',
        type: 'estimated',
        refund_policies: [
          {
            minute_prior: 1440,
            percent: 1.0,
            method: 'refund',
          },
        ],
      },
      luggage: {
        inclusive_allowance: '1 carry-on & 1 check-in bag included',
      },
      quote_id: 'a093337b-cac1-4626-9f88-84c107140339',
      quote_url:
        'https%3A%2F%2Fstaging-booking.jayride.com%2Ffind%3Ffrom-type%3Daddress%26from-description%3DAmman%2C%20Jordan%26from-lat%3D31.9539494%26from-lng%3D35.910635%26to-type%3Dairport-terminal%26to-description%3DAmman%20Airport%20%28AMM%29%2C%20Main%20Terminal%26to-lat%3D31.722133%26to-lng%3D35.986167%26passengers%3D1%26include-return-trip%3Dfalse%26quote-request-id%3D617a32ab-c6ba-4199-a1f9-0e0dfeee2476%26quote-id%3Da093337b-cac1-4626-9f88-84c107140339%26utm_source%3Dmember-35335%26utm_medium%3Dweb%26utm_campaign%3Dapi',
      service_info: {
        description: null,
        passenger_reviews: {
          average_rating: 5.0,
          count: 0,
        },
        photo_url:
          '//staging-res.jayride.com/web/dotcom/vehicle/370x300/car-economy-sedan.png',
        photo_urls: [
          '//staging-res.jayride.com/web/dotcom/vehicle/370x300/car-economy-sedan.png',
          'https://jayride-testing.imgix.net/3/3e5c5dea-7a7b-4cef-a9df-7e165d822a2a.jpg?fit=crop&w=370&h=300',
          'https://jayride-testing.imgix.net/9/9ad1aeb5-fc27-43c8-a03d-305dc9599f98.jpg?fit=crop&w=370&h=300',
          'https://jayride-testing.imgix.net/3/385d4ddf-c573-458f-9e52-1ef211f143b6.jpg?fit=crop&w=370&h=300',
          'https://jayride-testing.imgix.net/2/266e1916-7ed3-4075-9386-5aa96718fbbe.jpg?fit=crop&w=370&h=300',
        ],
        vehicle_type: 'sedan',
        service_class: 'economy',
        min_pax: 1,
        max_pax: 2,
        supplier: {
          description:
            'Our services are 100% guaranteed, we guarantee the best service and best price. Take a look at our fleet, compare our prices with our international competitors and decide for yourself',
          id: '134983',
          name: 'Rozana Car Rental ',
          photo_url:
            'https://jayride-testing.imgix.net/4/411c71be-f8b9-4be4-b979-d744c44ce873.jpg?fit=crop&w=180&h=180',
        },
        type: 'private',
      },
      status: 'price-estimated',
    },
    quote_request_id: '617a32ab-c6ba-4199-a1f9-0e0dfeee2476',
    message: null,
    status: 'ok',
  },
};
