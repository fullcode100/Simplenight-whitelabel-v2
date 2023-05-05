import Button from 'components/global/Button/Button';
import Rating from 'components/global/Rating/Rating';
import { formatAsDisplayHour, formatAsSearchDate } from 'helpers/dajjsUtils';
import {
  fromLowerCaseToCapitilize,
  getChildrenAges,
  parseQueryNumber,
} from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useSearchQueries } from 'cars/hooks/useSearchQueries';
import initialState from './utils/initialState';
import { CarDetailPreRequest } from 'cars/types/request/CarDetailRequest';
import {
  CarDetailResponse,
  Occupancy,
} from 'cars/types/response/CarDetailResponse';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';

import CalendarIcon from 'public/icons/assets/calendar.svg';
import ClockIcon from 'public/icons/assets/clock.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import CheckRoomAvailability from 'cars/components/CheckRoomAvailability/CheckRoomAvailability';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import LocationSection from '../location/LocationSection';
import SeeMore from 'components/global/ReadMore/SeeMore';
import RoomsSection from 'cars/components/Rooms/RoomsSection';
import Divider from '../../../components/global/Divider/Divider';
import CustomerReviewsSection from 'components/global/CustomerReviews/CustomerReviewsSection';
import { Car2, CarSearchResponse2 } from 'cars/types/response/SearchResponse';
import dayjs from 'dayjs';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import InformationIcon from 'public/icons/assets/information.svg';
import PoliciesIcon from 'public/icons/assets/policies.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import PassengersIcon from 'public/icons/assets/cars/passengers.svg';
import BaggageIcon from 'public/icons/assets/cars/baggage.svg';
import TransmissionIcon from 'public/icons/assets/cars/transmission.svg';
import FuelIcon from 'public/icons/assets/cars/fuel.svg';
import SizeIcon from 'public/icons/assets/cars/size.svg';
import LocationIcon from 'public/icons/assets/cars/location.svg';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import BlockDivider from 'components/global/Divider/BlockDivider';
import ImageCarouselLargeScreen from 'components/global/CarouselNew/ImageCarouselLargeScreen';
import { EmptyState } from '@simplenight/ui';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import CarRoomAvailabilityForm from '../search/CarRoomAvailabilityForm';
import RoomSectionTitle from '../Rooms/components/RoomsSectionTitle';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { createRoom } from 'cars/helpers/room';
import { getReferral } from '../../helpers/getReferral';
import useCookies from 'hooks/localStorage/useCookies';
import Script from 'next/script';

type CarDetailDisplayProps = CategoryPageComponentProps;

declare let window: CustomWindow;

