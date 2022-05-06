import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';

// import { SEARCH_DATE_FORMAT } from '../../../../helpers/searchConstants';
import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import { HotelSearchFormData } from '../../../types/search/categories/HotelSearchFormData';
import { LocationPrefix } from '../../../types/search/LocationPrefixResponse';
import LocationAutoComplete from '../../../components/global/AutoComplete/LocationAutoComplete';
import DatePicker from '../../../components/global/Calendar/Calendar';
import TravelersInput from '../TravelersInput/TravelersInput';
import { Room, createRoom } from 'hotels/helpers/room';
import OccupancySelector, {
  OccupancyData,
} from './OcupancySelector/OccupancySelector';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import LocationInput from 'components/global/Input/LocationInput';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { setTravelersTotals } from 'hotels/helpers/travelers';
import { StringGeolocation, latLngProp } from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';

const SEARCH_DATE_FORMAT = 'YYYY-MM-DD';

const getInitialHotelSearchState = (): HotelSearchFormData => {
  const tomorrow = dayjs().add(1, 'day').format(SEARCH_DATE_FORMAT);

  return {
    startLocation: null,
    startDate: tomorrow,
    roomCount: 1,
    adultCount: 1,
    childCount: 0,
  };
};

const getInitialHotelOccupancyState = (): OccupancyData => ({
  adultCount: 1,
  childCount: 0,
  roomCount: 1,
});

const HotelSearchForm = ({
  setIsSearching,
  className = '',
}: SearchFormProps) => {
  const [t, i18next] = useTranslation('global');
  const adultsLabel = t('adults', 'Adults');
  const childrenLabel = t('children', 'Children');
  const infantsLabel = t('infants', 'Infants');

  const setQueryParam = useQuerySetter();
  const [roomsData, setRoomsData] = useState<Room[]>([createRoom()]);
  const [adults, setAdults] = useState(roomsData[0].adults.toString());
  const [children, setChildren] = useState(roomsData[0].children.toString());
  const [infants, setInfants] = useState(roomsData[0].infants.toString());
  const [rooms, setRooms] = useState(roomsData.length.toString());
  const [childrenAges, setChildrenAges] = useState(
    roomsData[0].childrenAges.toString(),
  );

  const [geolocation, setGeolocation] = useState<StringGeolocation>();
  const [startDate, setStartDate] = useState<string>(
    formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);

  const [travelersPlaceholder, setTravelersPlaceholder] = useState('');

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleSearchClick = () => {
    const roomsDataFormatted = JSON.stringify(roomsData);
    setQueryParam({
      startDate,
      endDate,
      rooms,
      adults,
      children,
      infants,
      childrenAges,
      roomsDataFormatted,
      geolocation: geolocation ?? '',
    });
    if (setIsSearching) setIsSearching(false);
  };

  const handleSelectLocation = (latLng: latLngProp) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setGeolocation(newGeolocation);
  };

  const locationPlaceholder = t(
    'locationInputPlaceholder',
    'Pick your destination',
  );

  useEffect(() => {
    setTravelersTotals(
      roomsData,
      setAdults,
      setChildren,
      setInfants,
      setChildrenAges,
    );
    setRooms(roomsData.length.toString());
  }, [roomsData]);

  useEffect(() => {
    setTravelersPlaceholder(
      `${adults} ${adultsLabel}, ${children} ${childrenLabel}, ${infants} ${infantsLabel}`,
    );
  }, [adults, children, infants, children]);

  return (
    <section className={`flex flex-col px-4 pb-4 justify-between ${className}`}>
      <section>
        <LocationInput
          icon={<LocationPin className="h-5 w-5 text-dark-700" />}
          label="Where to?"
          name="location"
          placeholder={locationPlaceholder}
          routeParams={['type']}
          onSelect={handleSelectLocation}
        />

        <TravelersInput
          showTravelersInput={showTravelersInput}
          onClose={() => setShowTravelersInput(false)}
          rooms={roomsData}
          setRooms={setRoomsData}
        />
        <IconInput
          name="Travelers"
          placeholder={travelersPlaceholder}
          icon={<MultiplePersons className="h-5 w-5 text-dark-700" />}
          className="mt-4"
          onClick={() => setShowTravelersInput(true)}
        />

        <DatePicker
          showDatePicker={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          initialStartDate={startDate}
          initialEndDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <section className="flex gap-4 mt-2">
          <IconInput
            label="Check-in"
            name="Check-in"
            placeholder="Check-in"
            className="mt-4"
            orientation="right"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={formatAsDisplayDate(startDate)}
            onChange={(event) => handleStartDateChange(event.target.value)}
            onClick={() => setShowDatePicker(true)}
          />
          <IconInput
            label="Check-out"
            name="Check-out"
            placeholder="Check-out"
            orientation="right"
            className="mt-4"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={formatAsDisplayDate(endDate)}
            onChange={(event) => handleEndDateChange(event.target.value)}
            onClick={() => setShowDatePicker(true)}
          />
        </section>
      </section>

      <section className="w-full flex items-center justify-center mt-8">
        <Button
          key="hotels.searchBtn"
          value="Search"
          className="h-12 min-w-full"
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};

export default HotelSearchForm;
