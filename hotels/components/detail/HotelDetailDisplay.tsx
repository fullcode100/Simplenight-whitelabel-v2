/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery as useReactQuery } from '@tanstack/react-query';
import Rating from 'components/global/Rating/Rating';
import {
  fromLowerCaseToCapitilize,
  getChildrenAges,
  parseQueryNumber,
} from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useRouter } from 'next/router';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import initialState from './utils/initialState';
import { HotelDetailPreRequest } from 'hotels/types/request/HotelDetailRequest';
import { Occupancy } from 'hotels/types/response/HotelDetailResponse';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';

import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import BackArrow from 'public/icons/assets/goBackArrow.svg';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import CheckRoomAvailability from 'hotels/components/CheckRoomAvailability/CheckRoomAvailability';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import LocationSection from '../location/LocationSection';
import SeeMore from 'components/global/ReadMore/SeeMore';
import RoomsSection from 'hotels/components/Rooms/RoomsSection';
import Divider from '../../../components/global/Divider/Divider';
import dayjs from 'dayjs';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import InformationIcon from 'public/icons/assets/information.svg';
import CheckIcon from 'public/icons/assets/check-white.svg';
import PoliciesIcon from 'public/icons/assets/policies.svg';
import SearchIcon from 'public/icons/assets/search_small.svg';
import Loader from '../../../components/global/Loader/Loader';
import BlockDivider from 'components/global/Divider/BlockDivider';
import ImageCarouselLargeScreen from 'components/global/CarouselNew/ImageCarouselLargeScreen';
import { EmptyState } from '@simplenight/ui';
import RoomSectionTitle from '../Rooms/components/RoomsSectionTitle';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { createRoom } from 'hotels/helpers/room';
import { getReferral } from '../../helpers/getReferral';
import useCookies from 'hooks/localStorage/useCookies';
import PoliciesSection from '../Instructions/PoliciesSection';
import { detailAdapter } from '../../adapters/detail.adapter';
import { DetailItem } from 'hotels/types/adapters/DetailItem';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import AmenitiesGrid from './AmenitiesGridHotels';
import { useGA4 } from 'hooks/ga4/useGA4';
import { TRACK_ACTION, TRACK_CATEGORY, TRACK_LABEL } from 'constants/events';
import HotelSearchForm from '../search/HotelSearchForm';
import { NEW_SEARCH_DATE_FORMAT } from 'helpers/dajjsUtils';
import HotelBackButton from '../detail/HotelBackButton';

