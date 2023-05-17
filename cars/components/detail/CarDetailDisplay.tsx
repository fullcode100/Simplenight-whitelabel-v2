/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef } from 'react';
import classnames from 'classnames';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { useTranslation } from 'react-i18next';
import CarItineraryDetail from './CarItineraryDetail';
import CarLocationDetail from './CarLocationDetail';
import LocationInfo from '../LocationInfo/LocationInfo';
import { Paragraph } from '@simplenight/ui';
import CalendarInfo from '../CalendarInfo/CalendarInfo';
import CarFeatures from './CarFeatures';
import { Car } from 'cars/types/response/CarSearchResponse';
import { useRouter } from 'next/router';
import { useCarsStore } from 'hooks/cars/useCarsStore';
import Divider from 'components/global/Divider/Divider';
import Calendar from 'public/icons/assets/calendar.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import PoliciesIcon from '../../../public/icons/assets/policies.svg';

import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import CheckIcon from 'public/icons/assets/check.svg';

import InlineFeature from 'components/global/InlineFeature/InlineFeature';
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

const PoliciesSection = () => {
  return (
    <div className="flex flex-col gap-3 px-5 py-6 lg:px-0 lg:pl-12 lg:py-12">
      <Divider className="py-3 lg:py-4" />
    </div>
  );
};

const CarDetailDisplay = ({ Category }: CarDetailDisplayProps) => {
  const [t, i18n] = useTranslation('cars');
  const router = useRouter();
  const toLabel = t('to', 'to');
  const policiesRef = useRef<HTMLDivElement>(null);

  const policiesLabel = t('policies', 'Policies');

  const car = useCarsStore((state) => state.car);
  console.log('Car data selected:', car);

  const coordinates = {
    latitude: car?.remarks
      ? parseFloat(car?.remarks.split(',')[0])
      : ('' as unknown as number),
    longitude: car?.remarks
      ? parseFloat(car?.remarks.split(',')[1])
      : ('' as unknown as number),
  };

  const goCheckout = () => {
    router.push('/checkout/car-rental', undefined, { shallow: true });
  };
  const DatesSection = () => (
    <div className="flex items-center">
      <Calendar className="text-primary-1000 h-4 w-4 mr-2" />
      <section className="flex items-center">
        <span className="capitalize">{fromLowerCaseToCapitilize(toLabel)}</span>
        <span className="mx-1">{toLabel}</span>
        <span className="capitalize">{fromLowerCaseToCapitilize(toLabel)}</span>
      </section>
    </div>
  );

  return (
    <div className={classnames('relative grid lg:grid-cols-4 grid-cols-3')}>
      <main className="h-full col-span-3">
        <section className="mx-auto lg:gap-12 lg:grid lg:grid-cols-2 max-w-7xl py-8">
          <section className="flex justify-center  pl-8">
            <div className="w-full md:w-1/2 mb-4 mr-4 md:mb-0">
              <img
                src={car?.picture_url}
                alt={car?.company_short_name}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
          <section className="flex ">
            <div className="w-full  md:pl-8">
              <h2 className="text-3xl font-bold mb-2">
                {car?.company_short_name}
              </h2>
              <p className="text-gray-500 mb-4">{car?.car_model}</p>
              <DatesSection />
              <div className="flex items-center">
                <LocationPin className="text-primary-1000 h-4 w-4 mr-2.5 mt-1" />
                <section className="flex items-center mt-1">
                  <p className="text-gray-600">{car?.address_line}</p>
                </section>
              </div>
            </div>
          </section>
        </section>
        <Divider className="lg:hidden" />
        <section className="flex justify-center border-dark-300 border-y-2">
          <section className="lg:max-w-[904px] lg:px-0 px-4 w-full py-8 relative">
            <CarFeatures item={data} />
          </section>
        </section>
        <section className="mx-auto divide-dark-300 lg:gap-12 lg:grid lg:grid-cols-2 lg:divide-x max-w-7xl">
          <section className="flex justify-center border-b-2 border-dark-300 pl-8">
            <section className="max-w-[904px] w-full flex flex-col lg:px-0 px-4">
              <div
                ref={policiesRef}
                className="flex flex-col gap-3 px-5 py-6 lg:px-0 lg:pl-12 lg:py-12"
              >
                <SectionTitle title={policiesLabel} icon={<PoliciesIcon />} />
                <div className="flex justify-center">
                  <div className="w-85">
                    <div className="bg-teal-100 rounded-sm p-8">
                      <label className="flex items-center mb-2">
                        <input type="checkbox" className="form-checkbox mr-2" />
                        Protect My Car Rental for $20.00
                      </label>
                      <div className="ml-4">
                        <div className="flex items-center mb-2 text-green-1000">
                          <InlineFeature
                            icon={
                              <CheckIcon className="w-3 h-3 text-green-1000" />
                            }
                            text={
                              'Covers your rental car from collision damage, theft and vandalism'
                            }
                            textClassName="text-green-1000"
                          />
                        </div>
                        <div className="flex items-center mb-2 text-green-1000">
                          <InlineFeature
                            icon={
                              <CheckIcon className="w-3 h-3 text-green-1000" />
                            }
                            text={
                              'Up to $35,000 in primary coverage with $0 deductible'
                            }
                            textClassName="text-green-1000"
                          />
                        </div>
                        {/* <a href="#" className="underline mb-2 text-sm">
                          Policy of Insurance and
                          agree to the Terms and Conditions of the insurance
                          coverage provided.
                        </a> */}
                        <p>
                          <span className="mb-2 text-base">
                            I have read and understand the
                            <a
                              href="#"
                              className="text-primary-1000 underline cursor-pointer"
                            >
                              {' '}
                              Policy of Insurance{' '}
                            </a>
                            and agree to the Terms and Conditions of the
                            insurance coverage provided.
                          </span>
                        </p>
                        <hr className="my-4" />
                        <p className="leading-snug">
                          Coverage offered by [COMPANY].
                        </p>
                        <p className="leading-snug">
                          Full disclaimer and{' '}
                          <a
                            href="#"
                            className="text-primary-1000 underline cursor-pointer"
                          >
                            Privacy Policy{' '}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 rounded-sm  w-full flex flex-row my-2">
                  <CheckIcon className="w-5 h-5 text-green-1000 my-2 ml-2" />

                  <Paragraph size="medium" textColor={'text-green-1000  px-4'}>
                    Free Cancellation Until Feb 24 2022 11:59 PM EST (00:59 AM
                    GMT-3). A $20 Fee Will Apply Thereafter.
                  </Paragraph>
                </div>
                <a
                  href="#"
                  className="text-primary-1000 underline cursor-pointer text-xl"
                >
                  View rules and restrictions
                </a>
              </div>
            </section>
          </section>
          <Divider className="lg:hidden" />
          <section className="flex justify-center border-b-2 border-dark-300 pl-8">
            <section className="max-w-[904px] w-full flex flex-col lg:px-0 px-4">
              <CarLocationDetail
                lat={coordinates.latitude}
                long={coordinates.longitude}
              />
              <img
                src={car?.company_picture.svg_url}
                alt={car?.company_short_name}
                className="h-[36px] w-[90px] my-2"
              />
              <section className="flex justify-between mb-12">
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
                  <LocationInfo address={car?.address_line} compact />
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
                  <LocationInfo address={car?.address_line} compact />
                </section>
              </section>
            </section>
          </section>
        </section>
      </main>
      {car?.car_model && (
        <CarItineraryDetail
          name={car?.car_model}
          rate={car?.rate}
          handleAction={goCheckout}
        />
      )}
    </div>
  );
};

export default CarDetailDisplay;
