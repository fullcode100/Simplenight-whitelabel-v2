import Button from 'components/global/Button/Button';
import Carousel from 'components/global/Carousel/Carousel';
import Rating from 'components/global/Rating/Rating';
import ReadMore from 'components/global/ReadMore/ReadMore';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import hotelMock from 'hotels/hotelMock';
import { HotelDetailRequest } from 'hotels/types/request/HotelDetailRequest';
import {
  HotelDetailResponse,
  Occupancy,
} from 'hotels/types/response/HotelDetailResponse';
import galleryMock from 'mocks/galleryMock';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';

import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import InformationIcon from 'public/icons/assets/information.svg';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import DetailItemCard from 'components/global/DetailItemCard/DetailItemCard';
import { Room } from 'hotels/types/response/SearchResponse';
import Divider from 'components/global/Divider/Divider';

interface HotelDetailDisplayProps extends CategoryPageComponentProps {}

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

  const {
    name,
    address,
    description,
    star_rating: starRating,
    rooms: hotelRooms,
  } = hotelMock[0];

  const { address1: mainAddressInformation } = address;

  const [hotel, setHotel] = useState<HotelDetailResponse>();
  const [t, i18next] = useTranslation('hotels');
  const starHotelLabel = t('userRating', 'User Rating');
  const totalLabel = t('total', 'Total');
  const roomLabel = t('room', 'Room');
  const taxesLabel = t('taxes', 'Taxes');
  const payNowLabel = t('payNow', 'Pay Now');
  const allNightsLabel = t('allNights', 'all nights');
  const perNightLabel = t('perNight', 'per night');
  const additionalFeesLabel = t('additionalFees', 'Additional Fees');
  const resortFeeLabel = t('resortFee', 'Resort Fee');
  const payAtPropertyLabel = t('payAtProperty', 'Pay At Property');

  useEffect(() => {
    const occupancy: Occupancy = {
      adults: parseQueryNumber(adults ?? '1') + '',
      children: parseQueryNumber(children ?? '0') + '',
      num_rooms: parseQueryNumber(rooms ?? '1') + '',
    };

    const params: HotelDetailRequest = {
      hotel_id: id as string,
      start_date: formatAsSearchDate(startDate),
      end_date: formatAsSearchDate(endDate),
      occupancy: occupancy,
    };

    // Category.core.ClientDetailer?.request(
    //   params,
    //   i18next,
    //   params.hotel_id,
    // ).then(setHotel);
  }, []);

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const ImagesSection = () => (
    <Carousel images={galleryMock} dotPosition="top"></Carousel>
  );

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

    const handleTabClick = (tab: Tab, setActiveTab: (tab: Tab) => void) => {};

    return (
      <section className=" text-dark-1000 bg-dark-100 w-screen rounded-t-12 py-4 px-4">
        <p className="h4 text-center">{name}</p>
        <RatingSection />
        <HorizontalTabs className="mt-4" tabs={tabs} onClick={handleTabClick} />
      </section>
    );
  };

  const DetailsSection = () => (
    <section>
      <p>Details</p>
      <ReadMore text={description} />
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
            <span>{totalAmount.str}</span>
            <span className="text-xs text-dark-800">{allNightsLabel}</span>
            <span>{totalAmount.str}</span>
            <span className="text-xs text-dark-800">{perNightLabel}</span>
          </section>
        </section>
      );

      return (
        <section className="mt-8 flex flex-col text-base text-dark-1000">
          <p>{roomDescription}</p>
          <section className="w-full flex flex-col mt-4">
            <BreakdownSubtitle value={totalLabel} />
            <BreakdownRow label={roomLabel} price={totalBaseAmount.str} />
            <BreakdownRow label={taxesLabel} price={totalTaxes.str} />
            <Divider className="mt-2" />
            <PayNowSection />
            <BreakdownSubtitle value={additionalFeesLabel} />
            <BreakdownRow label={resortFeeLabel} price={totalAmount.str} />
            <Divider className="mt-2" />
            <BreakdownRow label={payAtPropertyLabel} price={totalAmount.str} />
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
              />
            );
          })}
        </section>
      </section>
    );
  };

  return (
    <>
      <header className="flex flex-col w-full px-4 pt-28">
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
            />
          </section>
        </section>
      </header>
      <main className="relative">
        {/* <ImagesSection /> */}
        <GeneralInformationSection />
        <RoomsSection />
        <DetailsSection />
      </main>
    </>
  );
};

export default HotelDetailDisplay;
