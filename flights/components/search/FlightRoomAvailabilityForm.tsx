import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import DatePicker from '../../../components/global/Calendar/Calendar';
import TravelersInput from '../TravelersInput/TravelersInput';
import { Traveler, createTraveler } from 'flights/helpers/traveler';

import Bed from 'public/icons/assets/bed.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import { setTravelersTotals } from 'flights/helpers/travelers';
import {
  StringGeolocation,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';

const FlightRoomAvailabilityForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('flights');
  const textCheckAvailability = t('checkAvailability', 'Check Availability');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  const guestsLabel = t('guests', 'Guests');
  const guestLabel = t('guest', 'Guest');
  const roomsLabel = t('rooms', 'Rooms');
  const roomLabel = t('room', 'Room');
  const travelersLabel = t('travelers', 'Guests & Rooms');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [roomsData, setRoomsData] = useState<Traveler[]>(
    params.roomsData
      ? JSON.parse(params.roomsData as string)
      : [createTraveler()],
  );
  const [adults, setAdults] = useState(roomsData[0].adults.toString());
  const [children, setChildren] = useState(roomsData[0].children.toString());
  const [infants, setInfants] = useState(roomsData[0].infants.toString());
  const [rooms, setRooms] = useState(roomsData.length.toString());
  const [childrenAges, setChildrenAges] = useState(
    roomsData[0].childrenAges.toString(),
  );
  const [infantsAges, setInfantsAges] = useState(
    roomsData[0].infantsAges.toString(),
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
      : formatAsSearchDate(dayjs().add(7, 'day')),
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

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('FlightSearch', value);
  };

  const rerouteToSearchPage = () => {
    const route = `/search/flights?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&latitude=${
      geolocation?.toString().split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.toString().split(',')[LONGITUDE_INDEX]
    }&address=${address}&rooms=${rooms}&roomsData=${JSON.stringify(roomsData)}`;
    handleSaveLastSearch(route);
    router.push(route);
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
      infants,
      infantsAges,
      address: address as string,
      roomsData: roomsDataFormatted,
    });
    if (setIsSearching) setIsSearching(false);
  };

  useEffect(() => {
    setTravelersTotals(
      roomsData,
      setAdults,
      setChildren,
      setChildrenAges,
      setInfants,
      setInfantsAges,
    );
    setRooms(roomsData.length.toString());
  }, [roomsData]);

  useEffect(() => {
    setTravelersPlaceholder(
      `${
        parseInt(adults) + parseInt(children) + parseInt(infants)
      } ${guestsLabel}, ${rooms} ${roomsLabel}`,
    );
  }, [adults, children, children, infants]);

  return (
    <section
      className={`flex flex-col px-4 pb-4 justify-between ${className} lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
    >
      <section className="lg:flex lg:w-[85%] lg:justify-between lg:items-center lg:gap-4">
        <TravelersInput
          showTravelersInput={showTravelersInput}
          onClose={() => setShowTravelersInput(false)}
          travelers={roomsData}
          setTravelers={setRoomsData}
        />
        <section className="mt-4 lg:mt-0 lg:w-full">
          <p className="text-sm font-medium text-dark-800">{travelersLabel}</p>
          <button
            onClick={() => setShowTravelersInput(true)}
            className="bg-white mt-1 grid grid-cols-2 rounded-md border border-gray-300 w-full py-2 px-[13px] text-sm text-dark-1000 cursor-default"
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
        <section className="flex gap-4 mt-2 lg:mt-0 lg:w-full">
          <IconInput
            label={checkInText}
            name="Check-in"
            placeholder={checkInText}
            className="mt-4 lg:mt-0"
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
        </section>
        <section className="flex gap-4 mt-2 lg:mt-0 lg:w-full">
          <IconInput
            label={checkOutText}
            name="Check-out"
            placeholder={checkOutText}
            orientation="left"
            className="mt-4 lg:mt-0"
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

      <section className="w-full flex items-center justify-center mt-8 lg:w-[15%]">
        <Button
          key="flights.searchBtn"
          className="h-12 min-w-full text-base lg:h-10 lg:mb-1"
          value={textCheckAvailability}
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};
export default FlightRoomAvailabilityForm;
