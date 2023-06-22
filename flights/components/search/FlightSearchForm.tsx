import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import DatePicker from '../../../components/global/Calendar/Calendar';
import { Traveler, createTraveler } from 'flights/helpers/traveler';
import ArrowMenuRight from 'public/icons/assets/flights/arrow_menu_right.svg';
import ArrowMenuRoudTrip from 'public/icons/assets/flights/arrow_menu_roundtrip.svg';
import Seat from 'public/icons/assets/flights/seat.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import { Button, IconWrapper, Paragraph } from '@simplenight/ui';
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
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import useMediaViewport from 'hooks/media/useMediaViewport';
import PlusIcon from 'public/icons/assets/flights/plus.svg';
import TrashIcon from 'public/icons/assets/flights/trash.svg';
import Popper from 'components/global/Popper/Popper';
import TravelersSelect from '../TravelersSelect/TravelersSelect';
import DropdownMenu from '../FlightSelect/DropDownMenu';
import { useSearchStore } from 'hooks/flights/useSearchStore';
import SearchAirport from '../SearchAirport/SearchAirport';

type Direction = 'round_trip' | 'one_way' | 'multicity';
const FlightSearchForm = () => {
  const router = useRouter();
  const { isDesktop } = useMediaViewport();
  const [t] = useTranslation('flights');

  const travelerLabel = t('traveler', 'Traveler');
  const travelersLabel = t('travelers', 'Travelers');
  const cabinLabel = t('cabin', 'Cabin');
  const tripTypeLabel = t('tripType', 'Trip Type');
  const findThePerfectFlightLabel = t(
    'findThePerfectFlightForYou',
    'Find the perfect flight for you',
  );
  const cabynTypes: Array<{ label: string; value: string }> = [
    {
      label: t('economy'),
      value: 'economy',
    },
    {
      label: t('premium'),
      value: 'premium_economy',
    },
    {
      label: t('business'),
      value: 'business',
    },
    {
      label: t('first'),
      value: 'first_class',
    },
  ];
  const directionTypes = [
    {
      label: t('one_way'),
      icon: <ArrowMenuRight className="w-5 h-5" />,
      value: 'one_way',
    },
    {
      label: t('round_trip'),
      icon: <ArrowMenuRoudTrip className="w-5 h-5" />,
      value: 'round_trip',
    },
  ];

  const params = useQuery();
  const setSearch = useSearchStore((state) => state.setSearch);
  const [direction, setDirection] = useState<Direction>(
    (params?.direction?.toString() as Direction) || 'round_trip',
  );

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
  const [placeType, setPlaceType] = useState<string>(
    params.placeType ? (params.placeType as string) : '',
  );
  const [placeType2, setPlaceType2] = useState<string>(
    params.placeType2 ? (params.placeType2 as string) : '',
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
      : formatAsSearchDate(dayjs(startDate).add(8, 'day')),
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
  const [selectedCabinType, setSelectedCabinType] = useState<
    string | undefined
  >(params?.cabinType ? params.cabinType.toString() : 'economy');

  let _flights: string[] = [];
  if (direction === 'multicity') {
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

  const handleDirectionChange = useCallback((value: string) => {
    setDirection(value as Direction);
    if (value === 'multicity') {
      setFlights(['one_way']);
      setStartDates([startDate]);
      setAddresses([address]);
      setAddresses2([address2]);
    } else setFlights([value]);
  }, []);

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
    subType: string,
  ) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    if (index < 1) {
      setGeolocation(newGeolocation);
      setAddress(addr);
      setPlaceType(subType);
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
    setAddress('');
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
    subType: string,
  ) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    if (index < 1) {
      setGeolocation2(newGeolocation);
      setAddress2(addr);
      setPlaceType2(subType);
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
    setAddress2('');
    setAddresses2(addrs2);
    const shorts: string[] = Object.assign([], shortNames2);
    shorts[index] = '';
    setShortNames2(shorts);
  };

  useEffect(() => {
    if (direction === 'one_way') {
      const oneWeekAhead = dayjs(startDate).add(8, 'day');
      setEndDate(dayjs(oneWeekAhead).format('YYYY-MM-DD'));
    }
  }, [startDate]);

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
    const startAirport = _address ? _address.toString().split(' - ')[0] : '';
    if (!startAirport || startAirport.length !== 3)
      return alert('Can not find leaving from Airport Code');
    const _address2 = address2.toString().split('(').pop();
    const endAirport = _address2 ? _address2.toString().split(' - ')[0] : '';
    if (!endAirport || endAirport.length !== 3)
      return alert('Can not find going to Airport Code');

    // multi city
    const startAirports: string[] = [];
    const endAirports: string[] = [];
    if (direction === 'multicity') {
      addresses.forEach((addr: string, index: number) => {
        const _addr = addr.toString().split('(').pop();
        const airportCode = _addr ? _addr.toString().split(' - ')[0] : '';
        if (!airportCode || airportCode.length !== 3)
          return alert(
            `Can not find leaving from Airport Code for flight #${index + 1}`,
          );
        startAirports.push(airportCode);
      });
      addresses2.forEach((addr: string, index: number) => {
        const _addr = addr.toString().split('(').pop();
        const airportCode = _addr ? _addr.toString().split(' - ')[0] : '';
        if (!airportCode || airportCode.length !== 3)
          return alert(
            `Can not find leaving from Airport Code for flight #${index + 1}`,
          );
        endAirports.push(airportCode);
      });
    }

    const showFiltersParam = isDesktop ? '&isFiltersOpen=true' : '';
    let route = `/search/flights?direction=${direction}&startAirport=${startAirport}&endAirport=${endAirport}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&infants=${infants}&childrenAges=${childrenAges}&infantsAges=${infantsAges}&latitude=${
      geolocation?.toString().split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.toString().split(',')[LONGITUDE_INDEX]
    }&address=${address}&latitude2=${
      geolocation2?.toString().split(',')[LATITUDE_INDEX]
    }&longitude2=${
      geolocation2?.toString().split(',')[LONGITUDE_INDEX]
    }&address2=${address2}&placeType=${placeType}&placeType2=${placeType2}&travelersData=${JSON.stringify(
      travelersData,
    )}`;
    if (direction === 'multicity')
      route = `${route}&startAirports=${startAirports.join(
        '|',
      )}&endAirports=${endAirports.join('|')}&startDates=${startDates.join(
        '|',
      )}&addresses=${addresses.join('|')}&addresses2=${addresses2.join('|')}`;
    route = `${route}&currency='USD'&maxOfferss=50&cabinType=${selectedCabinType}${showFiltersParam}
    `;

    setSearch({
      direction,
      startAirport,
      endAirport,
      startDate,
      adults,
      children,
      infants,
      childrenAges,
      infantsAges,
      geolocation,
      address,
      geolocation2,
      address2,
      travelersData,
      cabynType: selectedCabinType,
    });
    handleSaveLastSearch(route);

    router.push(route);
  };

  const geolocationIsNull = geolocation === `${NaN},${NaN}`;
  const geolocation2IsNull = geolocation2 === `${NaN},${NaN}`;

  const handleSearchClick = () => {
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
      } ${travelersLabel}, ${rooms} ${t('rooms')}`,
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

  const swap = () => {
    const geo1 = geolocation.split(',');
    const geo2 = geolocation2.split(',');

    handleSelectLocation2(
      { lat: Number(geo1[0]), lng: Number(geo1[1]) },
      address,
      0,
      '',
      placeType!,
    );
    handleSelectLocation(
      { lat: Number(geo2[0]), lng: Number(geo2[1]) },
      address2,
      0,
      '',
      placeType2!,
    );
  };

  const [isOpen, setIsOpen] = useState(true);

  const classNameSwapButton = classnames('justify-center', {
    hidden: direction === 'multicity',
    flex: direction !== 'multicity',
  });

  const classNameChevron = classnames('fill-current h-4 w-4', {
    'rotate-180': isOpen,
  });

  const classNameCollapseButton = classnames('flex justify-end mb-[-1rem]', {
    hidden: direction !== 'multicity' || router.pathname === '/' || !isDesktop,
  });

  const classNameDatepicker = classnames(
    'flex gap-4 lg:mt-0 lg:w-full relative',
    {
      'max-w-xs': direction !== 'round_trip',
    },
  );

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

  const [indexDatePicker, setIndexDatePicker] = useState(0);
  const isSearchPage = router.asPath.includes('search');

  return (
    <>
      <section className={classNameCollapseButton}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-10 flex items-center self-end w-24 h-8 py-0 text-xs text-right text-gray-600 bg-transparent lg:text-center hover:border-gray-400 focus:outline-none"
        >
          <span className="flex-1 pr-1 font-semibold">
            {isOpen ? t('hide') : t('show')}
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
          {!isSearchPage && (
            <Paragraph
              fontWeight="semibold"
              size="large"
              className="capitalize"
            >
              {findThePerfectFlightLabel}
            </Paragraph>
          )}
          <section className={'flex flex-row gap-2 mt-3'}>
            <DropdownMenu
              items={directionTypes}
              label={tripTypeLabel}
              onChange={handleDirectionChange}
              alingDirection="left"
              active={direction}
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
                className="h-8 px-2 text-gray-600 bg-white border border-gray-300 rounded text-p-xxs hover:border-gray-400 focus:outline-none" // grid grid-cols-2
              >
                <section className="flex items-center gap-2">
                  <IconWrapper size={20}>
                    <MultiplePersons className="text-dark-1000" />
                  </IconWrapper>
                  <Paragraph fontWeight="semibold">
                    {parseInt(adults) + parseInt(children) + parseInt(infants)}{' '}
                    {isDesktop ? travelerLabelText : ''}
                  </Paragraph>
                </section>
              </button>
            </Popper>

            <DropdownMenu
              items={cabynTypes}
              onChange={setSelectedCabinType}
              alingDirection="left"
              menuIcon={<Seat className="w-5 h-5" />}
              label={cabinLabel}
              active={selectedCabinType}
            />
          </section>
          {flights.map((item: string, flightIndex: number) => (
            <section key={flightIndex} className="flex flex-col">
              {direction === 'multicity' && (
                <section className="w-full mt-5">
                  <Label
                    value={`${t('flight')} #${flightIndex + 1}`}
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
                  <section
                    className={classnames(
                      'lg:w-full flex flex-col lg:flex-row items-center lg:justify-between',
                    )}
                  >
                    <SearchAirport
                      label={isDesktop ? t('locationInputLabel') : ''}
                      defaultValue={
                        direction === 'multicity'
                          ? addresses[flightIndex]
                          : address
                      }
                      onSelect={(value) => {
                        if (value === null) {
                          cleanSelectLocation(flightIndex);
                        } else {
                          handleSelectLocation(
                            {
                              lat: value.geoCode.latitude,
                              lng: value.geoCode.longitude,
                            },
                            value.name,
                            flightIndex,
                            '',
                            value.subType,
                          );
                        }
                      }}
                      placeholder={locationPlaceholder}
                    />

                    <button
                      onClick={() => swap()}
                      className={classnames(
                        classNameSwapButton,
                        'w-8 h-8 rounded-full border border-dark-300 flex flex-none -my-2 items-center justify-center bg-white hover:bg-gray-400 lg:mt-6 lg:-mx-2 lg:my-0 z-10',
                      )}
                    >
                      <ArrowMenuRoudTrip className="w-4 h-4 fill-dark-700" />
                    </button>

                    <SearchAirport
                      label={isDesktop ? t('location2InputLabel') : ''}
                      defaultValue={
                        direction === 'multicity'
                          ? addresses2[flightIndex]
                          : address2
                      }
                      onSelect={(value) => {
                        if (value === null) {
                          cleanSelectLocation2(flightIndex);
                        } else {
                          handleSelectLocation2(
                            {
                              lat: value.geoCode.latitude,
                              lng: value.geoCode.longitude,
                            },
                            value.name,
                            flightIndex,
                            '',
                            value.subType,
                          );
                        }
                      }}
                      placeholder={location2Placeholder}
                    />
                  </section>

                  <section className={classNameDatepicker}>
                    <IconInput
                      label={t('checkIn')}
                      name="Check-in"
                      placeholder={t('checkIn')}
                      className="lg:mt-0"
                      orientation="left"
                      icon={<Calendar className="w-5 h-5 text-dark-700" />}
                      value={fromLowerCaseToCapitilize(
                        formatAsDisplayDate(
                          direction === 'multicity'
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
                        setIndexDatePicker(flightIndex);
                      }}
                    />
                    {direction === 'round_trip' && (
                      <IconInput
                        label={t('checkOut')}
                        name="Check-out"
                        placeholder={t('checkOut')}
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
                    <DatePicker
                      showDatePicker={showDatePicker}
                      onClose={() => setShowDatePicker(false)}
                      startDateLabel={t('checkIn')}
                      endDateLabel={t('checkOut')}
                      initialStartDate={
                        direction === 'multicity'
                          ? startDates[flightIndex]
                          : startDate
                      }
                      initialEndDate={endDate}
                      onStartDateChange={(value) =>
                        handleStartDateChange(value, indexDatePicker)
                      }
                      onEndDateChange={handleEndDateChange}
                      openOnStart={clickOnStart ? true : false}
                      isRange={direction === 'round_trip'}
                      // isRange={direction === 'round_trip'}
                    />
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
                      {t('removeFlight')}
                    </Button>
                  </section>
                ) : (
                  <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
                    <Button key="flights.searchBtn" onClick={handleSearchClick}>
                      {t('search')}
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
              {direction === 'multicity' && (
                <section>
                  <Button
                    onClick={() => handleFlightsAdd()}
                    type="secondary"
                    icon={<PlusIcon />}
                    compact
                    disabled={flights.length === 5}
                  >
                    {t('addFlight')}
                  </Button>
                </section>
              )}
            </section>
            {flights.length !== 1 && (
              <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
                <Button key="flights.searchBtn" onClick={handleSearchClick}>
                  {t('search')}
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