type HotelDetailDisplayProps = CategoryPageComponentProps;
type FetchHotel = () => Promise<DetailItem>;

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
  const router = useRouter();
  const params = useQuery();
  const { trackEvent } = useGA4();
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

  const initialStateAdapted = detailAdapter(initialState);

  const roomRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const [displaySeeMore, setDisplaySeeMore] = useState(true);
  const [descriptionHeight, setDescriptionHeight] = useState(232);
  const [hotel, setHotel] = useState<DetailItem>(initialStateAdapted);
  const [emptyState, setEmptyState] = useState<boolean>(false);

  const {
    details: {
      name,
      fullAddress,
      description,
      starRating,
      checkinTime,
      checkoutTime,
      checkInInstructions,
      specialInstructions,
      policies,
      fees,
    },
    rooms: hotelRooms,
    photos,
    nights,
    roomsQty,
  } = hotel;
  const [tg] = useTranslation('global');
  const [t, i18next] = useTranslation('hotels');
  const roomsLabel = t('rooms', 'Rooms');
  const locationLabel = t('location', 'Location');
  const detailsLabel = t('details', 'Details');
  const amenitiesLabel = t('amenities', 'Amenities');
  const policiesLabel = t('policies', 'Policies');
  const toLabel = tg('to', 'to');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const backToHotelsLabel = t('backToHotels', 'Back to Hotels');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [detailsLabel]);

  const paramRoomsData = roomsData
    ? JSON.parse(roomsData as string)
    : [createRoom()];

  const occupancy: Occupancy = {
    adults: parseQueryNumber(adults ?? '1') + '',
    children: parseQueryNumber(children ?? '0') + '',
    rooms: parseQueryNumber(rooms ?? '1') + '',
  };

  const handleGoBack = () => {
    router.back();
  };

  if (parseQueryNumber(occupancy.children) > 0) {
    occupancy.children_ages = getChildrenAges(paramRoomsData);
  }

  const detailParams: HotelDetailPreRequest = {
    hotel_id: (id as unknown as string) ?? '', // id as string,
    start_date: searchStartDate, // (startDate),
    end_date: searchEndDate, // (endDate),
    occupancy: occupancy,
  };

  const fetchHotel: FetchHotel = async () => {
    try {
      return await Category.core.ClientDetailer?.request?.(
        detailParams,
        i18next,
        detailParams.hotel_id,
      );
    } catch (e) {
      setEmptyState(true);
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['hotel-detail', id, detailParams],
    fetchHotel,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (data) {
      setHotel(data);
      setEmptyState(false);
      trackEvent({
        action: TRACK_ACTION.SET,
        category: TRACK_CATEGORY.HOTELS,
        label: TRACK_LABEL.ITEM,
        value: data?.details?.name || 'no_name',
      });
    }
  }, [data]);

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
    <section className="flex items-center justify-between w-full mt-4 lg:justify-start lg:gap-2 lg:mt-0">
      <Rating value={parseInt(starRating)} size={50} isHotelRating />
    </section>
  );

  const GeneralInformationSection = () => {
    const tabs: Tab[] = [
      { name: roomsLabel, type: roomsLabel },
      { name: locationLabel, type: locationLabel },
    ];

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
      scrollTo(tab.name);
    };

    return (
      <section className="w-screen pt-4 text-dark-1000 bg-dark-100 rounded-t-12 ">
        <section className="px-4 ">
          <p className="h4">{name}</p>
          <RatingSection />
        </section>
        <BlockDivider className="mt-5" />
        <section className="px-4">
          <HorizontalTabs
            tabs={tabs}
            activeTab={activeTab}
            onClick={handleTabClick}
            hideMore
          />
        </section>
      </section>
    );
  };

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
          </p>
        </SeeMore>
      </section>
      <section className="hidden lg:block">
        <p className="mt-3 text-base text-dark-1000">{description}</p>
      </section>
    </section>
  );

  const [openCheckRoom, setOpenCheckRoom] = useState<boolean>(false);

  const handleOpenCheckRoom = () => {
    setOpenCheckRoom(true);
  };

  const adultsNumber = parseInt((adults && adults[0]) || '0');
  const childrenNumber = parseInt((children && children[0]) || '0');
  const guests = adultsNumber + childrenNumber;
  const tGuest = tg('guest', 'Guest');
  const tGuests = tg('guests', 'Guests');
  const GUEST_TEXT = usePlural(guests, tGuest, tGuests);

  const DatesSection = () => (
    <section>
      <span>
        {dayjs(startDate as unknown as string).format(NEW_SEARCH_DATE_FORMAT)}
      </span>
      <span> {toLabel} </span>
      <span>
        {dayjs(endDate as unknown as string).format(NEW_SEARCH_DATE_FORMAT)}
      </span>
    </section>
  );

  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      <span>{guests ?? ' - '} </span>
      <span>{GUEST_TEXT} </span>
    </section>
  );

  const OccupancyAndDatesSection = () => (
    <section className="flex gap-4 font-lato text-dark-1000">
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <MultiplePersonsIcon className="text-primary-1000 text-dark-1000" />
        </section>
        <OccupancySection />
      </section>
      <section className="flex gap-2">
        <section className="grid w-6 place-items-center">
          <CalendarIcon className="text-primary-1000 text-dark-1000" />
        </section>
        <DatesSection />
      </section>
    </section>
  );
  const AmenitiesSection = () => (
    <section className="px-5 pt-6 pb-3 lg:px-20 lg:py-12">
      <section className="flex flex-col mx-auto max-w-7xl">
        <p className="flex items-center gap-3 mb-6">
          <IconRoundedContainer isLarge className="bg-primary-1000">
            <CheckIcon className="h-5 w-5 lg:h-[30px] lg:w-[30px]" />
          </IconRoundedContainer>
          <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {amenitiesLabel}
          </span>
        </p>
        <AmenitiesGrid
          amenities={[
            'Breakfast',
            'Pool',
            'Casino',
            'A.C.',
            'Restaurant',
            'WiFi',
            'Bar',
            'Hot Tub',
            'Spa',
            'Sauna',
            'Laundry',
            'Pet Friendly',
          ]}
        />
      </section>
    </section>
  );

  const Policies = () => (
    <section className="px-5 pt-6 pb-3 lg:px-20 lg:py-12">
      <section className="flex flex-col mx-auto max-w-7xl">
        <p className="flex items-center gap-3 mb-6">
          <IconRoundedContainer isLarge className="bg-primary-1000">
            <PoliciesIcon className="h-5 w-5 lg:h-[30px] lg:w-[30px]" />
          </IconRoundedContainer>
          <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {policiesLabel}
          </span>
        </p>
        <PoliciesSection
          checkInTime={checkinTime}
          checkOutTime={checkoutTime}
          checkInInstructions={checkInInstructions}
          specialInstructions={specialInstructions}
          fees={fees}
          policies={policies}
        />
      </section>
    </section>
  );

  return (
    <>
      <CheckRoomAvailability open={openCheckRoom} setOpen={setOpenCheckRoom} />
      <header className="flex flex-col w-full  pt-3.5 pb-4 bg-dark-100 sticky top-12 z-10 lg:hidden">
        <section className="flex gap-2 bg-dark-200 font-lato text-sm text-dark-1000">
          <HotelBackButton backLabel={backToHotelsLabel} />
        </section>
        <section className="flex items-center px-4 justify-between h-12">
          <OccupancyAndDatesSection />
          <section onClick={handleOpenCheckRoom}>
            <SearchIcon className="text-primary-1000" />
          </section>
        </section>
      </header>
      {!isLoading && emptyState && (
        <>
          <section className="hidden px-20 pt-12 lg:block">
            <RoomSectionTitle />
            <section className="p-4 my-8 rounded-md bg-dark-100">
              <HotelSearchForm />
            </section>
          </section>
          <EmptyStateContainer
            text={noResultsLabel}
            Icon={EmptyState}
            forcedHeight={220}
          />
        </>
      )}
      {!isLoading && !emptyState && (
        <main className="relative">
          {/* <ImagesSection /> */}
          {photos && (
            <section className="lg:hidden">
              <ImageCarousel images={photos} title={name} />
            </section>
          )}
          {photos && (
            <section className="hidden w-full pt-8 lg:block bg-dark-100">
              <ImageCarouselLargeScreen images={photos} title={name} />
            </section>
          )}
          <section className="lg:hidden">
            <GeneralInformationSection />
          </section>
          <section className="hidden px-20 py-6 text-left lg:block bg-dark-100">
            <section className="mx-auto max-w-7xl">
              <p className="text-[2rem]">{name}</p>
              <RatingSection />
            </section>
          </section>
          <section className="px-12">
            <section className="mx-auto max-w-7xl">
              <RoomsSection
                rooms={hotelRooms}
                hotelId={hotel.id}
                hotelName={name}
                nights={nights}
                guests={guests}
                roomsQty={roomsQty}
                backLabel={backToHotelsLabel}
              />
            </section>
          </section>
          <Divider />
          <section className="lg:px-20 lg:py-12">
            <section className="mx-auto divide-y divide-dark-300 lg:divide-y-0 lg:divide-x lg:flex max-w-7xl">
              <section className="lg:w-[50%] lg:pr-12">
                <DetailsSection />
              </section>
              <section
                ref={locationRef}
                className="lg:w-[50%] lg:flex-1 lg:pl-12"
              >
                <LocationSection fullAddress={fullAddress} />
              </section>
            </section>
          </section>
          <Divider />
          <AmenitiesSection />
          <Divider />
          <Policies />
          {/* It is not yet applicable but I have left the desktop styles configured for when it is to be used */}
          {/* <section className="lg:px-20 lg:py-8">
            <CustomerReviewsSection />
          </section> */}
        </main>
      )}
      {isLoading && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};

export default HotelDetailDisplay;
