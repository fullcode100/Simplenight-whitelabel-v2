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
import Bed from 'public/icons/assets/bed.svg';
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
import {
  StringGeolocation,
  latLngProp,
  GEOLOCATION_SEPARATOR,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Label from 'components/global/Label/Label';

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
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('hotels');
  const adultsLabel = t('adults', 'Adults');
  const childrenLabel = t('children', 'Children');
  const infantsLabel = t('infants', 'Infants');
  const locationInputLabel = t('locationInputLabel', 'Destination');
  const textSearch = t('search', 'Search');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  const guestsLabel = t('guests', 'Guests');
  const roomsLabel = t('rooms', 'Rooms');

  const setQueryParam = useQuerySetter();
  const [roomsData, setRoomsData] = useState<Room[]>([createRoom()]);
  const [adults, setAdults] = useState(roomsData[0].adults.toString());
  const [children, setChildren] = useState(roomsData[0].children.toString());
  const [rooms, setRooms] = useState(roomsData.length.toString());
  const [childrenAges, setChildrenAges] = useState(
    roomsData[0].childrenAges.toString(),
  );
  const [address, setAddress] = useState<string | undefined>();

  const [geolocation, setGeolocation] = useState<StringGeolocation>();
  const [startDate, setStartDate] = useState<string>(
    formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);

  const [travelersPlaceholder, setTravelersPlaceholder] = useState('');

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const rerouteToSearchPage = () => {
    router.push(
      `/search/hotels?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&latitude=${
        geolocation?.split(',')[LATITUDE_INDEX]
      }&longitude=${
        geolocation?.split(',')[LONGITUDE_INDEX]
      }&address=${address}&rooms=${rooms}`,
    );
  };

  const handleSearchClick = () => {
    if (hasReRoute) {
      rerouteToSearchPage();
      return;
    }
    const roomsDataFormatted = JSON.stringify(roomsData);
    setQueryParam({
      startDate,
      endDate,
      rooms,
      adults,
      children,
      childrenAges,
      roomsDataFormatted,
      address: address as string,
      geolocation: geolocation ?? '',
      latitude: geolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.split(',')[LONGITUDE_INDEX] ?? '',
    });
    if (setIsSearching) setIsSearching(false);
  };

  const handleSelectLocation = (latLng: latLngProp, address: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setGeolocation(newGeolocation);
    setAddress(address);
  };

  const locationPlaceholder = t(
    'locationInputPlaceholder',
    'Where do you like to go?',
  );

  useEffect(() => {
    setTravelersTotals(roomsData, setAdults, setChildren, setChildrenAges);
    setRooms(roomsData.length.toString());
  }, [roomsData]);

  useEffect(() => {
    setTravelersPlaceholder(
      `${
        parseInt(adults) + parseInt(children)
      } ${guestsLabel}, ${rooms} ${roomsLabel}`,
    );
  }, [adults, children, children]);

  return (
    <section
      className={`flex flex-col px-4 pb-4 overflow-y-scroll justify-between ${className}`}
    >
      <section>
        <LocationInput
          icon={<LocationPin className="h-5 w-5 text-dark-700" />}
          label={locationInputLabel}
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
        <section className="mt-4">
          <p className="text-sm font-medium text-dark-800">Guests & Rooms</p>
          <button
            onClick={() => setShowTravelersInput(true)}
            className="mt-1 grid grid-cols-2 rounded-md border border-gray-300 w-full py-2 px-[13px] text-sm text-dark-1000 cursor-default"
          >
            <section className="flex items-center gap-2">
              <MultiplePersons className="text-dark-700" />
              {parseInt(adults) + parseInt(children)} {guestsLabel}
            </section>
            <section className="flex items-center gap-2">
              <Bed className="text-dark-700" />
              {rooms} {roomsLabel}
            </section>
          </button>
        </section>

        <DatePicker
          showDatePicker={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          initialStartDate={startDate}
          initialEndDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          openOnStart={clickOnStart ? true : false}
        />
        <section className="flex gap-4 mt-2">
          <IconInput
            label={checkInText}
            name="Check-in"
            placeholder={checkInText}
            className="mt-4"
            orientation="left"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={formatAsDisplayDate(startDate)}
            onChange={(event) => handleStartDateChange(event.target.value)}
            onClick={() => {
              setClickOnStart(true);
              setShowDatePicker(true);
            }}
            disabled
          />
          <IconInput
            label={checkOutText}
            name="Check-out"
            placeholder={checkOutText}
            orientation="left"
            className="mt-4"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={formatAsDisplayDate(endDate)}
            onChange={(event) => handleEndDateChange(event.target.value)}
            onClick={() => {
              setClickOnStart(false);
              setShowDatePicker(true);
            }}
            disabled
          />
        </section>
      </section>

      <section className="w-full flex items-center justify-center mt-8">
        <Button
          key="hotels.searchBtn"
          className="h-12 min-w-full text-base"
          value={textSearch}
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};

export default HotelSearchForm;
