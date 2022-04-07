import Carousel from 'components/global/Carousel/Carousel';
import Divider from 'components/global/Divider/Divider';
import Rating from 'components/global/Rating/Rating';
import ReadMore from 'components/global/ReadMore/ReadMore';
import dayjs from 'dayjs';
import { parseQueryNumber } from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
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
import { DateString } from 'types/global/DateString';

interface HotelDetailDisplayProps extends CategoryPageComponentProps {}

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
  const { id, start_date, end_date, adults, children, num_rooms } = useQuery();

  const { name, address, description, star_rating: starRating } = hotelMock[0];

  const { address1: mainAddressInformation } = address;

  const [hotel, setHotel] = useState<HotelDetailResponse>();
  const [t, i18next] = useTranslation('hotels');
  const starHotelLabel = t('starHotel', 'Star Hotel');

  useEffect(() => {
    const startDate = (start_date ??
      dayjs().format('YYYY-MM-DD')) as DateString;
    const endDate = (end_date ??
      dayjs(startDate).add(1, 'day').format('YYYY-MM-DD')) as DateString;

    const occupancy: Occupancy = {
      adults: parseQueryNumber(adults ?? '1') + '',
      children: parseQueryNumber(children ?? '0') + '',
      num_rooms: parseQueryNumber(num_rooms ?? '1') + '',
    };

    const params: HotelDetailRequest = {
      hotel_id: id as string,
      start_date: startDate,
      end_date: endDate,
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
    <Carousel images={galleryMock} dotPosition="top">
      {/* <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div> */}
    </Carousel>
  );

  const RatingSection = () => (
    <section className="flex mt-4 w-full justify-between items-center">
      <Rating value={starRating} size={50} />
      <span className="font-semibold text-sm">
        {starRating} {starHotelLabel}
      </span>
    </section>
  );

  const GeneralInformationSection = () => (
    <section className="h-screen text-dark-1000 absolute w-screen top-[140px] rounded-t-12 bg-white py-5 px-4">
      <p className="h4">{name}</p>
      <p className="pmd mt-4">{mainAddressInformation}</p>
      <RatingSection />
      <Divider className="mt-4" />
      <ReadMore text={description} />
    </section>
  );

  return (
    <>
      <header className="flex flex-col w-full">
        <div className="h-12 bg-black text-white">Date etc</div>
        <div className="h-12 bg-blue-600 text-white">Return to hotels</div>
      </header>
      <main className="relative">
        <ImagesSection />
        <GeneralInformationSection />
      </main>
    </>
  );
};

export default HotelDetailDisplay;
