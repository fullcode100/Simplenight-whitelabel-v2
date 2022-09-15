import Button from 'components/global/Button/Button';
import Rating from 'components/global/Rating/Rating';
import { formatAsDisplayHour, formatAsSearchDate } from 'helpers/dajjsUtils';
import {
  fromLowerCaseToCapitilize,
  getChildrenAges,
  parseQueryNumber,
} from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import initialState from './utils/initialState';
import { HotelDetailPreRequest } from 'hotels/types/request/HotelDetailRequest';
import {
  HotelDetailResponse,
  Occupancy,
} from 'hotels/types/response/HotelDetailResponse';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';

import CalendarIcon from 'public/icons/assets/calendar.svg';
import ClockIcon from 'public/icons/assets/clock.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import CheckRoomAvailability from 'hotels/components/CheckRoomAvailability/CheckRoomAvailability';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import LocationSection from '../location/LocationSection';
import SeeMore from 'components/global/ReadMore/SeeMore';
import RoomsSection from 'hotels/components/Rooms/RoomsSection';
import Divider from '../../../components/global/Divider/Divider';
import CustomerReviewsSection from 'components/global/CustomerReviews/CustomerReviewsSection';
import {
  Hotel,
  HotelSearchResponse,
} from 'hotels/types/response/SearchResponse';
import dayjs from 'dayjs';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import InformationIcon from 'public/icons/assets/information.svg';
import PoliciesIcon from 'public/icons/assets/policies.svg';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import BlockDivider from 'components/global/Divider/BlockDivider';
import ImageCarouselLargeScreen from 'components/global/CarouselNew/ImageCarouselLargeScreen';
import EmptyState from 'components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import HotelRoomAvailabilityForm from '../search/HotelRoomAvailabilityForm';
import RoomSectionTitle from '../Rooms/components/RoomsSectionTitle';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { createRoom } from 'hotels/helpers/room';
import { getReferral } from '../../helpers/getReferral';
import useCookies from 'hooks/localStorage/useCookies';

type HotelDetailDisplayProps = CategoryPageComponentProps;

