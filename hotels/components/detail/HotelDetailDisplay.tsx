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
import galleryMock from 'mocks/galleryMock';
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

type HotelDetailDisplayProps = CategoryPageComponentProps;

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
  const { id } = useQuery();

  const {
    adults,
    children,
    startDate,
    endDate,
    rooms,
    ADULT_TEXT,
    CHILDREN_TEXT,
    ROOMS_TEXT,
  } = useSearchQueries();

  const roomRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [hotel, setHotel] = useState<Hotel>(initialState[0]);
  const {
    details: { name, address, description, star_rating: starRating },
    rooms: hotelRooms,
    photos,
  } = hotel;

  const hotelImages = photos.map((photo) => photo.url);

  const [t, i18next] = useTranslation('hotels');
  const starHotelLabel = t('userRating', 'User Rating');

  useEffect(() => {
    const occupancy: Occupancy = {
      adults: parseQueryNumber(adults ?? '1') + '',
      children: parseQueryNumber(children ?? '0') + '',
      rooms: parseQueryNumber(rooms ?? '1') + '',
    };

    const params: HotelDetailPreRequest = {
      hotel_id: (id as unknown as string) ?? '', // id as string,
      start_date: formatAsSearchDate(dayjs().add(1, 'day')), // (startDate),
      end_date: formatAsSearchDate(dayjs().add(2, 'day')), // (endDate),
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
  }, []);

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
      <span className="text-sm">
        <span className="text-primary-1000 mr-2">{starRating}/5</span>
        {starHotelLabel}
      </span>
      <Rating value={starRating} size={50} />
    </section>
  );

  const GeneralInformationSection = () => {
    const tabs: Tab[] = [
      { value: 'Rooms' },
      { value: 'Location' },
      { value: 'Amenities' },
    ];

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
      <section className=" text-dark-1000 bg-dark-100 w-screen rounded-t-12 py-4 px-4">
        <p className="h4 text-center">{name}</p>
        <RatingSection />
        <HorizontalTabs className="mt-4" tabs={tabs} onClick={handleTabClick} />
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
          <span className="h4 text-dark-800">Details</span>
        </p>
      </section>
      <SeeMore
        text={description}
        type="text"
        textOpened="Read less"
        textClosed="Read more"
      />
    </section>
  );

  const [openCheckRoom, setOpenCheckRoom] = useState<boolean>(false);

  const handleOpenCheckRoom = () => {
    setOpenCheckRoom(true);
  };

  return (
    <>
      <CheckRoomAvailability open={openCheckRoom} setOpen={setOpenCheckRoom} />
      <header className="flex flex-col w-full px-4 pt-3.5 pb-4">
        <section className="h-12 flex justify-between items-center">
          <section className="flex flex-col">
            <section className="flex gap-4">
              <CalendarIcon className="text-primary-1000" />
              <span>
                {startDate} to {endDate}
              </span>
            </section>
            <section className="flex justify-between mt-2">
              <MultiplePersonsIcon className="mr-4 text-primary-1000" />
              <span>
                {adults ?? '-'} {ADULT_TEXT}, {children ?? '-'} {CHILDREN_TEXT}
              </span>
              <span className="text-dark-200 mx-4">|</span>
              <span>
                {rooms ?? '-'} {ROOMS_TEXT}
              </span>
            </section>
          </section>
          <section>
            <Button
              value="Edit"
              type="contained"
              className="h-9 text-base w-20"
              size="full"
              onClick={handleOpenCheckRoom}
            />
          </section>
        </section>
      </header>
      <main className="relative">
        {/* <ImagesSection /> */}
        <ImageCarousel images={hotelImages} hotelName={name} />
        <GeneralInformationSection />
        <section ref={roomRef}>
          <SeeMore
            textOpened="See less"
            textClosed="See more"
            type="component"
            heightInPixels={900}
          >
            {<RoomsSection rooms={hotelRooms} hotelId={hotel.id} />}
          </SeeMore>
        </section>
        <Divider />
        <DetailsSection />
        <section ref={locationRef}>
          <LocationSection />
        </section>
        {/* <CustomerReviewsSection /> */}
      </main>
    </>
  );
};

export default HotelDetailDisplay;
