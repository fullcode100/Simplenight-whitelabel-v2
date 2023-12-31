import dayjs from 'dayjs';

import LocationInput from 'components/global/Input/LocationInput';
import React, { useEffect, useState } from 'react';
import { SearchFormProps } from 'types/search/SearchFormProps';
import LocationPin from 'public/icons/assets/location-pin.svg';
import SearchIcon from 'public/icons/assets/Search.svg';
import { useTranslation } from 'react-i18next';
import Calendar from 'public/icons/assets/calendar.svg';
import {
  StringGeolocation,
  latLngProp,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import DatePicker from '../../../components/global/Calendar/Calendar';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import Button from 'components/global/Button/Button';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { useRouter } from 'next/router';
import IconInput from 'components/global/Input/IconInput';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import scrollTopSmoothly from 'helpers/scrollTopSmoothly';
import { Paragraph } from '@simplenight/ui';

const DiningSearchForm = ({
  setIsSearching,
  className = '',
  hasReRoute = false,
  slug = '',
}: SearchFormProps) => {
  const router = useRouter();
  const [t] = useTranslation('dining');
  const finestDiningExperienceLabel = t(
    'finestDiningExperience',
    'Indulge In The Finest Dining Experiences In Town.',
  );

  const params = useQuery();
  const setQueryParam = useQuerySetter();

  const [address, setAddress] = useState<string | undefined>(
    params.address ? (params.address as string) : '',
  );
  const [showLocationError, setShowLocationError] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<string>(
    params.startDate
      ? params.startDate.toString()
      : formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(1, 'week')),
  );
  const [geolocation, setGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude as string)},${parseFloat(
      params.longitude as string,
    )}`,
  );
  const [keyword, setKeyword] = useState(
    params.keyword ? params.keyword.toString() : '',
  );

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('lastSearch', value);
  };

  const handleSearchDiningChanges = (value: string) => {
    setKeyword(value);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  useEffect(() => {
    setEndDate(formatAsSearchDate(dayjs(startDate).add(1, 'week')));
  }, [startDate]);

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const [clickOnStart, setClickOnStart] = useState(false);

  const geolocationIsNull = geolocation === `${NaN},${NaN}`;

  const rerouteToSearchPage = () => {
    const route = `/search/${slug}?startDate=${startDate}&endDate=${formatAsSearchDate(
      dayjs(startDate).add(1, 'day'),
    ).toString()}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${address}&keyword=${keyword}`;
    handleSaveLastSearch(route);
    router.push(route);
  };

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
      keyword,
      startDate,
      endDate: dayjs(startDate).add(1, 'day').toString(),
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

  const handleChangeLocation = () => {
    setShowLocationError(false);
  };

  const isHomePage = router.pathname === '/';

  return (
    <section className={'flex flex-col lg:gap-4 lg:pb-0 lg:px-0'}>
      {isHomePage && (
        <Paragraph fontWeight="semibold" size="large" className="capitalize">
          {finestDiningExperienceLabel}
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
            placeholder="Greek food"
            autoFocus
            onChange={(e) => handleSearchDiningChanges(e.target.value)}
            value={keyword}
          />
          <LocationInput
            icon={<LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />}
            label={t('locationInputLabel')}
            name="location"
            placeholder={t('locationInputLabelPlaceholder')}
            routeParams={['address']}
            onSelect={handleSelectLocation}
            error={showLocationError}
            onChange={handleChangeLocation}
          />
          <section className="relative flex gap-4 lg:mt-0 lg:w-full">
            <IconInput
              label={t('startDate')}
              name="Check-in"
              placeholder={t('startDatePlaceholder')}
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
              disabled
            />
            <DatePicker
              showDatePicker={showDatePicker}
              onClose={() => setShowDatePicker(false)}
              startDateLabel={t('startDate')}
              endDateLabel={t('endDate')}
              initialStartDate={startDate}
              initialEndDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              openOnStart={clickOnStart ? true : false}
              isRange={false}
            />
          </section>
        </section>
        <section className="w-full flex items-center justify-center mt-6 lg:w-[10%]">
          <Button
            key="hotels.searchBtn"
            size="full"
            className="min-w-full text-base"
            value={t('search')}
            onClick={handleSearchClick}
          />
        </section>
      </div>
    </section>
  );
};

export default DiningSearchForm;
