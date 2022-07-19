import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import DatePicker from '../../../components/global/Calendar/Calendar';
import TravelersInput from '../TravelersInput/TravelersInput';
import { Room, createRoom } from 'hotels/helpers/room';

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
import { setTravelersTotals } from 'hotels/helpers/travelers';
import {
  StringGeolocation,
  latLngProp,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import Label from 'components/global/Label/Label';

const HotelSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('hotels');
  const locationInputLabel = t('locationInputLabel', 'Destination');
  const textSearch = t('search', 'Search');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  const guestsLabel = t('guests', 'Guests');
  const guestLabel = t('guest', 'Guest');
  const roomsLabel = t('rooms', 'Rooms');
  const roomLabel = t('room', 'Room');
  const guestsAndRoomsLabel = t('guestsAndRooms', 'Guests & Rooms');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [roomsData, setRoomsData] = useState<Room[]>(
    params.roomsData ? JSON.parse(params.roomsData as string) : [createRoom()],
  );
  const [adults, setAdults] = useState(roomsData[0].adults.toString());
  const [children, setChildren] = useState(roomsData[0].children.toString());
  const [rooms, setRooms] = useState(roomsData.length.toString());
  const [childrenAges, setChildrenAges] = useState(
    roomsData[0].childrenAges.toString(),
  );
  const [address, setAddress] = useState<string | undefined>(
    params.address ? (params.address as string) : '',
  );

  const [geolocation, setGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude as string)},${parseFloat(
      params.longitude as string,
    )}`,
  );
  const [startDate, setStartDate] = useState<string>(
    params.startDate
      ? params.startDate.toString()
      : formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);

  const [travelersPlaceholder, setTravelersPlaceholder] = useState('');

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('lastSearch', value);
  };

  const rerouteToSearchPage = () => {
    const route = `/search/hotels?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${address}&rooms=${rooms}&roomsData=${JSON.stringify(roomsData)}`;
    handleSaveLastSearch(route);
    router.push(route);
  };

  const handleChangeLocation = () => {
    setShowLocationError(false);
  };

  const geolocationIsNull = geolocation === `${NaN},${NaN}`;
  const handleSearchClick = () => {
    if (hasReRoute) {
      if (geolocationIsNull) {
        setShowLocationError(true);
        return;
      }
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
      address: address as string,
      geolocation: geolocation ?? '',
      latitude: geolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.split(',')[LONGITUDE_INDEX] ?? '',
      roomsData: roomsDataFormatted,
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
      className={`flex flex-col justify-between ${className} lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
    >
      <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
        <LocationInput
          icon={<LocationPin className="h-5 w-5 text-dark-700 lg:w-full" />}
          label={locationInputLabel}
          name="location"
          placeholder={locationPlaceholder}
          routeParams={['type']}
          onSelect={handleSelectLocation}
          error={showLocationError}
          onChange={handleChangeLocation}
        />
        <TravelersInput
          showTravelersInput={showTravelersInput}
          onClose={() => setShowTravelersInput(false)}
          rooms={roomsData}
          setRooms={setRoomsData}
        />
        <section className="lg:mt-0 lg:w-full">
          <Label value={guestsAndRoomsLabel} />
          <button
            onClick={() => setShowTravelersInput(true)}
            className="bg-white mt-2 grid grid-cols-2 rounded border border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000 cursor-default"
          >
            <section className="flex items-center gap-2">
              <MultiplePersons className="text-dark-700" />
              {parseInt(adults) + parseInt(children)}{' '}
              {usePlural(
                parseInt(adults) + parseInt(children),
                guestLabel,
                guestsLabel,
              )}
            </section>
            <section className="flex items-center gap-2">
              <Bed className="text-dark-700" />
              {rooms} {usePlural(parseInt(rooms), roomLabel, roomsLabel)}
            </section>
          </button>
        </section>

        <DatePicker
          showDatePicker={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          startDateLabel={checkInText}
          endDateLabel={checkOutText}
          initialStartDate={startDate}
          initialEndDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          openOnStart={clickOnStart ? true : false}
        />
        <section className="flex gap-4 lg:mt-0 lg:w-full">
          <IconInput
            label={checkInText}
            name="Check-in"
            placeholder={checkInText}
            className="lg:mt-0"
            orientation="left"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
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
            className="lg:mt-0"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={fromLowerCaseToCapitilize(formatAsDisplayDate(endDate))}
            onChange={(event) => handleEndDateChange(event.target.value)}
            onClick={() => {
              setClickOnStart(false);
              setShowDatePicker(true);
            }}
            disabled
          />
        </section>
      </section>

      <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
        <Button
          key="hotels.searchBtn"
          size="full"
          className="min-w-full text-base"
          value={textSearch}
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};
export default HotelSearchForm;
