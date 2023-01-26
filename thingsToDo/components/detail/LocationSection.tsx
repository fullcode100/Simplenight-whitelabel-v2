import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import LocationSelector from '../LocationSelector/LocationSelector';
import LocationIcon from 'public/icons/assets/location-pin.svg';
import {
  Location,
  LocationPoints,
} from 'thingsToDo/types/response/ThingsDetailResponse';
import Paragraph from 'components/global/Typography/Paragraph';
import { geocodeByPlaceId } from 'react-places-autocomplete';

interface LocationSectionProps {
  meetingPoints?: Location[];
  pickupPoints?: LocationPoints;
  selectedPickup?: Location;
  setSelectedPickup: Dispatch<SetStateAction<Location | undefined>>;
}

const LocationSection = ({
  meetingPoints,
  pickupPoints,
  selectedPickup,
  setSelectedPickup,
}: LocationSectionProps) => {
  const [t] = useTranslation('things');
  const locationLabel = t('location', 'Location');

  const hasMeetingPoints = meetingPoints && meetingPoints.length > 0;
  const hasPickupPoints = pickupPoints && pickupPoints.locations?.length > 0;

  const GoogleMapsLink = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    const [tg] = useTranslation('global');
    const googleMapsLabel = tg('googleMapsLabel', 'Open in Google Maps');

    return (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="text-base underline text-dark-1000 underline-offset-1">
          {googleMapsLabel}
        </div>
      </a>
    );
  };

  const PointDetail = ({ point }: { point?: Location }) => {
    const { latitude, longitude } = point?.coordinates || {};
    const { name, description } = point || {};
    const [formattedAddress, setFormattedAddress] = useState('');

    useEffect(() => {
      const getAddress = async (point: Location) => {
        const { address, provider } = point || {};
        let pointFormattedAddress = '';
        if (address) {
          pointFormattedAddress = `${address?.address1}, ${address?.city} - ${address?.state} - ${address?.country}, ${address?.postal_code}`;
        }
        if (!address && provider === 'GOOGLE') {
          const geocode = await geocodeByPlaceId(point.provider_ref);
          pointFormattedAddress = geocode[0].formatted_address;
        }
        setFormattedAddress(pointFormattedAddress);
      };
      if (point) getAddress(point);
      return () => {
        setFormattedAddress('');
      };
    }, [point]);

    return (
      <>
        {latitude && longitude && (
          <GoogleMapsLink latitude={latitude} longitude={longitude} />
        )}
        {name && <div className="text-base text-dark-1000">{name}</div>}
        {description && (
          <div className="text-base text-dark-1000">{description}</div>
        )}
        {point && (
          <div className="flex flex-row gap-3 text-base text-dark-1000">
            <LocationIcon className="w-5 h-5 mt-1 text-primary-1000" />
            {formattedAddress}
          </div>
        )}
      </>
    );
  };

  const MeetingPoint = () => {
    const meetingPointLabel = t('meetingPoint', 'Meeting Point');
    return (
      <section className="grid gap-3">
        <Paragraph
          size="medium"
          fontWeight="semibold"
          textColor="text-dark-800"
        >
          {meetingPointLabel}
        </Paragraph>

        {meetingPoints?.map((meetingPoint) => {
          const hasMultipleMeetingPoints = meetingPoints.length > 1;
          const listStyles =
            'before:content-["•"] flex before:mt-1 before:mr-1';
          return (
            <div
              key={meetingPoint.ref}
              className={`${hasMultipleMeetingPoints ? listStyles : ''}`}
            >
              <PointDetail point={meetingPoint} />
            </div>
          );
        })}
      </section>
    );
  };

  const PickupPoint = () => {
    const pickupPoint = t('pickupPoint', 'Pickup Point');
    const pickupPlaceholder = t('pickupPlaceholder', 'Choose A Pickup Point');
    const time = t('time', 'Time');
    const minutesBeforeDeparture = t(
      'minutesBeforeDeparture',
      'minutes before departure',
    );

    const locations = pickupPoints?.locations.map(
      (location: any) => location.location,
    );

    useEffect(() => {
      if (locations?.length == 1) {
        setSelectedPickup(locations[0]);
      }
    }, [locations]);

    const hasTime = pickupPoints?.minutes_before_departure;

    return (
      <section className="grid gap-3">
        <Paragraph
          size="medium"
          fontWeight="semibold"
          textColor="text-dark-800"
        >
          {pickupPoint}
        </Paragraph>
        {locations && locations.length > 1 && (
          <section className="lg:w-[405px]">
            <LocationSelector
              placeholder={pickupPlaceholder}
              locations={locations}
              selectedPoint={selectedPickup}
              setSelectedPoint={setSelectedPickup}
            />
          </section>
        )}
        <PointDetail point={selectedPickup} />
        {selectedPickup && hasTime && (
          <div className="text-base text-dark-1000">
            {time}: {pickupPoints?.minutes_before_departure}{' '}
            {minutesBeforeDeparture}.
          </div>
        )}
      </section>
    );
  };

  return (
    <section className="grid gap-6 px-5 py-6 mx-auto lg:py-12 lg:px-0 lg:pt-12 lg:gap-8 max-w-7xl">
      <SectionTitle title={locationLabel} icon={<LocationIcon />} />
      <section className="divide-y divide-dark-300">
        {hasMeetingPoints && (
          <section className={hasPickupPoints ? 'pb-6' : ''}>
            <MeetingPoint />
          </section>
        )}
        {hasPickupPoints && (
          <section className={hasMeetingPoints ? 'pt-6' : ''}>
            <PickupPoint />
          </section>
        )}
      </section>
    </section>
  );
};

export default LocationSection;
