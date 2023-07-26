import dayjs from 'dayjs';
import { useState } from 'react';

import DatePicker from '../../../components/global/Calendar/Calendar';
import LocationPin from 'public/icons/assets/location-pin.svg';
import SearchIcon from 'public/icons/assets/Search.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import LocationInput from 'components/global/Input/LocationInput';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import {
  StringGeolocation,
  latLngProp,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import { SHOWS_AND_EVENTS } from 'showsAndEvents';
import scrollTopSmoothly from 'helpers/scrollTopSmoothly';
import { Paragraph } from '@simplenight/ui';
import {
  initialFilters,
  useSearchFilterStore,
} from 'hooks/showsAndEvents/useSearchFilterStore';
export interface Option {
  value: string;
  label: string;
}

const ShowsAndEvents = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();
  const { setFilters } = useSearchFilterStore((state) => state);

  const [t] = useTranslation('things');
  const [te] = useTranslation('events');
  const locationInputLabel = t('locationInputLabel', 'Destination');
  const getMemorableExperiencesLabel = te(
    'getMemorableExperiences',
    'Get memorable experiences with secure event ticketing.',
  );
  const textSearch = t('search', 'Search');
  // const startDateText = t('startDate', 'Start Date');
  // const endDateText = t('endDate', 'End Date');
  const startDateText = 'From';
  const endDateText = 'To';
  const params = useQuery();
  const setQueryParam = useQuerySetter();
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
  const [showLocationError, setShowLocationError] = useState(false);
  const [query, setQuery] = useState(
    params.query ? params.query.toString() : '',
  );

  const handleSearchEventsChanges = (value: any) => {
    setQuery(value);
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
    setFilters(initialFilters);
    const route = `/search/${SHOWS_AND_EVENTS}?startDate=${startDate}&endDate=${endDate}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${address}&query=${query}`;
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
    setQueryParam({
      query,
      startDate,
      endDate,
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

  const selectedAmenities: Option[] = [];

  const isHomePage = router.pathname === '/';

  return (
    <section className={'flex flex-col lg:gap-4 lg:pb-0 lg:px-0'}>
      {isHomePage && (
        <Paragraph fontWeight="semibold" size="large" className="capitalize">
          {getMemorableExperiencesLabel}
        </Paragraph>
      )}
      <div
        className={`flex flex-col justify-between ${className} lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
      >
        <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
          <IconInput
            icon={<SearchIcon className="w-5 h-5 text-dark-700 " />}
            label="Search"
            name="search"
            placeholder="Search Shows & Events"
            autoFocus
            onChange={(e) => handleSearchEventsChanges(e.target.value)}
            value={query}
          />

          <LocationInput
            icon={<LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />}
            name="location"
            label={'City'}
            placeholder={'Where are you going?'}
            routeParams={['address']}
            onSelect={handleSelectLocation}
            error={showLocationError}
            onChange={handleChangeLocation}
          />
          <section className="relative flex gap-4 lg:mt-0 lg:w-full">
            <IconInput
              label={startDateText}
              name="Check-in"
              placeholder={startDateText}
              className="lg:mt-0"
              customInputClassName="cursor-pointer"
              orientation="left"
              icon={<Calendar className="w-5 h-5 text-dark-700" />}
              value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
              onChange={(event) => handleStartDateChange(event.target.value)}
              onClick={() => {
                setClickOnStart(true);
                setShowDatePicker(true);
                isHomePage && scrollTopSmoothly();
              }}
              disabled
            />
            <IconInput
              label={endDateText}
              name="Check-out"
              placeholder={endDateText}
              orientation="left"
              className="lg:mt-0"
              customInputClassName="cursor-pointer"
              icon={<Calendar className="h-5 w-5 text-dark-700" />}
              value={fromLowerCaseToCapitilize(formatAsDisplayDate(endDate))}
              onChange={(event) => handleEndDateChange(event.target.value)}
              onClick={() => {
                setClickOnStart(false);
                setShowDatePicker(true);
                isHomePage && scrollTopSmoothly();
              }}
              disabled
            />
            <DatePicker
              showDatePicker={showDatePicker}
              onClose={() => setShowDatePicker(false)}
              startDateLabel={startDateText}
              endDateLabel={endDateText}
              initialStartDate={startDate}
              initialEndDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              openOnStart={clickOnStart ? true : false}
              restricted={false}
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
export default ShowsAndEvents;
