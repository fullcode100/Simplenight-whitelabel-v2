/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import classnames from 'classnames';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { useTranslation } from 'react-i18next';
import CarItineraryDetail from './CarItineraryDetail';
import CarLocationDetail from './CarLocationDetail';
import CarCustomerReviews from './CarCustomerReviews';
import LocationInfo from '../LocationInfo/LocationInfo';
import { Paragraph } from '@simplenight/ui';
import CalendarInfo from '../CalendarInfo/CalendarInfo';
import CarFeatures from './CarFeatures';
import { Car } from 'cars/types/response/CarSearchResponse';
import { useRouter } from 'next/router';
import { useCarsStore } from 'hooks/cars/useCarsStore';

type CarDetailDisplayProps = CategoryPageComponentProps;

const data: Car = {
  company_short_name: 'NATIONAL',
  remarks: '40.6915000,-74.1890300',
  address_line: '25 NEWARK AIRPORT BLDG 25, NEWARK, 07114 3707, NJ, New Jersey',
  company_picture: {
    png_url: 'https://ctimg-supplier.cartrawler.com/national.pdf',
    svg_url: 'https://ctimg-svg.cartrawler.com/supplier-images/national.svg',
  },
  availability_status: 'Available',
  car_model: 'Nissan Frontier or similar',
  picture_url: 'https://ctimg-fleet.cartrawler.com/nissan/frontier/primary.png',
  rate: {
    totalAmount: '138.50',
    estimatedTotalAmount: '138.50',
    currencyCode: 'USD',
  },
  fuel_policy: 'Unspecified',
  transmission_type: 'Automatic',
  passenger_quantity: '4',
  baggage_quantity: '3',
  door_count: '4',
  air_condition_ind: true,
};

const reviews = [
  {
    rating: 5,
    text: 'The food is top notch and the drinks are fabulously good. I strongly recommend that if',
    timestamp: '2023-03-24 07:48:53',
    user: {
      name: 'Raul A.',
      image: null,
    },
  },
  {
    rating: 5,
    text: 'Another YELP gem.  Never would have found this tiny hidden spot otherwise and glad I did. \n\nThe duck was fantastic as were the cocktails. Small place with a...',
    timestamp: '2023-05-04 15:33:37',
    user: {
      name: 'Jim P.',
      image:
        'https://s3-media3.fl.yelpcdn.com/photo/CnjUbITePOr5JaIo61xndw/o.jpg',
    },
  },
  {
    rating: 4,
    text: 'Midtown is full of touristy serviceable options.  Buena Vista is a pleasant exception: easy to get to and actually great.  \n\nThe service was terrific, and...',
    timestamp: '2023-04-23 10:08:58',
    user: {
      name: 'C L.',
      image:
        'https://s3-media2.fl.yelpcdn.com/photo/RA03TM_mPK7rOKgKQT4mxQ/o.jpg',
    },
  },
];

const CarDetailDisplay = ({ Category }: CarDetailDisplayProps) => {
  const [t, i18n] = useTranslation('cars');
  const router = useRouter();

  const car = useCarsStore((state) => state.car);
  console.log('Car data selected:', car);

  const coordinates = {
    latitude: parseFloat(data.remarks.split(',')[0]),
    longitude: parseFloat(data.remarks.split(',')[1]),
  };

  const goCheckout = () => {
    router.push('/checkout/car-rental', undefined, { shallow: true });
  };

  return (
    <div className={classnames('relative grid lg:grid-cols-4 grid-cols-3')}>
      <main className="h-full col-span-3">
        <section>
          {/* <GeneralInformationSection
            name={data.name}
            rating={data.rating}
            reviewsLength={data.review_count}
          /> */}
        </section>
        <section className="flex justify-center border-dark-300 border-y-2">
          <section className="lg:max-w-[904px] lg:px-0 px-4 w-full py-8 relative">
            <CarFeatures item={data} />
          </section>
        </section>
        <section className="flex justify-center border-b-2 border-dark-300">
          <section className="max-w-[904px] w-full flex flex-col lg:px-0 px-4">
            <CarLocationDetail
              lat={coordinates.latitude}
              long={coordinates.longitude}
            />
            <section className="flex justify-between mb-12">
              <img
                src={data.company_picture.svg_url}
                alt={data.company_short_name}
                className="h-[36px]"
              />
              <section className="flex flex-col gap-3">
                <Paragraph
                  size="large"
                  fontWeight="semibold"
                  textColor="text-dark-800"
                >
                  Pick Up
                </Paragraph>
                <CalendarInfo
                  date="Mar 25, 2022"
                  time="11:00 AM to 6:00 PM"
                  compact
                />
                <LocationInfo address={data.address_line} compact />
              </section>
              <section className="flex flex-col gap-3">
                <Paragraph
                  size="large"
                  fontWeight="semibold"
                  textColor="text-dark-800"
                >
                  Drop Off
                </Paragraph>
                <CalendarInfo
                  date="Mar 25, 2022"
                  time="11:00 AM to 6:00 PM"
                  compact
                />
                <LocationInfo address={data.address_line} compact />
              </section>
            </section>
          </section>
        </section>
        <section className="flex justify-center mt-12">
          <section className="max-w-[904px] w-full lg:px-0 px-4">
            <CarCustomerReviews rating={4.5} reviews={reviews} />
          </section>
        </section>
      </main>
      <CarItineraryDetail name={data.car_model} handleAction={goCheckout} />
    </div>
  );
};

export default CarDetailDisplay;
