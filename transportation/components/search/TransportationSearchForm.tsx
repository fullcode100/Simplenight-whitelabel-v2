import dayjs from 'dayjs';
import { useState, useMemo, FC, useEffect } from 'react';
import DatePicker from '../../../components/global/Calendar/Calendar';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { LocationInput } from 'components/global/Input/LocationInputNew';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate } from 'helpers/dajjsUtils';
import {
  StringGeolocation,
  latLngProp,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import { Select } from '../../../components/global/SelectNew/Select';
import Clock from '../../../public/icons/assets/clock.svg';
import Transport from 'public/icons/assets/transport.svg';
import NumberInput from 'components/global/Input/NumberInput';
import { formatAsSearchDate } from '../../../helpers/dajjsUtils';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import TravelersInput from './TravelersInput/TravelersInput';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { SORT_BY_OPTIONS } from 'transportation/constants/sortByOptions';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import { TRIP_OPTIONS } from 'transportation/constants/tripOptions';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import { notification } from 'components/global/Notification/Notification';
import scrollTopSmoothly from 'helpers/scrollTopSmoothly';
import { handleError } from 'helpers/errorUtils';
import { ceilToNextHalfHour } from 'helpers/ceilToNextHalfHour';

export const TransportationSearchForm: FC<SearchFormProps> = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
  slug = '',
}) => {
  const router = useRouter();

  const thirtyMinutesFromNow = dayjs().startOf('day').add(1, 'day');
  const twoHoursAndThirtyMinutes = thirtyMinutesFromNow.add(1, 'day');

  const TIME_SELECTION_FORMAT = 'hh:mm A';
  const nextHalf = ceilToNextHalfHour(dayjs());
  const afterTwoHours = nextHalf.add(2, 'hours');

  const start = nextHalf.format(TIME_SELECTION_FORMAT);
  const end = afterTwoHours.format(TIME_SELECTION_FORMAT);

  const [t] = useTranslation('ground-transportation');
  const [tg] = useTranslation('global');
  const [showSortModal, setShowSortModal] = useState(false);
  const locationPlaceholder = t('locationPlaceholder', 'Location');
  const airportPlaceholder = t('airportPlaceholder', 'Airport');
  const pickUpInputLabel = t('locationInputLabel', 'Pick-Up');
  const dropOffInputLabel = t('locationInputLabel', 'Drop-Off');
  const textSearch = t('search', 'Search');
  const startDateText = t('startDate', 'Date');
  const endDateText = t('endDate', 'Date');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [pickUpAddress, setPickUpAddress] = useState<string | undefined>(
    params.address ? (params.address as string) : '',
  );

  const [dropOffAddress, setDropOffAddress] = useState<string | undefined>(
    params.address2 ? (params.address2 as string) : '',
  );

  const [pickUpGeolocation, setPickUpGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude as string)},${parseFloat(
      params.longitude as string,
    )}`,
  );
  const [dropOffGeolocation, setDropOffGeolocation] =
    useState<StringGeolocation>(
      `${parseFloat(params.latitude2 as string)},${parseFloat(
        params.longitude2 as string,
      )}`,
    );

  const [airportIcon, setAirportIcon] = useState({
    pickUp: params.pickUp ? (params.pickUp as string) : '',
    dropOff: params.dropOff ? (params.dropOff as string) : '',
  });

  const [startDate, setStartDate] = useState<string>(
    params.startDate
      ? params.startDate.toString()
      : formatAsSearchDate(thirtyMinutesFromNow),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(twoHoursAndThirtyMinutes),
  );

  const [trip, setTrip] = useState(
    params.trip ? (params.trip as string) : 'oneWay',
  );

  const timeList = useMemo(() => {
    const today = dayjs().startOf('day');
    return Array(48)
      .fill(5)
      .map((_, index) => {
        const thirtyMinutesMore = today.add(30 * index, 'minutes');
        return {
          label: thirtyMinutesMore.format(TIME_SELECTION_FORMAT),
          value: thirtyMinutesMore.format(TIME_SELECTION_FORMAT),
        };
      });
  }, []);

  const [startTime, setStartTime] = useState<string>(
    params.startTime
      ? params.startTime.toString()
      : timeList.find((item) => item.value === start)?.value ||
          timeList[0].value,
  );
  const [endTime, setEndTime] = useState<string>(
    params.endTime
      ? params.endTime.toString()
      : timeList.find((item) => item.value === end)?.value || timeList[0].value,
  );

  const [passengers, setPassengers] = useState(
    params.passengers ? Number(params.passengers) : 1,
  );
  const passengersLabel = t(
    'passengers',
    passengers >= 2 ? 'Passengers' : 'Passenger',
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [pickUpShowLocationError, setPickUpShowLocationError] = useState(false);
  const [dropOffShowLocationError, setDropOffShowLocationError] =
    useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);
  const [showEndTimeError, setShowEndTimeError] = useState(false);
  const [showStartTimeError, setShowStartTimeError] = useState(false);

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleEndTimeChange = (endTime: string) => {
    setEndTime(endTime);
    setShowEndTimeError(false);
  };

  const handleStartTimeChange = (endTime: string) => {
    setStartTime(endTime);
    setShowStartTimeError(false);
  };

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('lastSearch', value);
  };

  const rerouteToSearchPage = () => {
    const route = `/search/${slug}?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&latitude=${
      pickUpGeolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      pickUpGeolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${pickUpAddress}&latitude2=${
      dropOffGeolocation?.split(',')[LATITUDE_INDEX]
    }&longitude2=${
      dropOffGeolocation?.split(',')[LONGITUDE_INDEX]
    }&address2=${dropOffAddress}&trip=${trip}&passengers=${passengers}&pickUp=${
      airportIcon.pickUp
    }&dropOff=${airportIcon.dropOff}`;

    handleSaveLastSearch(route);
    router.push(route);
  };

  const handleChangePickUpLocation = () => {
    setPickUpShowLocationError(false);
  };
  const handleChangeDropOffLocation = () => {
    setDropOffShowLocationError(false);
  };
  const geolocationPickUpIsNull = pickUpGeolocation === `${NaN},${NaN}`;
  const geolocationDropOffIsNull = dropOffGeolocation === `${NaN},${NaN}`;

  const handleSearchClick = () => {
    if (hasReRoute) {
      if (geolocationPickUpIsNull) {
        setPickUpShowLocationError(true);
        return;
      }
      if (geolocationDropOffIsNull) {
        setDropOffShowLocationError(true);
        return;
      }
      if (geolocationPickUpIsNull || geolocationDropOffIsNull) {
        return;
      }
      if (
        airportIcon?.pickUp !== 'airport-terminal' &&
        airportIcon?.dropOff !== 'airport-terminal'
      ) {
        setPickUpShowLocationError(true);
        setDropOffShowLocationError(true);
        notification('', 'Airport address is required', 'error');
        return;
      }
      rerouteToSearchPage();
      return;
    }
    setQueryParam({
      startDate,
      startTime,
      endDate,
      endTime,
      address: pickUpAddress as string,
      geolocation: pickUpGeolocation ?? '',
      latitude: pickUpGeolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: pickUpGeolocation?.split(',')[LONGITUDE_INDEX] ?? '',
      address2: dropOffAddress as string,
      geolocation2: dropOffGeolocation ?? '',
      latitude2: dropOffGeolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude2: dropOffGeolocation?.split(',')[LONGITUDE_INDEX] ?? '',
      trip: trip,
      passengers: `${passengers}`,
      pickUp: airportIcon.pickUp,
      dropOff: airportIcon.dropOff,
    });
    if (setIsSearching) setIsSearching(false);
  };

  const handleSelectPickUpLocation = (
    latLng: latLngProp,
    address: string,
    types?: string[],
  ) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setPickUpGeolocation(newGeolocation);
    setPickUpAddress(address);
    if (types?.includes('airport')) {
      setAirportIcon({ pickUp: 'airport-terminal', dropOff: 'Address' });
    } else {
      setAirportIcon({ pickUp: 'Address', dropOff: 'airport-terminal' });
    }
  };
  const handleSelectDropOffLocation = (
    latLng: latLngProp,
    address: string,
    types?: string[],
  ) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setDropOffGeolocation(newGeolocation);
    setDropOffAddress(address);
    if (types?.includes('airport')) {
      setAirportIcon({ pickUp: 'Address', dropOff: 'airport-terminal' });
    } else {
      setAirportIcon({ pickUp: 'airport-terminal', dropOff: 'Address' });
    }
  };

  const onChangeTrip = (value: string) => {
    setTrip(value);
  };

  useEffect(() => {
    if (params.address && !params.address2) {
      if (params?.address?.includes('Airport' || 'Terminal')) {
        setAirportIcon({ pickUp: 'airport-terminal', dropOff: 'Address' });
      } else {
        setAirportIcon({ pickUp: 'Address', dropOff: 'airport-terminal' });
      }
    }
  }, []);

  const isHomePage = router.pathname === '/';

  return (
    <section
      className={`flex flex-col justify-between ${className} lg:flex-row lg:justify-start lg:items-start lg:pb-0 lg:px-0 lg:gap-2 lg:w-full`}
    >
      <section className="flex flex-col gap-4 lg:flex lg:flex-col lg:justify-start lg:pb-0 lg:px-0 lg:gap-1 lg:w-[90%]">
        <section className="flex flex-col lg:flex lg:flex-row lg:items-end lg:w-full">
          <section className="relative flex flex-col gap-2 lg:flex-row lg:w-full">
            <section className="w-full lg:flex lg:flex-row lg:items-end lg:w-1/2 lg:gap-2">
              <section className="w-full lg:w-[40%]">
                <LocationInput
                  label={pickUpInputLabel}
                  icon={
                    airportIcon.pickUp === 'airport-terminal' ? (
                      <Transport className="w-5 h-5 text-dark-700" />
                    ) : (
                      <LocationPin className="w-5 h-5 text-dark-700" />
                    )
                  }
                  name="location"
                  placeholder={
                    airportIcon.pickUp === 'airport-terminal'
                      ? airportPlaceholder
                      : locationPlaceholder
                  }
                  routeParams={['address']}
                  defaultValue={pickUpAddress}
                  onSelect={handleSelectPickUpLocation}
                  error={pickUpShowLocationError}
                  onChange={handleChangePickUpLocation}
                  addressOnly={true}
                />
              </section>
              <section className="relative flex gap-2 lg:mt-0 lg:w-[60%] lg:pt-4">
                <IconInput
                  name="Check-in"
                  className="w-full lg:w-full"
                  placeholder={startDateText}
                  orientation="left"
                  icon={
                    <Calendar className="w-5 h-5 text-dark-700 lg:w-full" />
                  }
                  value={fromLowerCaseToCapitilize(
                    formatAsDisplayDate(startDate),
                  )}
                  onChange={(event) => {
                    handleStartDateChange(event.target.value);
                  }}
                  onClick={() => {
                    setClickOnStart(true);
                    setShowDatePicker(true);
                    isHomePage && scrollTopSmoothly();
                  }}
                />
                <Select
                  name="Check-in-time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  items={timeList}
                  icon={<Clock className="w-5 h-5 text-dark-700" />}
                  error={showStartTimeError}
                />
                <DatePicker
                  showDatePicker={showDatePicker}
                  onClose={() => setShowDatePicker(false)}
                  startDateLabel={pickUpInputLabel}
                  endDateLabel={dropOffInputLabel}
                  initialStartDate={startDate}
                  initialEndDate={endDate}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                  openOnStart={clickOnStart ? true : false}
                  isRange={trip === 'roundTrip' ? true : false}
                />
              </section>
            </section>
            <section className="w-full lg:flex lg:flex-row lg:items-end lg:w-1/2 lg:gap-2">
              <section
                className={`w-full ${
                  trip === 'roundTrip' ? 'lg:w-[40%]' : 'lg:w-full'
                }`}
              >
                <LocationInput
                  icon={
                    airportIcon.dropOff === 'airport-terminal' ? (
                      <Transport className="w-5 h-5 text-dark-700" />
                    ) : (
                      <LocationPin className="w-5 h-5 text-dark-700" />
                    )
                  }
                  label={dropOffInputLabel}
                  name="location2"
                  routeParams={['address2']}
                  defaultValue={dropOffAddress}
                  placeholder={
                    airportIcon.dropOff === 'airport-terminal'
                      ? airportPlaceholder
                      : locationPlaceholder
                  }
                  onSelect={handleSelectDropOffLocation}
                  error={dropOffShowLocationError}
                  onChange={handleChangeDropOffLocation}
                  addressOnly={true}
                />
              </section>
              {trip === 'roundTrip' && (
                <section className="relative flex gap-2 lg:mt-0 lg:w-[60%]">
                  <IconInput
                    name="Check-in"
                    placeholder={endDateText}
                    className="w-full lg:w-full"
                    orientation="left"
                    icon={
                      <Calendar className="w-5 h-5 text-dark-700 lg:w-full" />
                    }
                    value={fromLowerCaseToCapitilize(
                      formatAsDisplayDate(endDate),
                    )}
                    onChange={(event) =>
                      handleStartDateChange(event.target.value)
                    }
                    onClick={() => {
                      setClickOnStart(true);
                      setShowDatePicker(true);
                    }}
                  />
                  <Select
                    name="Check-out-time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    items={timeList}
                    icon={<Clock className="w-5 h-5 text-dark-700" />}
                    error={showEndTimeError}
                  />
                </section>
              )}
            </section>
          </section>
        </section>
        <section className="flex flex-col justify-start items-start gap-2 lg:flex lg:flex-row lg:w-[90%] lg:justify-start lg:items-center lg:gap-2">
          <section className="relative w-full lg:w-[110px]">
            <section
              className={`absolute z-10 border border-dark-300 rounded shadow-container bg-white top-12 w-[256px] transition-all duration-500 text-dark-1000 ${
                !showSortModal && 'opacity-0 invisible'
              }`}
            >
              <RadioGroup onChange={onChangeTrip} value={trip} gap="gap-0">
                {TRIP_OPTIONS.map((option, i) => (
                  <Radio
                    key={i}
                    value={option?.value}
                    containerClass={`px-3 py-2 ${
                      i < SORT_BY_OPTIONS.length - 1 &&
                      'border-b border-dark-200'
                    }`}
                  >
                    <p className={'hover:cursor-pointer'}>{tg(option.label)}</p>
                  </Radio>
                ))}
              </RadioGroup>
            </section>
            <section className="w-full flex flex-row justify-start lg:mt-0 lg:w-full lg:flex lg:flex-row lg:justify-center lg:items-center">
              <button
                className="flex flex-row justify-between items-center gap-2 bg-white rounded border border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000 cursor-default"
                onClick={() => setShowSortModal(!showSortModal)}
                onBlur={() => setShowSortModal(false)}
              >
                <span className="text-xs font-semibold text-dark-1000 lg:flex">
                  {tg(
                    TRIP_OPTIONS.find((option) => option.value == trip)
                      ?.label ?? '',
                  )}
                </span>
                <Chevron />
              </button>
            </section>
          </section>
          <TravelersInput
            showTravelersInput={showTravelersInput}
            onClose={() => setShowTravelersInput(false)}
            // eslint-disable-next-line react/no-children-prop
            children={
              <NumberInput
                label={passengersLabel}
                value={passengers}
                onChange={setPassengers}
                min={1}
                max={20}
                disabled
              />
            }
          />
          <section className="w-full flex flex-row justify-start lg:mt-0 lg:w-fit lg:flex lg:flex-row lg:justify-center lg:items-center">
            <button
              onClick={() => setShowTravelersInput(true)}
              className="flex flex-row justify-start items-center gap-2 bg-white rounded border border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000 cursor-default lg:w-full lg:flex lg:flex-row lg:justify-start lg:items-center lg:gap-2"
            >
              <MultiplePersons className="text-dark-700" />
              {passengers} {passengersLabel}
            </button>
          </section>
        </section>
      </section>
      <section className="w-full flex flex-col items-center justify-start lg:flex lg:flex-col lg:justify-start lg:w-[10%]">
        <label className="text-transparent">Button</label>
        <Button
          key="hotels.searchBtn"
          size="full"
          className="min-w-full text-base mt-2"
          value={textSearch}
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};
