import React from 'react';
import { LATITUDE_INDEX, LONGITUDE_INDEX } from 'types/search/Geolocation';
import { IconWrapper, Heading } from '@simplenight/ui';
import { useRouter } from 'next/router';
import ArrowLeft from 'public/icons/assets/flights/arrow_left.svg';

interface HotelBackButtonProps {
  backLabel?: string;
}
const HotelBackButton: React.FC<HotelBackButtonProps> = ({ backLabel }) => {
  const router = useRouter();
  const params = router.query;
  const query = {
    ...params,
    latitude: String(params.geolocation)?.split(',')[LATITUDE_INDEX] ?? '',
    longitude: String(params.geolocation)?.split(',')[LONGITUDE_INDEX] ?? '',
  };
  return (
    <div className="flex gap-2 md:p-0 mb-4 mt-4">
      <button
        onClick={() =>
          router.push({ pathname: `/search/${params.slug}`, query })
        }
      >
        <IconWrapper size={24}>
          <ArrowLeft />
        </IconWrapper>
      </button>
      <Heading tag="h6">{backLabel}</Heading>
    </div>
  );
};

export default HotelBackButton;
