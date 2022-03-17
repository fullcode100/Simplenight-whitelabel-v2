import dayjs from 'dayjs';
import { parseQueryNumber } from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelDetailRequest } from 'hotels/types/request/HotelDetailRequest';
import {
  HotelDetailResponse,
  Occupancy,
} from 'hotels/types/response/HotelDetailResponse';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { DateString } from 'types/global/DateString';

interface HotelDetailDisplayProps extends CategoryPageComponentProps {}

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
  const { id, start_date, end_date, adults, children, num_rooms } = useQuery();

  const [hotel, setHotel] = useState<HotelDetailResponse>();
  const [t, i18next] = useTranslation('global');

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

    Category.core.ClientDetailer?.request(
      params,
      i18next,
      params.hotel_id,
    ).then(setHotel);
  }, []);

  return <section>{JSON.stringify(hotel, null, 2)}</section>;
};

export default HotelDetailDisplay;
