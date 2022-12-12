import Button from 'components/global/Button/Button';
import Rating from 'components/global/Rating/Rating';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useSearchQueries } from 'flights/hooks/useSearchQueries';
import initialState from './utils/initialState';
import { FlightDetailPreRequest } from 'flights/types/request/FlightDetailRequest';
import {
  FlightDetailResponse,
  Occupancy,
} from 'flights/types/response/FlightDetailResponse';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';

import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import CheckRoomAvailability from 'flights/components/CheckRoomAvailability/CheckRoomAvailability';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import LocationSection from '../location/LocationSection';
import SeeMore from 'components/global/ReadMore/SeeMore';
import RoomsSection from 'flights/components/Rooms/RoomsSection';
import Divider from '../../../components/global/Divider/Divider';
import CustomerReviewsSection from 'components/global/CustomerReviews/CustomerReviewsSection';
import {
  Flight2,
  FlightSearchResponse2,
} from 'flights/types/response/SearchResponse';
import dayjs from 'dayjs';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import InformationIcon from 'public/icons/assets/information.svg';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import BlockDivider from 'components/global/Divider/BlockDivider';
import ImageCarouselLargeScreen from 'components/global/CarouselNew/ImageCarouselLargeScreen';
import EmptyState from 'components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import FlightRoomAvailabilityForm from '../search/FlightRoomAvailabilityForm';
import RoomSectionTitle from '../Rooms/components/RoomsSectionTitle';

type FlightDetailDisplayProps = CategoryPageComponentProps;

declare let window: CustomWindow;

