import Button from 'components/global/Button/Button';
import Rating from 'components/global/Rating/Rating';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
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
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import BlockDivider from 'components/global/Divider/BlockDivider';

type HotelDetailDisplayProps = CategoryPageComponentProps;

declare let window: CustomWindow;

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
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
  const [hotel, setHotel] = useState<Hotel>(initialState[0]);
  const {
    details: { name, address, description, star_rating: starRating },
    rooms: hotelRooms,
    photos,
    nights,
  } = hotel;

  const hotelImages = photos.map((photo) => photo.url);
  const [tg] = useTranslation('global');
  const [t, i18next] = useTranslation('hotels');
  const { language } = i18next;
  const starHotelLabel = t('starHotel', 'Star Hotel');
  const roomsLabel = t('rooms', 'Rooms');
  const mapLabel = t('map', 'Map');
  const detailsLabel = t('details', 'Details');
  const toLabel = tg('to', 'to');

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
      })
      .catch((e) => {
        console.error(e);
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
    <section className="flex mt-4 w-full justify-between items-center">
      <span className="text-sm text-primary-1000 font-semibold">
        <span className="">{starRating}-</span>
        {starHotelLabel}
      </span>
      <Rating value={parseInt(starRating)} size={50} />
    </section>
  );

  const GeneralInformationSection = () => {
    const tabs: Tab[] = [{ value: roomsLabel }, { value: mapLabel }];

    const scrollFunctions: { [key: string]: () => void } = {
      Rooms: scrollToRoom,
      Location: scrollToLocation,
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
          <HorizontalTabs tabs={tabs} onClick={handleTabClick} />
        </section>
      </section>
    );
  };

  const DetailsSection = () => (
    <section className="mt-10 px-4">
      <section>
        <p className="flex items-center gap-3 mb-6">
          <IconRoundedContainer className="bg-primary-1000">
            <InformationIcon className="" />
          </IconRoundedContainer>
          <span className="h4 text-dark-800">{detailsLabel}</span>
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

  const RoomsSection = () => {
    const RoomSectionTitle = () => (
      <p className="flex items-center gap-3">
        <IconRoundedContainer className="bg-primary-1000">
          <InformationIcon className="" />
        </IconRoundedContainer>
        <span className="h4 text-dark-800">Rooms</span>
      </p>
    );

    const PriceBreakdownComponent = ({ room }: { room: Room }) => {
      const { description: roomDescription, rates } = room;
      const { min_rate: minRate } = rates;
      const { rate } = minRate;
      const { total_amount: totalAmount, rate_breakdown: rateBreakdown } = rate;
      const { total_base_amount: totalBaseAmount, total_taxes: totalTaxes } =
        rateBreakdown;

      const BreakdownRow = ({
        label,
        price,
      }: {
        label: string;
        price: string;
      }) => (
        <section className="flex items-center justify-between w-full mt-2">
          <span>{label}</span>
          <span>{price}</span>
        </section>
      );

      const BreakdownSubtitle = ({ value }: { value: string }) => (
        <p className="text-dark-800">{value}</p>
      );

      const PayNowSection = () => (
        <section className="flex items-start justify-between w-full mt-2 mb-4 ">
          <p>{payNowLabel}</p>
          <section className="flex flex-col items-end">
            <span>{totalAmount.formatted}</span>
            <span className="text-xs text-dark-800">{allNightsLabel}</span>
            <span>{totalAmount.formatted}</span>
            <span className="text-xs text-dark-800">{perNightLabel}</span>
          </section>
        </section>
      );

      return (
        <section className="mt-8 flex flex-col text-base text-dark-1000">
          <p>{roomDescription}</p>
          <section className="w-full flex flex-col mt-4">
            <BreakdownSubtitle value={totalLabel} />
            <BreakdownRow label={roomLabel} price={totalBaseAmount.formatted} />
            <BreakdownRow label={taxesLabel} price={totalTaxes.formatted} />
            <Divider className="mt-2" />
            <PayNowSection />
            <BreakdownSubtitle value={additionalFeesLabel} />
            <BreakdownRow
              label={resortFeeLabel}
              price={totalAmount.formatted}
            />
            <Divider className="mt-2" />
            <BreakdownRow
              label={payAtPropertyLabel}
              price={totalAmount.formatted}
            />
          </section>
        </section>
      );
    };

    return (
      <section className="flex flex-col gap-2 px-4 mt-4">
        <RoomSectionTitle />
        <section className="flex overflow-x-auto gap-4">
          {hotelRooms.map((room) => {
            const { description: roomDescription, rates } = room;
            const { min_rate: minRate } = rates;
            const { rate } = minRate;
            const { total_amount: totalAmount } = rate;
            const keyedDescription = roomDescription
              .toLowerCase()
              .split(' ')
              .join('-');
            const itemKey = `room-${keyedDescription}`;

            return (
              <DetailItemCard
                key={itemKey}
                title={roomDescription}
                price={totalAmount}
                priceBreakdownComponent={
                  <PriceBreakdownComponent room={room} />
                }
                room={room}
              />
            );
          })}
        </section>
      </section>
    );
  };

  const [openCheckRoom, setOpenCheckRoom] = useState<boolean>(false);

  const handleOpenCheckRoom = () => {
    setOpenCheckRoom(true);
  };

  return (
    <>
      <CheckRoomAvailability open={openCheckRoom} setOpen={setOpenCheckRoom} />
      <header className="flex flex-col w-full px-4 pt-3.5 pb-4 bg-dark-100 sticky top-16 z-10">
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
      {loaded ? (
        <main className="relative">
          {/* <ImagesSection /> */}
          <ImageCarousel images={hotelImages} title={name} />
          <GeneralInformationSection />
          <section ref={roomRef}>
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
          <Divider />
          <DetailsSection />
          <Divider className="mt-3" />
          <section ref={locationRef}>
            <LocationSection address={address} />
          </section>
          {/* <CustomerReviewsSection /> */}
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HotelDetailDisplay;
