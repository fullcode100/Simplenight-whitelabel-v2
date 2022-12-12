import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import LocationSelector from '../LocationSelector/LocationSelector';
import LocationIcon from 'public/icons/assets/location-pin.svg';
import {
  Location,
  LocationPoints,
} from 'thingsToDo/types/response/ThingsDetailResponse';

interface LocationSectionProps {
  meetingPoints?: Location[];
  selectedMeeting?: Location;
  setSelectedMeeting: Dispatch<SetStateAction<Location | undefined>>;
  pickupPoints?: LocationPoints;
  selectedPickup?: Location;
  setSelectedPickup: Dispatch<SetStateAction<Location | undefined>>;
}

const LocationSection = ({
  meetingPoints,
  selectedMeeting,
  setSelectedMeeting,
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
    const { address, name, description } = point || {};
    const formattedAddress = `${address?.address1}, ${address?.city} - ${address?.state} - ${address?.country}, ${address?.postal_code}`;

    return (
      <>
        {latitude && longitude && (
          <GoogleMapsLink latitude={latitude} longitude={longitude} />
        )}
        {name && <div className="text-base text-dark-1000">{name}</div>}
        {description && (
          <div className="text-base text-dark-1000">{description}</div>
        )}
        {address && (
          <div className="flex flex-row gap-3 text-base text-dark-1000">
            <LocationIcon className="w-5 h-5 mt-1 text-primary-1000" />{' '}
            {formattedAddress}
          </div>
        )}
      </>
    );
  };

  const MeetingPoint = () => {
    const meetingPoint = t('meetingPoint', 'Meeting Point');
    const meetingPlaceholder = t(
      'meetingPlaceholder',
      'Choose A Meeting Point',
    );

    useEffect(() => {
      if (meetingPoints?.length == 1) {
        setSelectedMeeting(meetingPoints[0]);
      }
    }, [meetingPoints]);

    return (
      <section className="grid gap-3">
        <p className="text-base leading-[22px] text-dark-800 font-semibold">
          {meetingPoint}
        </p>
        {meetingPoints && meetingPoints?.length > 1 && (
          <section className="lg:w-[405px]">
            <LocationSelector
              placeholder={meetingPlaceholder}
              locations={meetingPoints}
              selectedPoint={selectedMeeting}
              setSelectedPoint={setSelectedMeeting}
            />
          </section>
        )}
        <PointDetail point={selectedMeeting} />
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
        <p className="text-base leading-[22px] text-dark-800 font-semibold">
          {pickupPoint}
        </p>
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
