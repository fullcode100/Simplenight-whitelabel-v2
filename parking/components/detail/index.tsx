import React, { FC, useEffect, useState } from 'react';
import { CategoryPageComponentProps } from '../../../types/global/CategoryPageComponent';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { useTranslation } from 'react-i18next';
import { Parking } from '../../types/response/ParkingSearchResponse';
import Script from 'next/script';
import Loader from '../../../components/global/Loader/Loader';
import { ParkingDetailHeader } from './ParkingDetailHeader';
import { ParkingDetailImages } from './ParkingDetailImages';
import { ParkingDetailFacts } from './ParkingDetailFacts';
import { ParkingDetailsLocation } from './ParkingDetailsLocation';
import { ParkingDetailPricesAndWorkHours } from './ParkingDetailPricesAndWorkHours';
import Button from '../../../components/global/Button/Button';
import { Container } from './Container';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemRequest } from '../../../types/cart/CartType';
import { formatAsExactHour } from '../../../helpers/dajjsUtils';

export const ParkingDetailDisplay: FC<CategoryPageComponentProps> = ({
  Category,
}) => {
  const { id, startDate, endDate, startTime, endTime } = useQuery();
  const [t, i18next] = useTranslation('hotels');

  const [parking, setParking] = useState<Parking | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const params = {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      apiUrl: '/categories/parking/items/details',
    };

    Category.core.ClientDetailer?.request(params, i18next, id).then(
      (results) => {
        if (results?.parking) {
          setParking(results.parking);
        }
        setLoaded(true);
      },
    );
  }, []);

  const MAPS_API_KEY = 'AIzaSyB_rHUVDeYtUuQ3fEuuBdmfgVnGuXUnVeU';

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`}
      />
      {loaded && parking && <ParkingDetails parking={parking} />}
      {!loaded && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};

interface ParkingDetailsProps {
  parking: Parking;
}

const ParkingDetails: FC<ParkingDetailsProps> = ({ parking }) => {
  const [t, i18next] = useTranslation('parking');
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const state = useSelector((state) => state);
  const params = useQuery();
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const itemToBook: CartItemRequest = {
    category: 'PARKING',
    booking_data: {
      inventory_id: '7e6cfd32:7264P3' || (params.id as string),
      start_date: params.startDate as string,
      time: formatAsExactHour(params.startTime as string),
      product_code: null,
      booking_code_supplier: 'XQfefns...',
      ticket_types: [],
      booking_answers: [],
    },
  };

  const handleAction = async () => {
    setDisabled(true);
    await addToCart(itemToBook, i18next, store);
    router.replace('/itinerary');
  };

  return (
    <main>
      <ParkingDetailHeader parking={parking} />
      <ParkingDetailImages parking={parking} />
      <ParkingDetailFacts parking={parking} />
      <section className="mb-4">
        <Container>
          <section>
            <Button
              size="full"
              textColor="primary"
              type="outlined"
              value="Add To Itinerary"
              onClick={() => handleAction()}
              disabled={disabled}
            />
          </section>
        </Container>
      </section>
      <hr />
      <ParkingDetailPricesAndWorkHours parking={parking} />
      <hr />
      <ParkingDetailsLocation parking={parking} />
    </main>
  );
};
