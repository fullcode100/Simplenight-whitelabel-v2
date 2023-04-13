import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { usePlural } from '../../../hooks/stringBehavior/usePlural';
// import DatePicker from '../../../components/global/Calendar/Calendar';
import DatePicker from '../Calendar/Calendar';
import TravelersInput from '../TravelersInput/TravelersInput';
import { Traveler, createTraveler } from 'flights/helpers/traveler';

import Bed from 'public/icons/assets/bed.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import { Button } from '@simplenight/ui';
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
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import { Popover } from '@headlessui/react';
import useMediaViewport from 'hooks/media/useMediaViewport';
import TravelersInputPopper from '../TravelersInput/TravelersInputPopper';
import PlusIcon from 'public/icons/assets/flights/plus.svg';
import TrashIcon from 'public/icons/assets/flights/trash.svg';
import Popper from 'components/global/Popper/Popper';
import TravelersSelect from '../TravelersSelect/TravelersSelect';

interface LocationInputRef {
  getAddress: () => string | undefined;
  setNewAddress: (address: string) => void;
}

const FlightSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();
  const { isDesktop } = useMediaViewport();
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
  const removeFlightLabel = t('removeFlight', 'Remove');
  const flightLabel = t('flight', 'Flight');
  const showFlights = t('show', 'Show');
  const hideFlights = t('hide', 'Hide');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [direction, setDirection] = useState(
    params?.direction?.toString() || 'round_trip',
  );
  const [cabin, setCabin] = useState('economy');

  const [travelersData, setTravelersData] = useState<Traveler[]>(
    params.travelersData
      ? JSON.parse(params.travelersData as string)
      : [createTraveler()],
  );
  const [adults, setAdults] = useState(travelersData[0].adults.toString());
  const [children, setChildren] = useState(
    travelersData[0].children.toString(),
  );
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
    params.address2 && params.address !== params.address2
      ? (params.address2 as string)
      : '',
  );
  const [geolocation2, setGeolocation2] = useState<StringGeolocation>(
    `${parseFloat(params.latitude2 as string)},${parseFloat(
      params.longitude2 as string,
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
      : formatAsSearchDate(dayjs().add(8, 'day')),
  );

  // multi city
  const [startDates, setStartDates] = useState<string[]>(
    params.startDates ? params.startDates.toString().split('|') : [startDate],
  );
  const [addresses, setAddresses] = useState<string[]>(
    params.addresses ? params.addresses.toString().split('|') : [address],
  );
  const [addresses2, setAddresses2] = useState<string[]>(
    params.addresses2 ? params.addresses2.toString().split('|') : [address2],
  );
  const [shortNames, setShortNames] = useState<string[]>([]);
  const [shortNames2, setShortNames2] = useState<string[]>([]);

  let _flights: string[] = [];
  if (direction === 'multi_city') {
    if (params.startDates) {
      for (
        let i = 0;
        i < params.startDates.toString().split('|').length;
        i += 1
      ) {
        _flights.push('one_way');
      }
    } else _flights = ['one_way'];
  } else _flights = [direction];
  const [flights, setFlights] = useState<string[]>(_flights);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);

  const [travelersPlaceholder, setTravelersPlaceholder] = useState('');

  const handleDirectionChange = (value: string) => {
    setDirection(value);
    if (value === 'multi_city') {
      setFlights(['one_way']);
      setStartDates([startDate]);
      setAddresses([address]);
      setAddresses2([address2]);
    } else setFlights([value]);
  };

  const handleFlightsAdd = () => {
    const _flights = Object.assign([], flights);
    _flights.push('one_way');
    setFlights(_flights);

    const dates: string[] = Object.assign([], startDates);
    dates.push(
      startDates[startDates.length - 1]
        ? startDates[startDates.length - 1]
        : formatAsSearchDate(dayjs()),
    );
    setStartDates(dates);

    const addrs: string[] = Object.assign([], addresses);
    addrs.push(
      addresses2[addresses2.length - 1]
        ? addresses2[addresses2.length - 1]
        : '',
    );
    setAddresses(addrs);

    const addrs2: string[] = Object.assign([], addresses2);
    addrs2.push('');
    setAddresses2(addrs2);
  };

  const handleFlightsDelete = (index: number) => {
    if (flights.length < 2) return;
    const _flights = Object.assign([], flights);
    _flights.splice(index, 1);
    setFlights(_flights);

    const dates: string[] = Object.assign([], startDates);
    dates.splice(index, 1);
    setStartDates(dates);

    const addrs: string[] = Object.assign([], addresses);
    addrs.splice(index, 1);
    setAddresses(addrs);

    const addrs2: string[] = Object.assign([], addresses2);
    addrs2.splice(index, 1);
    setAddresses2(addrs2);
  };

  const handleSelectLocation = (
    latLng: latLngProp,
    addr: string,
    index: number,
    shortName: string,
  ) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    if (index < 1) {
      setGeolocation(newGeolocation);
      setAddress(addr);
    }
    const addrs: string[] = Object.assign([], addresses);
    addrs[index] = addr;
    setAddresses(addrs);
    const shorts: string[] = Object.assign([], shortNames);
    shorts[index] = shortName;
    setShortNames(shorts);
  };

  const cleanSelectLocation = (index: number) => {
    const addrs: string[] = Object.assign([], addresses);
    addrs[index] = '';
    setAddresses(addrs);
    const shorts: string[] = Object.assign([], shortNames);
    shorts[index] = '';
    setShortNames(shorts);
  };

  const handleSelectLocation2 = (
    latLng: latLngProp,
    addr: string,
    index: number,
    shortName: string,
  ) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    if (index < 1) {
      setGeolocation2(newGeolocation);
      setAddress2(addr);
    }
    const addrs2: string[] = Object.assign([], addresses2);
    addrs2[index] = addr;
    const nextItemIndex = index + 1;
    const addrs: string[] = Object.assign([], addresses);
    if (addrs[nextItemIndex] === '') {
      addrs[nextItemIndex] = addr;
      setAddresses(addrs);
      const shorts: string[] = Object.assign([], shortNames);
      shorts[nextItemIndex] = shortName;
      setShortNames(shorts);
    }
    setAddresses2(addrs2);
    const shorts: string[] = Object.assign([], shortNames2);
    shorts[index] = shortName;
    setShortNames2(shorts);
  };

  const cleanSelectLocation2 = (index: number) => {
    const addrs2: string[] = Object.assign([], addresses2);
    addrs2[index] = '';
    setAddresses2(addrs2);
    const shorts: string[] = Object.assign([], shortNames2);
    shorts[index] = '';
    setShortNames2(shorts);
  };

  const handleStartDateChange = (value: string, index: number) => {
    if (index < 1) {
      setStartDate(value);
    }
    const dates: string[] = Object.assign([], startDates);
    dates[index] = value;
    setStartDates(dates);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('FlightSearch', value);
  };

  const rerouteToSearchPage = () => {
    const _address = address.toString().split('(').pop();
    const startAirport = _address ? _address.toString().split(')')[0] : '';
    if (!startAirport || startAirport.length !== 3)
      return alert('Can not find leaving from Airport Code');
    const _address2 = address2.toString().split('(').pop();
    const endAirport = _address2 ? _address2.toString().split(')')[0] : '';
    if (!endAirport || endAirport.length !== 3)
      return alert('Can not find going to Airport Code');

    // multi city
    const startAirports: string[] = [];
    const endAirports: string[] = [];
    if (direction === 'multi_city') {
      addresses.forEach((addr: string, index: number) => {
        const _addr = addr.toString().split('(').pop();
        const airportCode = _addr ? _addr.toString().split(')')[0] : '';
        if (!airportCode || airportCode.length !== 3)
          return alert(
            `Can not find leaving from Airport Code for flight #${index + 1}`,
          );
        startAirports.push(airportCode);
      });
      addresses2.forEach((addr: string, index: number) => {
        const _addr = addr.toString().split('(').pop();
        const airportCode = _addr ? _addr.toString().split(')')[0] : '';
        if (!airportCode || airportCode.length !== 3)
          return alert(
            `Can not find leaving from Airport Code for flight #${index + 1}`,
          );
        endAirports.push(airportCode);
      });
    }

    let route = `/search/flights?direction=${direction}&startAirport=${startAirport}&endAirport=${endAirport}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&infants=${infants}&childrenAges=${childrenAges}&infantsAges=${infantsAges}&latitude=${
      geolocation?.toString().split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.toString().split(',')[LONGITUDE_INDEX]
    }&address=${address}&latitude2=${
      geolocation2?.toString().split(',')[LATITUDE_INDEX]
    }&longitude2=${
      geolocation2?.toString().split(',')[LONGITUDE_INDEX]
    }&address2=${address2}&travelersData=${JSON.stringify(travelersData)}`;
    if (direction === 'multi_city')
      route = `${route}&startAirports=${startAirports.join(
        '|',
      )}&endAirports=${endAirports.join('|')}&startDates=${startDates.join(
        '|',
      )}&addresses=${addresses.join('|')}&addresses2=${addresses2.join('|')}`;
    handleSaveLastSearch(route);
    router.push(route);
  };

  const geolocationIsNull = geolocation === `${NaN},${NaN}`;
  const geolocation2IsNull = geolocation2 === `${NaN},${NaN}`;

  const handleSearchClick = () => {
    // if (hasReRoute) {
    if (geolocationIsNull) {
      setShowLocationError(true);
      return;
    }
    if (geolocation2IsNull) {
      setShowLocationError(true);
      return;
    }
    rerouteToSearchPage();
  };

  const locationPlaceholder = t('locationInputPlaceholder', 'Leaving From');
  const location2Placeholder = t('location2InputPlaceholder', 'Going To');

  useEffect(() => {
    setTravelersTotals(
      travelersData,
      setAdults,
      setChildren,
      setInfants,
      setChildrenAges,
      setInfantsAges,
    );
    setRooms(travelersData.length.toString());
  }, [travelersData]);

  useEffect(() => {
    setTravelersPlaceholder(
      `${
        parseInt(adults) + parseInt(children) + parseInt(infants)
      } ${travelersLabel}, ${rooms} ${roomsLabel}`,
    );
  }, [adults, children, infants]);

  useEffect(() => {
    if (!params?.direction && address && address2) {
      // got here by switching tabs --> perform an auto-search
    }
  }, []);

  const travelerLabelText = usePlural(
    parseInt(adults) + parseInt(children) + parseInt(infants),
    travelerLabel,
    travelersLabel,
  );
  const refLocationInputFrom = useRef<LocationInputRef>(null);
  const refLocationInputTo = useRef<LocationInputRef>(null);

  const swap = () => {
    const locationInput1State = refLocationInputFrom?.current;
    const locationInput2State = refLocationInputTo?.current;
    const from = locationInput1State?.getAddress();
    const to = locationInput2State?.getAddress();
    if (from && to) {
      locationInput1State?.setNewAddress(to);
      locationInput2State?.setNewAddress(from);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const classNameSwapButton = classnames('justify-center', {
    hidden: direction === 'multi_city',
    flex: direction !== 'multi_city',
  });

  const classNameInputSection = classnames(
    'w-full flex flex-col lg:flex-row lg:w-[90%] lg:justify-between lg:items-center justify-center',
    {
      'gap-4': direction === 'multi_city',
    },
  );

  const classNameChevron = classnames('fill-current h-4 w-4', {
    'rotate-180': isOpen,
  });

  const classNameCollapseButton = classnames('flex justify-end mb-[-1rem]', {
    hidden: direction !== 'multi_city' || router.pathname === '/' || !isDesktop,
  });

  const classNameDatepicker = classnames('flex gap-4 lg:mt-0 lg:w-full', {
    'max-w-xs': direction !== 'round_trip',
  });

  const fisrtLeavingFrom =
    shortNames[0] || localStorage.getItem('fisrtLeavingFrom');
  const lastGoingTo =
    shortNames2[shortNames2.length - 1] || localStorage.getItem('lastGoingTo');

  useEffect(() => {
    if (fisrtLeavingFrom !== undefined) {
      localStorage.setItem('fisrtLeavingFrom', fisrtLeavingFrom || '');
    }
    if (lastGoingTo !== undefined) {
      localStorage.setItem('lastGoingTo', lastGoingTo || '');
    }
  }, [fisrtLeavingFrom, lastGoingTo]);

  return (
    <>
      <section className={classNameCollapseButton}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center self-end bg-transparent text-gray-600 text-xs text-right lg:text-center h-8 w-24 py-0 hover:border-gray-400 focus:outline-none z-10"
        >
          <span className="pr-1 font-semibold flex-1">
            {isOpen ? hideFlights : showFlights}
          </span>
          <span>
            <svg
              className={classNameChevron}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </button>
      </section>
      <Collapse isOpened={isOpen}>
        <section
          className={
            'flex flex-col justify-between px-4 lg:px-0 overflow-y-auto lg:overflow-visible'
          }
        >
          {flights.map((item: string, flightIndex: number) => (
            <section key={flightIndex} className="flex flex-col">
              {direction === 'multi_city' && (
                <section className="w-full mt-5">
                  <Label
                    value={`${flightLabel} #${flightIndex + 1}`}
                    className="block text-sm font-normal text-dark-500"
                  />
                </section>
              )}
              <section
                className={
                  'flex flex-col justify-between lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0 mt-4 lg:mt-4'
                }
              >
                <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
                  <section className={classNameInputSection}>
                    <LocationInput
                      icon={
                        <LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />
                      }
                      label={locationInputLabel}
                      name="location"
                      placeholder={locationPlaceholder}
                      routeParams={['address']}
                      defaultAddress={
                        direction === 'multi_city'
                          ? addresses[flightIndex]
                          : address
                      }
                      onSelect={(
                        latLng: latLngProp,
                        address: string,
                        shortName: string,
                      ) =>
                        handleSelectLocation(
                          latLng,
                          address,
                          flightIndex,
                          shortName,
                        )
                      }
                      onChange={() => setShowLocationError(false)}
                      autoFocus={!address ? true : false}
                      clearShortNames={() => cleanSelectLocation(flightIndex)}
                      ref={refLocationInputFrom}
                    />
                    <div className={classNameSwapButton}>
                      <button
                        onClick={() => swap()}
                        className="w-8 h-8 p-0.5 mt-[-0.25rem] mb-[-1.75rem] lg:mt-6 lg:mb-0 lg:mx-[-0.75rem] rounded-full flex justify-center items-center border border-gray-300  hover:bg-gray-400 bg-white z-10 text-dark-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 1rem 1rem"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                          />
                        </svg>
                      </button>
                    </div>
                    <LocationInput
                      icon={
                        <LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />
                      }
                      label={location2InputLabel}
                      name="location2"
                      placeholder={location2Placeholder}
                      routeParams={['address2']}
                      defaultAddress={
                        direction === 'multi_city'
                          ? addresses2[flightIndex]
                          : address2
                      }
                      onSelect={(
                        latLng: latLngProp,
                        address: string,
                        shortName: string,
                      ) =>
                        handleSelectLocation2(
                          latLng,
                          address,
                          flightIndex,
                          shortName,
                        )
                      }
                      onChange={() => setShowLocationError(false)}
                      autoFocus={address && !address2 ? true : false}
                      clearShortNames={() => {
                        cleanSelectLocation2(flightIndex);
                      }}
                      ref={refLocationInputTo}
                    />
                  </section>
                  <DatePicker
                    showDatePicker={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    startDateLabel={checkInText}
                    endDateLabel={checkOutText}
                    initialStartDate={
                      direction === 'multi_city'
                        ? startDates[flightIndex]
                        : startDate
                    }
                    initialEndDate={endDate}
                    onStartDateChange={(value) =>
                      handleStartDateChange(value, flightIndex)
                    }
                    onEndDateChange={handleEndDateChange}
                    openOnStart={clickOnStart ? true : false}
                    equal={direction !== 'round_trip'}
                    // isRange={direction === 'round_trip'}
                  />
                  <section className={classNameDatepicker}>
                    <IconInput
                      label={checkInText}
                      name="Check-in"
                      placeholder={checkInText}
                      className="lg:mt-0"
                      orientation="left"
                      icon={<Calendar className="w-5 h-5 text-dark-700" />}
                      value={fromLowerCaseToCapitilize(
                        formatAsDisplayDate(
                          direction === 'multi_city'
                            ? startDates[flightIndex]
                            : startDate,
                        ),
                      )}
                      onChange={(event) =>
                        handleStartDateChange(event.target.value, flightIndex)
                      }
                      onClick={() => {
                        setClickOnStart(true);
                        setShowDatePicker(true);
                      }}
                    />
                    {direction === 'round_trip' && (
                      <IconInput
                        label={checkOutText}
                        name="Check-out"
                        placeholder={checkOutText}
                        orientation="left"
                        className="lg:mt-0"
                        icon={<Calendar className="w-5 h-5 text-dark-700" />}
                        value={fromLowerCaseToCapitilize(
                          formatAsDisplayDate(endDate),
                        )}
                        onChange={(event) =>
                          handleEndDateChange(event.target.value)
                        }
                        onClick={() => {
                          setClickOnStart(false);
                          setShowDatePicker(true);
                        }}
                      />
                    )}
                  </section>
                </section>

                {flights.length !== 1 ? (
                  <section>
                    <Button
                      onClick={() => handleFlightsDelete(flightIndex)}
                      type="secondary"
                      icon={<TrashIcon />}
                      compact
                    >
                      {removeFlightLabel}
                    </Button>
                  </section>
                ) : (
                  <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
                    <Button key="flights.searchBtn" onClick={handleSearchClick}>
                      {textSearch}
                    </Button>
                  </section>
                )}
              </section>
            </section>
          ))}

          <section className="flex flex-row justify-between">
            <section
              className={
                'flex flex-col justify-start lg:flex-row lg:items-end lg:gap-2 lg:pb-0 lg:px-0 mt-3'
              }
            >
              {direction === 'multi_city' && (
                <section>
                  <Button
                    onClick={() => handleFlightsAdd()}
                    type="secondary"
                    icon={<PlusIcon />}
                    compact
                    disabled={flights.length === 5}
                  >
                    {addFlightLabel}
                  </Button>
                </section>
              )}
              <section>
                <FlightSelect
                  value={direction}
                  onChange={handleDirectionChange}
                />
              </section>
              {!isDesktop ? (
                <>
                  <TravelersInput
                    showTravelersInput={showTravelersInput}
                    onClose={() => setShowTravelersInput(false)}
                    travelers={travelersData}
                    setTravelers={setTravelersData}
                  />
                  <section>
                    <Label
                      value={travelersLabel}
                      className="block lg:hidden lg:mb-0 my-3"
                    />
                    <button
                      onClick={() => setShowTravelersInput(true)}
                      className="border border-gray-300 rounded-md text-gray-600 text-p-xxs h-8 pl-3.5 py-0 pr-7 bg-white hover:border-gray-400 focus:outline-none" // grid grid-cols-2
                    >
                      <section className="flex items-center gap-2">
                        <MultiplePersons className="text-dark-700" />
                        {parseInt(adults) +
                          parseInt(children) +
                          parseInt(infants)}{' '}
                        {travelerLabelText}
                      </section>
                    </button>
                  </section>
                </>
              ) : (
                <section>
                  <Label
                    value={travelersLabel}
                    className="block lg:hidden lg:mb-0 my-3"
                  />
                  <Popper
                    open={showTravelersInput}
                    onClose={() => setShowTravelersInput(false)}
                    content={
                      <TravelersSelect
                        travelers={travelersData}
                        setTravelers={setTravelersData}
                      />
                    }
                    placement="left"
                  >
                    <button
                      onClick={() => setShowTravelersInput(true)}
                      className="border border-gray-300 rounded-md text-gray-600 text-p-xxs h-8 pl-3.5 py-0 pr-7 bg-white hover:border-gray-400 focus:outline-none" // grid grid-cols-2
                    >
                      <section className="flex items-center gap-2">
                        <MultiplePersons className="text-dark-700" />
                        {parseInt(adults) +
                          parseInt(children) +
                          parseInt(infants)}{' '}
                        {travelerLabelText}
                      </section>
                    </button>
                  </Popper>
                </section>
              )}
            </section>
            {flights.length !== 1 && (
              <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
                <Button key="flights.searchBtn" onClick={handleSearchClick}>
                  {textSearch}
                </Button>
              </section>
            )}
          </section>
        </section>
      </Collapse>
    </>
  );
};
export default FlightSearchForm;
