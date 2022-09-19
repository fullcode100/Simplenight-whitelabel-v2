import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import DatePicker from '../Calendar/Calendar';
import TravelersInput from '../TravelersInput/TravelersInput';
import { Room, createRoom } from 'flights/helpers/room';

import Bed from 'public/icons/assets/bed.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import LocationInput from '../Input/LocationInput';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import { setTravelersTotals } from 'flights/helpers/travelers';
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
import FlightSelect from '../FlightSelect/FlightSelect';

const FlightSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('flights');
  const locationInputLabel = t('locationInputLabel', 'Leaving From');
  const location2InputLabel = t('location2InputLabel', 'Going To');
  const textSearch = t('search', 'Search');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  const travelersLabel = t('travelers', 'Travelers');
  const travelerLabel = t('traveler', 'Traveler');
  const roomsLabel = t('rooms', 'Rooms');
  const roomLabel = t('room', 'Room');
  const addFlightLabel = t('addFlight', 'Add Flight');

  const params = useQuery();
  const setQueryParam = useQuerySetter();

  const [flights, setFlights] = useState(['one_way']);
  const [direction, setDirection] = useState(params?.direction?.toString() || 'round_trip');
  const [cabin, setCabin] = useState('economy');

  const [travelersData, setTravelersData] = useState<Room[]>(
    params.travelersData ? JSON.parse(params.travelersData as string) : [createRoom()],
  );
  const [adults, setAdults] = useState(travelersData[0].adults.toString());
  const [children, setChildren] = useState(travelersData[0].children.toString());
  const [infants, setInfants] = useState(travelersData[0].infants.toString());
  const [rooms, setRooms] = useState(travelersData.length.toString());
  const [childrenAges, setChildrenAges] = useState(
    travelersData[0].childrenAges.toString(),
  );
  const [infantsAges, setInfantsAges] = useState(
    travelersData[0].infantsAges.toString(),
  );

  const [address, setAddress] = useState<string>(
    params.address ? (params.address as string) : '',
  );
  const [geolocation, setGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude as string)},${parseFloat(
      params.longitude as string,
    )}`,
  );

  const [address2, setAddress2] = useState<string>(
    params.address2 ? (params.address2 as string) : '',
  );
  const [geolocation2, setGeolocation2] = useState<StringGeolocation>(
    `${parseFloat(params.latitude2 as string)},${parseFloat(
      params.longitude2 as string,
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
      : formatAsSearchDate(dayjs().add(7, 'day')),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);

  const [travelersPlaceholder, setTravelersPlaceholder] = useState('');

  const handleDirectionChange = (value: string) => {
    setDirection(value);
    if (value === 'multi_city') setFlights(['one_way', 'one_way']);
    else setFlights([value]);
  };

  const handleFlightsAdd = () => {
    let _flights = Object.assign([], flights);
    _flights.push('one_way');
    setFlights(_flights);
  };

  const handleFlightsDelete = (index: number) => {
    let _flights = Object.assign([], flights);
    _flights.splice(index, 1);
    setFlights(_flights);
  };

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
    const startAirport = address ? address.split('(').pop().split(')')[0] : '';
    if (!startAirport || startAirport.length !== 3) return alert('Invalid leaving from airport code');
    const endAirport = address2 ? address2.split('(').pop().split(')')[0] : '';
    if (!endAirport || endAirport.length !== 3) return alert('Invalid going to airport code');
    const route = `/search/flights?direction=${direction}&startAirport=${startAirport}&endAirport=${endAirport}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&infants=${infants}&childrenAges=${childrenAges}&infantsAges=${infantsAges}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${address}&latitude2=${
      geolocation2?.split(',')[LATITUDE_INDEX]
    }&longitude2=${
      geolocation2?.split(',')[LONGITUDE_INDEX]
    }&address2=${address2}&travelersData=${JSON.stringify(travelersData)}`;
    handleSaveLastSearch(route);
    router.push(route);
  };

  const handleChangeLocation = () => {
    setShowLocationError(false);
  };

  const handleChangeLocation2 = () => {
    setShowLocationError(false);
  };

  const geolocationIsNull = geolocation === `${NaN},${NaN}`;
  const geolocation2IsNull = geolocation2 === `${NaN},${NaN}`;

  const handleSearchClick = () => {
    if (hasReRoute) {
      if (geolocationIsNull) {
        setShowLocationError(true);
        return;
      }
      if (geolocation2IsNull) {
        setShowLocationError(true);
        return;
      }
      rerouteToSearchPage();
      return;
    }

    const startAirport = address ? address.split('(').pop().split(')')[0] : '';
    if (!startAirport || startAirport.length !== 3) return alert('Invalid leaving from airport code');
    const endAirport = address2 ? address2.split('(').pop().split(')')[0] : '';
    if (!endAirport || endAirport.length !== 3) return alert('Invalid going to airport code');

    const travelersDataFormatted = JSON.stringify(travelersData);
    const _queryParam = {
      direction,
      startAirport,
      endAirport,
      startDate,
      endDate,
      adults,
      children,
      infants,
      childrenAges,
      infantsAges,

      address: address as string,
      geolocation: geolocation ?? '',
      latitude: geolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.split(',')[LONGITUDE_INDEX] ?? '',

      address2: address2 as string,
      geolocation2: geolocation2 ?? '',
      latitude2: geolocation2?.split(',')[LATITUDE_INDEX] ?? '',
      longitude2: geolocation2?.split(',')[LONGITUDE_INDEX] ?? '',

      travelersData: travelersDataFormatted,
    };
    // console.log(_queryParam);
    setQueryParam(_queryParam);
    if (setIsSearching) setIsSearching(false);
  };

  const handleSelectLocation = (latLng: latLngProp, address: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setGeolocation(newGeolocation);
    setAddress(address);
  };

  const handleSelectLocation2 = (latLng2: latLngProp, address2: string) => {
    const newGeolocation2: StringGeolocation = `${latLng2.lat},${latLng2.lng}`;
    setGeolocation2(newGeolocation2);
    setAddress2(address2);
  };

  const locationPlaceholder = t('locationInputPlaceholder', 'Leaving From');
  const location2Placeholder = t('location2InputPlaceholder', 'Going To');

  useEffect(() => {
    setTravelersTotals(travelersData, setAdults, setChildren, setInfants, setChildrenAges, setInfantsAges);
    setRooms(travelersData.length.toString());
  }, [travelersData]);

  useEffect(() => {
    setTravelersPlaceholder(
      `${
        parseInt(adults) + parseInt(children) + parseInt(infants)
      } ${travelersLabel}, ${rooms} ${roomsLabel}`,
    );
  }, [adults, children, infants]);

  return (
    <section
      className={`flex flex-col justify-between px-4 lg:px-0`}
    >
      <section
        className={`flex flex-col justify-between  lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
      >
        <section className="flex flex-col gap-4 lg:flex-row lg:w-[300px] lg:justify-between lg:items-center">
          <FlightSelect value={direction} onChange={handleDirectionChange} />
        </section>

        <TravelersInput
          showTravelersInput={showTravelersInput}
          onClose={() => setShowTravelersInput(false)}
          rooms={travelersData}
          setRooms={setTravelersData}
        />
        <section className="mt-4 lg:mt-0 lg:w-[200px]">
          <Label value={travelersLabel} className="block lg:hidden lg:mb-0" />
          <button
            onClick={() => setShowTravelersInput(true)}
            className="bg-white mt-2 rounded border border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000 cursor-default" // grid grid-cols-2
          >
            <section className="flex items-center gap-2">
              <MultiplePersons className="text-dark-700" />
              {parseInt(adults) + parseInt(children) + parseInt(infants)}{' '}
              {usePlural(
                parseInt(adults) + parseInt(children) + parseInt(infants),
                travelerLabel,
                travelersLabel,
              )}
            </section>
            {/*
            <section className="flex items-center gap-2">
              <Bed className="text-dark-700" />
              {cabin}
            </section>
            */}
          </button>
        </section>
      </section>
      {flights.map((item: string, index) => (
        <section
          key={index}
          className={`flex flex-col justify-between lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0 mt-4 lg:mt-4`}
        >
          <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
            <LocationInput
              icon={<LocationPin className="h-5 w-5 text-dark-700 lg:w-full" />}
              label={locationInputLabel}
              name="location"
              placeholder={locationPlaceholder}
              routeParams={['address']}
              defaultAddress={address}
              onSelect={handleSelectLocation}
              error={showLocationError}
              onChange={handleChangeLocation}
            />
            <LocationInput
              icon={<LocationPin className="h-5 w-5 text-dark-700 lg:w-full" />}
              label={location2InputLabel}
              name="location2"
              placeholder={location2Placeholder}
              routeParams={['address2']}
              defaultAddress={address2}
              onSelect={handleSelectLocation2}
              error={showLocationError}
              onChange={handleChangeLocation2}
            />

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
              {direction === 'round_trip' && (
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
              )}
            </section>
          </section>

          {index < flights.length - 1 ? (
            <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
              <Button
                key="flights.removeBtn"
                size="full"
                className="min-w-full bg-dark-200 text-dark-1000"
                value="X"
                onClick={() => handleFlightsDelete(index)}
              />
            </section>
          ) : (
            <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
              <Button
                key="flights.searchBtn"
                size="full"
                className="min-w-full text-base"
                value={textSearch}
                onClick={handleSearchClick}
              />
            </section>
          )}
        </section>
      ))}

      {direction === 'multi_city' && flights.length < 5 && (
        <section
          className={`flex justify-between items-end`}
        >
          <section className="w-full lg:w-[10%]" />
          <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
            <Button
              key="flights.addBtn"
              size="full"
              className="min-w-full bg-dark-200 text-sm text-primary-1000 self-end"
              value={addFlightLabel}
              onClick={() => handleFlightsAdd()}
            />
          </section>
        </section>
      )}
    </section>
  );
};
export default FlightSearchForm;
