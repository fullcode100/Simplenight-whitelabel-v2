import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import DatePicker from '../../../components/global/Calendar/Calendar';
import TravelersInput from '../TravelersInput/TravelersInput';
import { Room, createRoom } from 'hotels/helpers/room';

import LocationPin from 'public/icons/assets/location-pin.svg';
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
import scrollTopSmoothly from 'helpers/scrollTopSmoothly';
import { Paragraph } from '@simplenight/ui';

const HotelSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
  slug = '',
}: SearchFormProps) => {
  const router = useRouter();
  const [t, i18next] = useTranslation('hotels');
  const locationInputLabel = t('locationInputLabel', 'Destination');
  const textSearch = t('search', 'Search');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  const guestsLabel = t('guests', 'Guests');

  const bookThePerfectHotelLabel = t(
    'bookThePerfectHotel',
    ' Book the perfect hotel by comparing prices and reading reviews.',
  );

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [roomsData, setRoomsData] = useState<Room[]>(
    params.roomsData ? JSON.parse(params.roomsData as string) : [createRoom()],
  );
  const [adults, setAdults] = useState(roomsData[0].adults.toString());
  const [children, setChildren] = useState(
    roomsData[0].children.toString() + roomsData[0].infants.toString(),
  );
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
      : formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(2, 'day')),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);

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
    const route = `/search/${slug}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${encodeURIComponent(
      address || '',
    )}&rooms=${rooms}&roomsData=${JSON.stringify(roomsData)}`;
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
    const encodedAddress = encodeURIComponent(address || '');
    const roomsDataFormatted = JSON.stringify(roomsData);
    setQueryParam({
      startDate,
      endDate,
      rooms,
      adults,
      children,
      childrenAges,
      address: encodedAddress,
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
    'Where are you going?',
  );

  if (params.endDate && params.startDate && !params.roomsData) {
    const isSameToday =
      params.startDate.toString() === formatAsSearchDate(dayjs());
    const encodedAddress = encodeURIComponent(address || '');
    const roomsDataFormatted = JSON.stringify(roomsData);
    let newStartDate = '';
    let newEndDate = '';
    if (params.endDate === params.startDate) {
      newStartDate = isSameToday
        ? formatAsSearchDate(dayjs().add(1, 'day')).toString()
        : params.startDate.toString();
      newEndDate = isSameToday
        ? formatAsSearchDate(dayjs().add(2, 'day')).toString()
        : formatAsSearchDate(dayjs(params.startDate.toString()).add(1, 'day'));
    } else {
      newStartDate = isSameToday
        ? formatAsSearchDate(dayjs().add(1, 'day')).toString()
        : params.startDate.toString();
      newEndDate =
        params.endDate.toString() ===
        formatAsSearchDate(dayjs().add(1, 'day')).toString()
          ? formatAsSearchDate(dayjs().add(2, 'day')).toString()
          : params.endDate.toString();
    }
    setQueryParam({
      startDate: newStartDate,
      endDate: newEndDate,
      rooms: '1',
      adults: '2',
      children: '0',
      childrenAges,
      address: encodedAddress,
      geolocation: geolocation ?? '',
      latitude: geolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.split(',')[LONGITUDE_INDEX] ?? '',
      roomsData: roomsDataFormatted,
    });
  }

  useEffect(() => {
    setTravelersTotals(roomsData, setAdults, setChildren, setChildrenAges);
    setRooms(roomsData.length.toString());
  }, [roomsData]);

  const isHomePage = router.pathname === '/';
  const isDetailPage = router.pathname === '/detail/[slug]/[id]';

  return (
    <section className={'flex flex-col lg:gap-4 lg:pb-0 lg:px-0'}>
      {isHomePage && (
        <Paragraph fontWeight="semibold" size="large" className="capitalize">
          {bookThePerfectHotelLabel}
        </Paragraph>
      )}
      <div
        className={`flex flex-col justify-between ${className} lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
      >
        <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
          <section className="flex flex-col-reverse lg:lg:flex-row gap-4 lg:w-[100%]">
            {!isDetailPage && (
              <LocationInput
                icon={
                  <LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />
                }
                label={locationInputLabel}
                name="location"
                placeholder={locationPlaceholder}
                restrictToCities={true}
                routeParams={['address']}
                onSelect={handleSelectLocation}
                error={showLocationError}
                onChange={handleChangeLocation}
              />
            )}
            <section
              className={`lg:mt-0 ${
                isDetailPage ? 'lg:w-[100%]' : 'lg:w-[50%]'
              }`}
            >
              <Label className="hidden lg:block" value={guestsLabel} />
              <TravelersInput
                showTravelersInput={showTravelersInput}
                onClose={() => setShowTravelersInput(false)}
                rooms={roomsData}
                setRooms={setRoomsData}
                setShowTravelersInput={setShowTravelersInput}
                adults={adults}
                children={children}
              />
            </section>
          </section>

          <section className="relative flex gap-4 lg:mt-0 lg:w-full">
            <IconInput
              label={checkInText}
              name="Check-in"
              placeholder={checkInText}
              className="lg:mt-0"
              orientation="left"
              icon={<Calendar className="w-5 h-5 text-dark-700" />}
              value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
              onChange={(event) => handleStartDateChange(event.target.value)}
              onClick={() => {
                setClickOnStart(true);
                setShowDatePicker(true);
                isHomePage && scrollTopSmoothly();
              }}
            />
            <IconInput
              label={checkOutText}
              name="Check-out"
              placeholder={checkOutText}
              orientation="left"
              className="lg:mt-0"
              icon={<Calendar className="w-5 h-5 text-dark-700" />}
              value={fromLowerCaseToCapitilize(formatAsDisplayDate(endDate))}
              onChange={(event) => handleEndDateChange(event.target.value)}
              onClick={() => {
                setClickOnStart(false);
                setShowDatePicker(true);
                isHomePage && scrollTopSmoothly();
              }}
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
              maxRange={28}
              maxMonthsDisplayed={13}
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
      </div>
    </section>
  );
};
export default HotelSearchForm;
