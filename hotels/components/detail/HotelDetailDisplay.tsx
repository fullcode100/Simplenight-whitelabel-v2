import dayjs from 'dayjs';
import { parseQueryNumber } from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { getHotelDetail } from 'hotels/redux/selectors';
import { HotelDetailRequest } from 'hotels/types/request/HotelDetailRequest';
import { HotelDetailResponse, Occupancy } from 'hotels/types/response/HotelDetailResponse';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { DateString } from 'types/global/DateString';

interface HotelDetailDisplayProps extends CategoryPageComponentProps {}

const HotelDetailDisplay = ({ Category }: HotelDetailDisplayProps) => {
  const dispatch = useDispatch();

  const { id, start_date, end_date, adults, children, num_rooms } = useQuery();
  const { store } = Category;
  const { detail } = store.actions;

  // const hotel = getHotelDetail();
  const [hotel, setHotel] = useState<HotelDetailResponse>();

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

    // dispatch(detail(params.hotel_id, params));
    Category.core.ClientDetailer?.request(params, params.hotel_id).then(setHotel);
  }, []);

  return <section>{JSON.stringify(hotel, null, 2)}</section>;
};

export default HotelDetailDisplay;
