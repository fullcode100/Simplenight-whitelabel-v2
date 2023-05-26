import React, { FC, useEffect, useState } from 'react';
import { CategoryPageComponentProps } from '../../../types/global/CategoryPageComponent';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { useTranslation } from 'react-i18next';
import { TransportationDetailsLeftSide } from './TransportationDetailsLeftSide';
import { TransportationDetailsRightSide } from './TransportationDetailsRightSide';
import Loader from '../../../components/global/Loader/Loader';
import Script from 'next/script';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';

export const TransportationDetailsDisplay: FC<CategoryPageComponentProps> = ({
  Category,
}) => {
  const {
    id,
    startDate,
    endDate,
    startTime,
    endTime,
    latitude,
    longitude,
    latitude2,
    longitude2,
    address,
    address2,
  } = useQuery();

  const [t, i18next] = useTranslation('ground-transportation');

  const [qoute, setQoute] = useState<TransportationItem>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [tg] = useTranslation('global');

  const satartCoordinates = {
    latitude: parseFloat(latitude as string),
    longitude: parseFloat(longitude as string),
  };
  const endCoordinates = {
    latitude: parseFloat(latitude2 as string),
    longitude: parseFloat(longitude2 as string),
  };

  const searchDetails = {
    pickUpDate: startDate as string,
    pickUpTime: startTime as string,
    pickUpAddress: address as string,
    pickUpCoordinates: satartCoordinates,
    dropOffDate: endDate as string,
    dropOffTime: endTime as string,
    dropOffAddress: address2 as string,
    dropOffCoordinates: endCoordinates,
  };
  useEffect(() => {
    const params: any = {
      inventory_ids: id,
      rsp_fields_set: 'extended',
      apiUrl: '/categories/ground-transportation/items/details',
    };

    Category.core.ClientDetailer?.request(params, i18next, id).then(
      (results) => {
        if (results) {
          setQoute(results.items[0].response.quote);
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
      {loaded && qoute && (
        <main>
          <section className="flex flex-col w-full lg:px-0 lg:flex lg:flex-row lg:w-full">
            <TransportationDetailsLeftSide
              transportation={qoute}
              searchDetails={searchDetails}
            />
            <TransportationDetailsRightSide transportation={qoute} />
          </section>
        </main>
      )}
      {!loaded && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};