declare let window: CustomWindow;

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
  const params = useQuery();
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
      localStorage.setItem('referral', referral);
      setCookie('referral', referral, {
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
  const [hotel, setHotel] = useState<Hotel>(initialState[0]);
  const [emptyState, setEmptyState] = useState<boolean>(false);

  const {
    details: { name, address, description, star_rating: starRating },
    rooms: hotelRooms,
    photos,
    nights,
    check_in_instructions: checkInInstructions,
  } = hotel;

  const hotelImages = photos.map((photo) => photo.url);
  const [tg] = useTranslation('global');
  const [t, i18next] = useTranslation('hotels');
  const { language } = i18next;
  const starHotelLabel = t('starHotel', 'Star Hotel');
  const roomsLabel = t('rooms', 'Rooms');
  const locationLabel = t('location', 'Location');
  const detailsLabel = t('details', 'Details');
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

  useEffect(() => {
    const paramRoomsData = roomsData
      ? JSON.parse(roomsData as string)
      : [createRoom()];

    const occupancy: Occupancy = {
      adults: parseQueryNumber(adults ?? '1') + '',
      children: parseQueryNumber(children ?? '0') + '',
      rooms: parseQueryNumber(rooms ?? '1') + '',
    };

    if (parseQueryNumber(occupancy.children) > 0) {
      occupancy.children_ages = getChildrenAges(paramRoomsData);
    }

    const params: HotelDetailPreRequest = {
      hotel_id: (id as unknown as string) ?? '', // id as string,
      start_date: searchStartDate, // (startDate),
      end_date: searchEndDate, // (endDate),
      occupancy: occupancy,
    };

    Category.core.ClientDetailer?.request(params, i18next, params.hotel_id)
      .then(({ hotels }: HotelSearchResponse) => {
        setHotel(hotels[0]);
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
        {starHotelLabel}
      </span>
      <Rating value={parseInt(starRating)} size={50} />
    </section>
  );

  const GeneralInformationSection = () => {
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
  };

  const PoliciesSection = () => (
    <section className="px-5 pb-3 lg:pb-0 lg:px-0 space-y-5">
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
        <h5 className="text-dark-800 font-semibold">{checkinLabel}</h5>
        <section className="flex flex-row gap-2">
          <ClockIcon className="w-5 mt-1 lg:mt-0 text-primary-1000" />
          <section className="font-semibold text-sm leading-lg lg:leading-[22px] space-y-1">
            <p className="text-dark-800">{checkinTimeLabel}</p>
            <p className="text-dark-1000">
              {`${checkinFromLabel} ${formatAsDisplayHour(
                hotel.details.checkin_time,
              )}`}
            </p>
          </section>
        </section>
      </section>
      <div>
        <div className="w-full h-px bg-dark-300" />
      </div>
      <section className="space-y-3">
        <h5 className="text-dark-800 font-semibold">{checkoutLabel}</h5>
        <section className="flex flex-row gap-2">
          <ClockIcon className="w-5 mt-1 lg:mt-0 text-primary-1000" />
          <section className="font-semibold text-sm leading-lg lg:leading-[22px] space-y-1">
            <p className="text-dark-800">{checkoutTimeLabel}</p>
            <p className="text-dark-1000">
              {`${checkoutBeforeLabel} ${formatAsDisplayHour(
                hotel.details.checkout_time,
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
    <section>
      <span>{fromLowerCaseToCapitilize(startDate)}</span>
      <span> {toLabel} </span>
      <span>{fromLowerCaseToCapitilize(endDate)}</span>
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
      <CheckRoomAvailability open={openCheckRoom} setOpen={setOpenCheckRoom} />
      <header className="flex flex-col w-full px-4 pt-3.5 pb-4 bg-dark-100 sticky top-12 z-10 lg:hidden">
        <section className="flex items-center justify-between h-12">
          <OccupancyAndDatesSection />
          <section>
            <Button
              value="Edit"
              translationKey="edit"
              type="contained"
              className="w-20 text-sm font-normal h-9"
              size="full"
              onClick={handleOpenCheckRoom}
            />
          </section>
        </section>
      </header>
      {loaded && emptyState && (
        <>
          <section className="hidden px-20 pt-12 lg:block">
            <RoomSectionTitle />
            <section className="p-4 my-8 rounded-md bg-dark-100">
              <HotelRoomAvailabilityForm />
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
            <ImageCarousel images={hotelImages} title={name} />
          </section>
          <section className="hidden w-full pt-8 lg:block bg-dark-100">
            <ImageCarouselLargeScreen images={hotelImages} title={name} />
          </section>
          <section className="lg:hidden">
            <GeneralInformationSection />
          </section>
          <section className="hidden px-20 py-6 text-left lg:block bg-dark-100">
            <section className="mx-auto max-w-7xl">
              <p className="text-[2rem]">{name}</p>
              <RatingSection />
            </section>
          </section>
          <section ref={roomRef} className="lg:hidden">
            <SeeMore
              textOpened="See less"
              textClosed="See more"
              heightInPixels={hotelRooms.length > 4 ? 2800 : 0}
              displayButton={hotelRooms.length > 4}
            >
              {
                <RoomsSection
                  rooms={hotelRooms}
                  hotelId={hotel.id}
                  hotelName={name}
                  nights={nights}
                  guests={guests}
                />
              }
            </SeeMore>
          </section>
          <section className="hidden px-20 lg:block">
            <section className="mx-auto max-w-7xl">
              <RoomsSection
                rooms={hotelRooms}
                hotelId={hotel.id}
                hotelName={name}
                nights={nights}
                guests={guests}
              />
            </section>
          </section>
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
      {!loaded && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};

export default HotelDetailDisplay;