const CarDetailDisplay = ({ Category }: CarDetailDisplayProps) => {
  const params = useQuery();
  console.log(
    '🚀 ~ file: CarDetailDisplay.tsx:59 ~ CarDetailDisplay ~ params:',
    params,
  );
  const { id, roomsData } = params;
  const referralParam = params.referral as string;
  const { setCookie } = useCookies();

  const {
    adults,
    children,
    startDate,
    searchEndDate,
    searchStartDate,
    endDate,
    rooms,
    ADULT_TEXT,
    CHILDREN_TEXT,
    ROOMS_TEXT,
  } = useSearchQueries();

  useEffect(() => {
    const referral = getReferral(referralParam);

    if (referral) {
      const referralData = `${referral}=${id}`;
      setCookie('referral', referralData, {
        path: '/',
        expires: dayjs().add(30, 'day').toDate(),
      });
    }
  }, [referralParam]);

  const roomRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const [displaySeeMore, setDisplaySeeMore] = useState(true);
  const [descriptionHeight, setDescriptionHeight] = useState(232);
  const [loaded, setLoaded] = useState(false);
  const [car, setCar] = useState<Car2>(initialState[0]);
  const [emptyState, setEmptyState] = useState<boolean>(false);

  const {
    details: { name, address, description, star_rating: starRating },
    rooms: carRooms,
    photos,
    nights,
    check_in_instructions: checkInInstructions,
    roomsQty,
  } = car;

  const carImages = photos.map((photo) => photo.url);
  const [tg] = useTranslation('global');
  const [t, i18next] = useTranslation('cars');
  const { language } = i18next;
  const starCarLabel = t('starCar', 'Star Car');
  const roomsLabel = t('rooms', 'Rooms');
  const locationLabel = t('location', 'Location');
  const detailsLabel = t('rentalPolicies', 'Rental Policies');
  const policiesLabel = t('policies', 'Policies');
  const toLabel = tg('to', 'to');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const checkinLabel = t('checkIn', 'Check-In');
  const checkinTimeLabel = t('checkInTime', 'Check-In Time');
  const checkoutLabel = t('checkOut', 'Check-Out');
  const checkoutTimeLabel = t('checkOutTime', 'Check-Out Time');
  const checkinFromLabel = t('from', 'From');
  const checkoutBeforeLabel = t('before', 'Before');

  const storeCurrency = useSelector((state: any) => state.core.currency);
  const [currency, setCurrency] = useState<string>(storeCurrency);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [detailsLabel]);

  // useEffect(() => {
  //   const paramRoomsData = roomsData
  //     ? JSON.parse(roomsData as string)
  //     : [createRoom()];

  //   const occupancy: Occupancy = {
  //     adults: parseQueryNumber(adults ?? '1') + '',
  //     children: parseQueryNumber(children ?? '0') + '',
  //     rooms: parseQueryNumber(rooms ?? '1') + '',
  //   };

  //   if (parseQueryNumber(occupancy.children) > 0) {
  //     occupancy.children_ages = getChildrenAges(paramRoomsData);
  //   }

  //   const params: CarDetailPreRequest = {
  //     car_id: (id as unknown as string) ?? '', // id as string,
  //     start_date: searchStartDate, // (startDate),
  //     end_date: searchEndDate, // (endDate),
  //     occupancy: occupancy,
  //   };

  //   Category.core.ClientDetailer?.request(params, i18next, params.car_id)
  //     .then(({ cars }: CarSearchResponse2) => {
  //       // setCar(cars[0]);
  //       setLoaded(true);
  //       setEmptyState(false);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       setLoaded(true);
  //       setEmptyState(true);
  //     });
  // }, [currency, language]);

  const scrollToRoom = () => {
    if (roomRef.current) {
      roomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocation = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAmeneties = () => {
    if (amenitiesRef.current) {
      amenitiesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const MAPS_API_KEY = 'AIzaSyB_rHUVDeYtUuQ3fEuuBdmfgVnGuXUnVeU';

  // TODO: Refactor
  const Instructions = () => {
    const instructions = `${checkInInstructions?.instructions}
    ${checkInInstructions?.special_instructions}
    ${checkInInstructions?.fees?.mandatory}
    ${checkInInstructions?.fees?.optional}
    `;
    const policies = checkInInstructions?.policies;
    return (
      <>
        {instructions && instructions !== '' && (
          <>
            <br />
            {instructions}
          </>
        )}
        {policies && policies !== '' && (
          <>
            <br />
            {policies}
          </>
        )}
      </>
    );
  };

  const RatingSection = () => (
    <section className="flex items-center justify-between w-full mt-4 lg:justify-start lg:gap-2 lg:mt-0">
      <span className="text-sm font-semibold lg:text-base text-primary-1000">
        <span className="">{starRating}-</span>
        {starCarLabel}
      </span>
      <Rating value={parseInt(starRating)} size={50} />
    </section>
  );

  const GeneralInformationSection = () => {
    /*
    const tabs: Tab[] = [{ value: roomsLabel }, { value: locationLabel }];

    const scrollFunctions: { [key: string]: () => void } = {
      [roomsLabel]: scrollToRoom,
      [locationLabel]: scrollToLocation,
      Amenities: scrollToAmeneties,
    };

    const scrollTo = (tab: string) => {
      const scrollFunction = scrollFunctions[tab];

      if (scrollFunction) scrollFunction();
    };

    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    const handleTabClick = (tab: Tab) => {
      setActiveTab(tab);
      scrollTo(tab.value);
    };

    return (
      <section className="w-screen pt-4 text-dark-1000 bg-dark-100 rounded-t-12 ">
        <section className="px-4 ">
          <p className="text-center h4">{name}</p>
          <RatingSection />
        </section>
        <BlockDivider className="mt-5" />
        <section className="px-4">
          <HorizontalTabs
            tabs={tabs}
            activeTab={activeTab}
            onClick={handleTabClick}
          />
        </section>
      </section>
    );
    */
  };

  const PoliciesSection = () => (
    <section className="px-5 pb-3 space-y-5 lg:pb-0 lg:px-0">
      <section className="mb-5 lg:mb-8">
        <p className="flex items-center gap-3 mb-6">
          <IconRoundedContainer isLarge className="bg-primary-1000">
            <PoliciesIcon className="h-5 w-5 lg:h-[30px] lg:w-[30px]" />
          </IconRoundedContainer>
          <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {policiesLabel}
          </span>
        </p>
      </section>
      <section className="space-y-3">
        <h5 className="font-semibold text-dark-800">{checkinLabel}</h5>
        <section className="flex flex-row gap-2">
          <ClockIcon className="w-5 mt-1 lg:mt-0 text-primary-1000" />
          <section className="font-semibold text-sm leading-lg lg:leading-[22px] space-y-1">
            <p className="text-dark-800">{checkinTimeLabel}</p>
            <p className="text-dark-1000">
              {`${checkinFromLabel} ${formatAsDisplayHour(
                car.details.checkin_time,
              )}`}
            </p>
          </section>
        </section>
      </section>
      <div>
        <div className="w-full h-px bg-dark-300" />
      </div>
      <section className="space-y-3">
        <h5 className="font-semibold text-dark-800">{checkoutLabel}</h5>
        <section className="flex flex-row gap-2">
          <ClockIcon className="w-5 mt-1 lg:mt-0 text-primary-1000" />
          <section className="font-semibold text-sm leading-lg lg:leading-[22px] space-y-1">
            <p className="text-dark-800">{checkoutTimeLabel}</p>
            <p className="text-dark-1000">
              {`${checkoutBeforeLabel} ${formatAsDisplayHour(
                car.details.checkout_time,
              )}`}
            </p>
          </section>
        </section>
      </section>
    </section>
  );

  const DetailsSection = () => (
    <section className="px-5 pt-6 pb-3 lg:pt-0 lg:pb-0 lg:px-0">
      <section className="mb-5 lg:mb-8">
        <p className="flex items-center gap-3 mb-6">
          <IconRoundedContainer isLarge className="bg-primary-1000">
            <InformationIcon className="h-5 w-5 lg:h-[30px] lg:w-[30px]" />
          </IconRoundedContainer>
          <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {detailsLabel}
          </span>
        </p>
      </section>
      <section ref={roomRef} className="lg:hidden">
        <SeeMore
          textOpened="See less"
          textClosed="See more"
          heightInPixels={descriptionHeight}
          displayButton={displaySeeMore}
        >
          <p
            ref={(desc) => {
              if (desc && desc?.clientHeight < 232) {
                setDisplaySeeMore(false);
                setDescriptionHeight(0);
              }
            }}
            className="mt-3 text-base text-dark-1000"
          >
            {description}
            <Instructions />
          </p>
        </SeeMore>
      </section>
      <section className="hidden lg:block">
        <p className="mt-3 text-base text-dark-1000">
          {description}
          <Instructions />
        </p>
      </section>
    </section>
  );

  const [openCheckRoom, setOpenCheckRoom] = useState<boolean>(false);

  const handleOpenCheckRoom = () => {
    setOpenCheckRoom(true);
  };

  const AdultsChildrenRooms = () => (
    <>
      <span>
        {adults ?? '-'} {ADULT_TEXT}, {children ?? '-'} {CHILDREN_TEXT}
      </span>
      <span className="mx-4 text-dark-200">|</span>
      <span>
        {rooms ?? '-'} {ROOM_TEXT}
      </span>
    </>
  );

  const adultsNumber = parseInt((adults && adults[0]) || '0');
  const childrenNumber = parseInt((children && children[0]) || '0');
  const guests = adultsNumber + childrenNumber;
  const tGuest = tg('guest', 'Guest');
  const tGuests = tg('guests', 'Guests');
  const GUEST_TEXT = usePlural(guests, tGuest, tGuests);
  const tRoom = tg('room', 'Room');
  const tRooms = tg('rooms', 'Rooms');
  const ROOM_TEXT = usePlural(
    parseInt((rooms && rooms[0]) || '0'),
    tRoom,
    tRooms,
  );

  const DatesSection = () => (
    <div className="flex items-center">
      <Calendar className="text-primary-1000 h-4 w-4 mr-2" />
      <section className="flex items-center">
        <span className="capitalize">
          {fromLowerCaseToCapitilize(startDate)}
        </span>
        <span className="mx-1">{toLabel}</span>
        <span className="capitalize">{fromLowerCaseToCapitilize(endDate)}</span>
      </section>
    </div>
  );

  const VerticalDivider = () => (
    <div className="px-2">
      <div className="h-6 border-l border-dark-200" />
    </div>
  );

  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      <span>{guests ?? ' - '} </span>
      <span>{GUEST_TEXT} </span>
      <VerticalDivider />
      <span>{rooms ?? ' - '}</span>
      <span>{ROOM_TEXT}</span>
    </section>
  );

  const OccupancyAndDatesSection = () => (
    <section className="grid gap-2 text-sm font-lato text-dark-1000">
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <CalendarIcon className="text-primary-1000" />
        </section>
        <DatesSection />
      </section>
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <MultiplePersonsIcon className="text-primary-1000" />
        </section>
        <OccupancySection />
      </section>
    </section>
  );

  return (
    <>
      {/* <CheckRoomAvailability open={openCheckRoom} setOpen={setOpenCheckRoom} /> */}

      {true && (
        <main className="relative">
          {/* <ImagesSection /> */}
          <section className="lg:px-20 lg:py-12">
            <div className="flex flex-col md:flex-row items-center  p-8">
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <img
                  src="https://ctimg-fleet.cartrawler.com/chevrolet/tahoe/primary.png"
                  alt="Your Image"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-bold mb-2">Midsize SUV</h2>
                <p className="text-gray-500 mb-4">Jeep Compass or similar</p>
                <DatesSection />
                <div className="flex items-center">
                  <LocationPin className="text-primary-1000 h-4 w-4 mr-2.5" />
                  <section className="flex items-center">
                    <p className="text-gray-600">31 26 Queens Blvd US</p>
                  </section>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="hidden px-20 lg:block">
            <section className="mx-auto max-w-7xl">
              <RoomsSection
                rooms={carRooms}
                carId={car.id}
                carName={name}
                nights={nights}
                guests={guests}
                roomsQty={roomsQty}
              />
            </section>
          </section> */}
          <Divider />

          <div className="flex flex-wrap justify-between max-w-7xl mx-auto py-10">
            <div className="w-16 h-16 flex items-center justify-center">
              <LocationIcon className="text-primary-1000 h-8 w-8 lg:h-[30px] lg:w-[30px]" />
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <SizeIcon className="text-primary-1000 h-8 w-8 lg:h-[30px] lg:w-[30px]" />
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <BaggageIcon className="text-primary-1000 h-8 w-8 lg:h-[30px] lg:w-[30px]" />
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <PassengersIcon className="text-primary-1000 h-8 w-8 lg:h-[30px] lg:w-[30px]" />
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <TransmissionIcon className="text-primary-1000 h-8 w-8 lg:h-[30px] lg:w-[30px]" />
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <FuelIcon className="text-primary-1000 h-8 w-8 lg:h-[30px] lg:w-[30px]" />
            </div>
          </div>
          <Divider />

          <section className="lg:px-20 lg:py-12">
            <section className="mx-auto divide-y divide-dark-300 lg:divide-y-0 lg:divide-x lg:flex max-w-7xl">
              <section className="lg:w-[50%] lg:pr-12">
                <DetailsSection />
                <div className="my-6">
                  <div className="w-full h-px bg-dark-300" />
                </div>
                <PoliciesSection />
              </section>
              <section
                ref={locationRef}
                className="lg:w-[50%] lg:flex-1 lg:pl-12"
              >
                <LocationSection address={address} />
              </section>
            </section>
          </section>
          <Divider />
          {/* It is not yet applicable but I have left the desktop styles configured for when it is to be used */}
          {/* <section className="lg:px-20 lg:py-8">
            <CustomerReviewsSection />
          </section> */}
        </main>
      )}
      {/* {!loaded && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )} */}
    </>
  );
};

export default CarDetailDisplay;