const FlightDetailDisplay = ({ Category }: FlightDetailDisplayProps) => {
  const { id } = useQuery();

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

  const roomRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  const [displaySeeMore, setDisplaySeeMore] = useState(true);
  const [descriptionHeight, setDescriptionHeight] = useState(232);
  const [loaded, setLoaded] = useState(false);
  const [flight, setFlight] = useState<Flight2>(initialState[0]);
  const [emptyState, setEmptyState] = useState<boolean>(false);
  const {
    details: { name, address, description, star_rating: starRating },
    rooms: flightRooms,
    photos,
    nights,
  } = flight;

  const flightImages = photos.map((photo) => photo.url);
  const [tg] = useTranslation('global');
  const [t, i18next] = useTranslation('flights');
  const { language } = i18next;
  const starFlightLabel = t('starFlight', 'Star Flight');
  const roomsLabel = t('rooms', 'Rooms');
  const locationLabel = t('location', 'Location');
  const detailsLabel = t('details', 'Details');
  const toLabel = tg('to', 'to');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');

  const storeCurrency = useSelector((state: any) => state.core.currency);
  const [currency, setCurrency] = useState<string>(storeCurrency);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    console.log(detailsLabel);
  }, [detailsLabel]);

  useEffect(() => {
    const occupancy: Occupancy = {
      adults: parseQueryNumber(adults ?? '1') + '',
      children: parseQueryNumber(children ?? '0') + '',
      rooms: parseQueryNumber(rooms ?? '1') + '',
    };

    const params: FlightDetailPreRequest = {
      flight_id: (id as unknown as string) ?? '', // id as string,
      start_date: searchStartDate, // (startDate),
      end_date: searchEndDate, // (endDate),
      occupancy: occupancy,
    };

    Category.core.ClientDetailer?.request(params, i18next, params.flight_id)
      .then(({ flights }: FlightSearchResponse2) => {
        setFlight(flights[0]);
        setLoaded(true);
        setEmptyState(false);
      })
      .catch((e) => {
        console.error(e);
        setLoaded(true);
        setEmptyState(true);
      });
  }, [currency, language]);

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

  const RatingSection = () => (
    <section className="flex mt-4 w-full justify-between items-center lg:justify-start lg:gap-2 lg:mt-0">
      <span className="text-sm lg:text-base text-primary-1000 font-semibold">
        <span className="">{starRating}-</span>
        {starFlightLabel}
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

    const handleTabClick = (tab: Tab, setActiveTab: (tab: Tab) => void) => {
      setActiveTab(tab);
      scrollTo(tab.value);
    };

    return (
      <section className="text-dark-1000 bg-dark-100 w-screen rounded-t-12 pt-4 ">
        <section className=" px-4">
          <p className="h4 text-center">{name}</p>
          <RatingSection />
        </section>
        <BlockDivider className="mt-5" />
        <section className="px-4">
        </section>
      </section>
    );
    */
  };

  const DetailsSection = () => (
    <section className="pt-6 pb-3 px-5 lg:pt-0 lg:pb-0 lg:px-0">
      <section className="mb-5 lg:mb-8">
        <p className="flex items-center gap-3 mb-6">
          <IconRoundedContainer className="bg-primary-1000">
            <InformationIcon className="h-5 w-5 lg:h-[30px] lg:w-[30px]" />
          </IconRoundedContainer>
          <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {detailsLabel}
          </span>
        </p>
      </section>
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
          className="text-base text-dark-1000 mt-3"
        >
          {description}
        </p>
      </SeeMore>
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
      <span className="text-dark-200 mx-4">|</span>
      <span>
        {rooms ?? '-'} {ROOMS_TEXT}
      </span>
    </>
  );

  const adultsNumber = parseInt((adults && adults[0]) || '0');
  const childrenNumber = parseInt((children && children[0]) || '0');
  const guests = adultsNumber + childrenNumber;
  const tGuest = tg('guest', 'Guest');
  const tGuests = tg('guests', 'Guests');
  const GUEST_TEXT = guests === 1 ? tGuest : tGuests;

  const DatesSection = () => (
    <section>
      <span>{startDate}</span>
      <span> {toLabel} </span>
      <span>{endDate}</span>
    </section>
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
      <span>{ROOMS_TEXT}</span>
    </section>
  );

  const OccupancyAndDatesSection = () => (
    <section className="grid gap-2 font-lato text-sm text-dark-1000">
      <section className="flex gap-2">
        <section className="w-6 grid place-items-center">
          <CalendarIcon className="text-primary-1000" />
        </section>
        <DatesSection />
      </section>
      <section className="flex gap-2">
        <section className="w-6 grid place-items-center">
          <MultiplePersonsIcon className="text-primary-1000" />
        </section>
        <OccupancySection />
      </section>
    </section>
  );

  return (
    <>
      <CheckRoomAvailability open={openCheckRoom} setOpen={setOpenCheckRoom} />
      <header className="flex flex-col w-full px-4 pt-3.5 pb-4 bg-dark-100 sticky top-12 z-10 lg:hidden">
        <section className="h-12 flex justify-between items-center">
          <OccupancyAndDatesSection />
          <section>
            <Button
              value="Edit"
              translationKey="edit"
              type="contained"
              className="h-9 text-sm w-20 font-normal"
              size="full"
              onClick={handleOpenCheckRoom}
            />
          </section>
        </section>
      </header>
      {loaded && emptyState && (
        <>
          <section className="px-20 hidden lg:block pt-12">
            <RoomSectionTitle />
            <section className=" bg-dark-100 p-4 rounded-md my-8">
              <FlightRoomAvailabilityForm />
            </section>
          </section>
          <EmptyState
            text={noResultsLabel}
            image={<EmptyStateIcon className="mx-auto" />}
          />
        </>
      )}
      {loaded && !emptyState && (
        <main className="relative">
          {/* <ImagesSection /> */}
          <section className="lg:hidden">
            <ImageCarousel images={flightImages} title={name} />
          </section>
          <section className="hidden lg:block w-full pt-16 bg-dark-100">
            <ImageCarouselLargeScreen images={flightImages} title={name} />
          </section>
          <section className="lg:hidden">
            {/* <GeneralInformationSection /> */}
          </section>
          <section className="hidden lg:block px-20 text-left bg-dark-100 py-6">
            <p className="text-[2rem]">{name}</p>
            <RatingSection />
          </section>
          <section ref={roomRef} className="lg:hidden">
            <SeeMore
              textOpened="See less"
              textClosed="See more"
              heightInPixels={flightRooms.length > 4 ? 2800 : 0}
              displayButton={flightRooms.length > 4}
            >
              {
                <RoomsSection
                  rooms={flightRooms}
                  flightId={flight.id}
                  flightName={name}
                  nights={nights}
                  guests={guests}
                />
              }
            </SeeMore>
          </section>
          <section className="hidden lg:block px-20">
            <RoomsSection
              rooms={flightRooms}
              flightId={flight.id}
              flightName={name}
              nights={nights}
              guests={guests}
            />
          </section>
          <Divider />
          <section className="divide-dark-300 divide-y lg:divide-y-0 lg:divide-x lg:flex lg:px-20 lg:py-12">
            <section className="lg:w-[50%] lg:pr-12">
              <DetailsSection />
            </section>
            <section
              ref={locationRef}
              className="lg:w-[50%] lg:flex-1 lg:pl-12"
            >
              <LocationSection address={address} />
            </section>
          </section>
          <Divider />
          {/* It is not yet applicable but I have left the desktop styles configured for when it is to be used */}
          {/* <section className="lg:px-20 lg:py-8">
            <CustomerReviewsSection />
          </section> */}
        </main>
      )}
      {!loaded && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};

export default FlightDetailDisplay;
