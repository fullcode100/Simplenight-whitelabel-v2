import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Location,
  LocationPoints,
} from 'thingsToDo/types/response/ThingsDetailResponse';
import LocationSelector from '../../../thingsToDo/components/LocationSelector/LocationSelector';
import LocationIcon from 'public/icons/assets/location-pin.svg';

interface PickupPointProps {
  pickupPoints?: LocationPoints;
  selectedPickup: Location;
  setSelectedPickup: Dispatch<SetStateAction<Location | undefined>>;
  id: string;
  required?: boolean;
}

const PickupPoint = ({
  pickupPoints,
  selectedPickup,
  setSelectedPickup,
  id,
  required = false,
}: PickupPointProps) => {
  const [t] = useTranslation('things');
  const pickupPlaceholder = t('pickupPlaceholder', 'Choose A Pickup Point');
  const time = t('time', 'Time');
  const minutesBeforeDeparture = t(
    'minutesBeforeDeparture',
    'minutes before departure',
  );

  const locations = pickupPoints?.locations?.map?.(
    (location) => location.location,
  );

  useEffect(() => {
    if (locations?.length == 1) {
      setSelectedPickup(locations[0]);
    }
  }, [locations]);

  const hasTime = pickupPoints?.minutes_before_departure;

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

  const PointDetail = ({ point }: { point: Location | null }) => {
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

  return (
    <section className="grid gap-3">
      {locations && locations.length > 1 && (
        <LocationSelector
          placeholder={pickupPlaceholder}
          locations={locations}
          selectedPoint={selectedPickup}
          setSelectedPoint={setSelectedPickup}
          id={id}
          required={required}
        />
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

export default PickupPoint;
