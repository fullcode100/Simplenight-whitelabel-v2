import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';
import LocationPin from '@/icons/assets/location-pin.svg';
import LocationMap from 'components/global/LocationMap/LocationMap';
import Calendar from 'public/icons/assets/calendar.svg';
import { formatAsDisplayDatetime } from '../../../helpers/dajjsUtils';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';

type Coordinates = {
  latitude: number;
  longitude: number;
};
type SearchDetails = {
  pickUpDate: string;
  pickUpTime: string;
  pickUpAddress: string;
  pickUpCoordinates: Coordinates;
  dropOffDate: string;
  dropOffTime: string;
  dropOffAddress: string;
  dropOffCoordinates: Coordinates;
};
interface TransportationDetailProps {
  transportation: TransportationItem;
  searchDetails: SearchDetails;
}

export const TransportationDetailsLocation: FC<TransportationDetailProps> = ({
  transportation,
  searchDetails,
}) => {
  const [tg] = useTranslation('global');
  const [t] = useTranslation('ground-transportation');
  const locationLabel = tg('location', 'Location');
  const locationPickUp = tg('pickUp', 'Pick Up');
  const locationDropOff = tg('dropOff', 'Drop Off');

  const [checked, setChecked] = useState({ pickUp: true, dropOff: false });

  const startDate = formatAsDisplayDatetime(
    `${searchDetails?.pickUpDate} ${searchDetails?.pickUpTime}`,
  );
  const endDate = formatAsDisplayDatetime(
    `${searchDetails?.dropOffDate} ${searchDetails?.dropOffTime}`,
  );

  return (
    <section className="flex flex-col gap-6 px-5 py-6 lg:px-12 lg:py-8 lg:flex-1 lg:flex lg:flex-col lg:gap-4">
      <SectionTitle title={locationLabel} icon={<LocationPin />} />
      <LocationMap
        height={200}
        center={
          checked.pickUp
            ? searchDetails?.pickUpCoordinates
            : searchDetails?.dropOffCoordinates
        }
        coords={[
          checked.pickUp
            ? searchDetails?.pickUpCoordinates
            : searchDetails?.dropOffCoordinates,
        ]}
      />
      <section className="flex flex-row w-full">
        <section className="flex flex-col flex-1 gap-3">
          <section className="flex flex-row items-center gap-2">
            <input
              type="radio"
              checked={checked.pickUp}
              onChange={() =>
                setChecked({
                  pickUp: !checked.pickUp,
                  dropOff: !checked.dropOff,
                })
              }
            />
            <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-1000">
              {locationPickUp}
            </p>
          </section>
          <hr
            className={`border-t-2 border-primary-1000 w-full ${
              checked.pickUp ? 'visible' : 'invisible'
            }`}
          />
          <section className="flex flex-row items-start justify-start gap-2">
            <Calendar className="w-4 h-4 text-primary-1000" />
            <span>{fromLowerCaseToCapitilize(startDate)}</span>
          </section>
          <section className="flex flex-row items-start justify-start gap-2">
            <LocationPin className="text-primary-1000" />
            <span>
              {searchDetails.pickUpAddress?.toString().split(', ')[0]}
            </span>
          </section>
        </section>

        <section className="flex flex-col flex-1 gap-3">
          <section className="flex flex-row items-center gap-2">
            <input
              type="radio"
              checked={checked.dropOff}
              onChange={() =>
                setChecked({
                  pickUp: !checked.pickUp,
                  dropOff: !checked.dropOff,
                })
              }
            />
            <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-1000">
              {locationDropOff}
            </p>
          </section>
          <hr
            className={`border-t-2 border-primary-1000 w-full ${
              checked.dropOff ? 'visible' : 'invisible'
            }`}
          />
          <section className="flex flex-row items-start justify-start gap-2">
            <Calendar className="w-4 h-4 text-primary-1000" />
            <span>{fromLowerCaseToCapitilize(endDate)}</span>
          </section>
          <section className="flex flex-row items-start justify-start gap-2">
            <LocationPin className="text-primary-1000" />
            <span>
              {searchDetails.dropOffAddress?.toString().split(', ')[0]}
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};
