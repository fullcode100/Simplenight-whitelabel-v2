import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import DatePicker from '../../../components/global/Calendar/Calendar';

import LocationPin from 'public/icons/assets/location-pin.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import LocationInput from '../Input/LocationInput';
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
import Select from '../SelectTime/SelectTime';
import Checkbox from 'components/global/Checkbox/Checkbox';
import { useSearchStore } from 'hooks/cars/useSearchStore';
import scrollTopSmoothly from 'helpers/scrollTopSmoothly';
import { Paragraph } from '@simplenight/ui';

export const defaultDriverAge = 25;
export const minDriverAge = 18;

const CarSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
}: SearchFormProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('cars');
  const locationInputLabel = t('locationInputLabel', 'Pick-Up');
  const locationInputLabel2 = t('locationInputLabel2', 'Drop-Off');
  const textSearch = t('search', 'Search');
  const locationPlaceholder = t('locationInputPlaceholder', 'Pick-Up');
  const locationPlaceholder2 = t('locationInputPlaceholder2', 'Drop-Off');
  const dateInputLabel = t('dateInputLabel', 'Date');
  const timeInputLabel = t('timeInputLabel', 'Time');
  const textReturnDifferentLocation = t(
    'returnDifferentLocation',
    'Return to a different location',
  );
  const rentACarLabel = t('rentACar', 'Rent A Car For Your Trip With Ease.');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const setSearch = useSearchStore((state) => state.setSearch);

  const [address, setAddress] = useState<string>(
    decodeURIComponent(params.address?.toString().split(', ')[0] || ''),
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

  const [showLocation2, setShowLocation2] = useState(
    address && address2 && address !== address2 ? true : false,
  );

  const [driverAge, setDriverAge] = useState(
    params.driverAge ? (params.driverAge as string) : `${defaultDriverAge}`,
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

  const timeOptions: string[] = [];
  for (let i = 0; i < 12; i += 1) {
    timeOptions.push(i < 10 ? `0${i}:00 AM` : `${i}:00 AM`);
  }
  timeOptions.push('12:00 PM');
  for (let i = 1; i < 12; i += 1) {
    timeOptions.push(i < 10 ? `0${i}:00 PM` : `${i}:00 PM`);
  }
  const [startTime, setStartTime] = useState<string>(
    params.startTime ? params.startTime.toString() : '07:00 AM',
  );
  const [endTime, setEndTime] = useState<string>(
    params.endTime ? params.endTime.toString() : '07:00 AM',
  );

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('CarSearch', value);
  };

  const rerouteToSearchPage = () => {
    const route = `/search/car-rental?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${address}&latitude2=${
      geolocation2?.split(',')[LATITUDE_INDEX]
    }&longitude2=${
      geolocation2?.split(',')[LONGITUDE_INDEX]
    }&address=${address}&address2=${address2}&driverAge=${driverAge}`;

    setSearch({
      startDate,
      endDate,
      startTime,
      endTime,
      geolocation,
      geolocation2,
      address,
      address2,
      driverAge,
    });

    handleSaveLastSearch(route);
    router.push(route);
  };

  const handleChangeLocation = () => {
    setShowLocationError(false);
  };

  const geolocationIsNull = geolocation === `${NaN},${NaN}`;

  const handleSearchClick = () => {
    if (geolocationIsNull) {
      setShowLocationError(true);
      return;
    }
    rerouteToSearchPage();
  };

  const handleSelectLocation = (latLng: latLngProp, address: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setGeolocation(newGeolocation);
    setAddress(address);
    if (!showLocation2) {
      setGeolocation2(newGeolocation);
      setAddress2(address);
    }
  };

  const handleSelectLocation2 = (latLng: latLngProp, address: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setGeolocation2(newGeolocation);
    setAddress2(address);
  };

  const handleCheckLocation = (value: boolean) => {
    setShowLocation2(value);
    if (!value) setAddress2('');
  };

  const handleCheckDriverAge = (value: boolean) => {
    setDriverAge(value ? `${defaultDriverAge}` : `${minDriverAge}`);
  };

  useEffect(() => {
    if (
      !params?.startDate ||
      !params?.endDate ||
      !params?.startTime ||
      !params?.endTime ||
      !params?.address
    ) {
      // got here by switching tabs --> perform an auto-search
      // handleSearchClick();
    }
  }, []);

  const isHomePage = router.pathname === '/';

  return (
    <section className="flex flex-col">
      <section className={'flex flex-col lg:gap-4 lg:pb-0 lg:px-0'}>
        {isHomePage && (
          <Paragraph fontWeight="semibold" size="large" className="capitalize">
            {rentACarLabel}
          </Paragraph>
        )}
        <div
          className={`flex flex-col justify-between ${className} lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0`}
        >
          <section className="flex flex-col gap-2 lg:gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-end">
            <LocationInput
              icon={<LocationPin className="h-5 w-5 text-dark-700 lg:w-full" />}
              label={locationInputLabel}
              name="location"
              placeholder={locationPlaceholder}
              routeParams={['address']}
              defaultAddress={address}
              onSelect={handleSelectLocation}
              onChange={handleChangeLocation}
              autoFocus={!address ? true : false}
            />
            <section className="relative pt-4">
              <section className="w-full flex flex-row gap-2 items-end">
                <IconInput
                  placeholder={dateInputLabel}
                  className="lg:mt-0 min-w-[170px]"
                  orientation="left"
                  icon={<Calendar className="h-5 w-5 text-dark-700" />}
                  value={fromLowerCaseToCapitilize(
                    formatAsDisplayDate(startDate),
                  )}
                  onChange={(event) =>
                    handleStartDateChange(event.target.value)
                  }
                  onClick={() => {
                    setClickOnStart(true);
                    setShowDatePicker(true);
                    isHomePage && scrollTopSmoothly();
                  }}
                />
                <Select
                  options={timeOptions}
                  value={startTime}
                  onChange={(value) => setStartTime(value)}
                />
              </section>

              <section className="lg:hidden w-full flex items-center justify-start mt-3 text-gray-500 mb-3">
                <Checkbox
                  checked={showLocation2}
                  onChange={handleCheckLocation}
                  className="sm"
                >
                  {textReturnDifferentLocation}
                </Checkbox>
              </section>

              <DatePicker
                showDatePicker={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                startDateLabel={locationInputLabel}
                endDateLabel={locationInputLabel2}
                initialStartDate={startDate}
                initialEndDate={endDate}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
                openOnStart={clickOnStart ? true : false}
                maxMonthsDisplayed={13}
              />
            </section>

            {showLocation2 && (
              <LocationInput
                icon={
                  <LocationPin className="h-5 w-5 text-dark-700 lg:w-full" />
                }
                label={locationInputLabel2}
                name="location2"
                placeholder={locationPlaceholder2}
                routeParams={['address2']}
                defaultAddress={address2}
                onSelect={handleSelectLocation2}
                error={showLocationError}
                onChange={handleChangeLocation}
              />
            )}
            <section className="w-full flex flex-row gap-2 items-end">
              <IconInput
                label={showLocation2 ? '' : locationInputLabel2}
                placeholder={dateInputLabel}
                orientation="left"
                className="lg:mt-0 min-w-[170px]"
                icon={<Calendar className="h-5 w-5 text-dark-700" />}
                value={fromLowerCaseToCapitilize(formatAsDisplayDate(endDate))}
                onChange={(event) => handleEndDateChange(event.target.value)}
                onClick={() => {
                  setClickOnStart(false);
                  setShowDatePicker(true);
                  isHomePage && scrollTopSmoothly();
                }}
              />
              <Select
                options={timeOptions}
                value={endTime}
                onChange={(value) => setEndTime(value)}
              />
            </section>
          </section>

          <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
            <Button
              key="cars.searchBtn"
              size="full"
              className="min-w-full text-base"
              value={textSearch}
              onClick={handleSearchClick}
            />
          </section>
        </div>
      </section>

      <section className="hidden lg:block w-full flex items-center justify-start mt-3 text-gray-500">
        <Checkbox
          checked={showLocation2}
          onChange={handleCheckLocation}
          className="sm"
        >
          Return to a different location
        </Checkbox>
      </section>
      <section className="hidden lg:block w-full flex items-center justify-start mt-3 text-gray-500">
        <Checkbox
          checked={+driverAge >= defaultDriverAge}
          onChange={handleCheckDriverAge}
          className="sm"
        >
          Driver is {defaultDriverAge} years of age or older
        </Checkbox>
      </section>
    </section>
  );
};
export default CarSearchForm;
