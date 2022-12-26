import dayjs from 'dayjs';
import { useState } from 'react';

import DatePicker from '../../../components/global/Calendar/Calendar';

import LocationPin from 'public/icons/assets/location-pin.svg';
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

const ThingsSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
  slug = '',
}: SearchFormProps) => {
  const router = useRouter();

  const [t] = useTranslation('things');
  const locationInputLabel = t('locationInputLabel', 'Destination');
  const textSearch = t('search', 'Search');
  const startDateText = t('startDate', 'Start Date');
  const endDateText = t('endDate', 'End Date');

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
      : formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
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
    const route = `/search/${slug}?startDate=${startDate}&endDate=${endDate}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${geolocation?.split(',')[LONGITUDE_INDEX]}&address=${address}`;
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

  return (
    <section
      className={`flex flex-col justify-between ${className} lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
    >
      <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
        <LocationInput
          icon={<LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />}
          label={locationInputLabel}
          name="location"
          placeholder={locationPlaceholder}
          routeParams={['address']}
          onSelect={handleSelectLocation}
          error={showLocationError}
          onChange={handleChangeLocation}
        />

        <section className="relative flex gap-4  lg:mt-0 lg:w-full">
          <IconInput
            label={startDateText}
            name="Check-in"
            placeholder={startDateText}
            className="lg:mt-0"
            orientation="left"
            icon={<Calendar className="w-5 h-5 text-dark-700" />}
            value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
            onChange={(event) => handleStartDateChange(event.target.value)}
            onClick={() => {
              setClickOnStart(true);
              setShowDatePicker(true);
            }}
            disabled
          />
          <IconInput
            label={endDateText}
            name="Check-out"
            placeholder={endDateText}
            orientation="left"
            className="lg:mt-0"
            icon={<Calendar className="w-5 h-5 text-dark-700" />}
            value={fromLowerCaseToCapitilize(formatAsDisplayDate(endDate))}
            onChange={(event) => handleEndDateChange(event.target.value)}
            onClick={() => {
              setClickOnStart(false);
              setShowDatePicker(true);
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
export default ThingsSearchForm;
