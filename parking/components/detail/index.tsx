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
  return (
    <main>
      <ParkingDetailHeader parking={parking} />
      <ParkingDetailImages parking={parking} />
      <ParkingDetailFacts parking={parking} />
      <hr />
      <ParkingDetailPricesAndWorkHours parking={parking} />
      <hr />
      <ParkingDetailsLocation parking={parking} />
    </main>
  );
};
