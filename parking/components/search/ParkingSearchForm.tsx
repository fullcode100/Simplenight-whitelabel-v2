import { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import useQuerySetter from '../../../hooks/pageInteraction/useQuerySetter';
import Clock from '../../../public/icons/assets/clock.svg';

import {
  LATITUDE_INDEX,
  latLngProp,
  LONGITUDE_INDEX,
  StringGeolocation,
} from '../../../types/search/Geolocation';
import {
  formatAsDisplayDate,
  formatAsSearchDate,
} from '../../../helpers/dajjsUtils';
import dayjs from 'dayjs';
import LocationInput from '../../../components/global/Input/LocationInput';
import LocationPin from '../../../public/icons/assets/location-pin.svg';
import DatePicker from '../../../components/global/Calendar/Calendar';
import IconInput from '../../../components/global/Input/IconInput';
import Calendar from '../../../public/icons/assets/calendar.svg';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import Button from '../../../components/global/Button/Button';
import { SearchFormProps } from '../../../types/search/SearchFormProps';
import { Select } from '../../../components/global/SelectNew/Select';
import classNames from 'classnames';
import { ceilToNextHalfHour } from '../../helpers/ceilToNextHalfHour';

export const ParkingSearchForm: FC<SearchFormProps> = (props) => {
  const router = useRouter();
  const TIME_SELECTION_FORMAT = 'HHmm';
  const thirtyMinutesFromNow = dayjs().add(30, 'minutes').startOf('minute');
  const twoHoursAndThirtyMinutes = thirtyMinutesFromNow.add(2, 'hours');
  const start = ceilToNextHalfHour(thirtyMinutesFromNow).format(
    TIME_SELECTION_FORMAT,
  );
  const end = ceilToNextHalfHour(twoHoursAndThirtyMinutes).format(
    TIME_SELECTION_FORMAT,
  );

  const [t] = useTranslation('parking');
  const locationInputLabel = t('locationInputLabel', 'Destination');
  const textSearch = t('search', 'Search');
  const startDateText = t('arriving', 'Start Date');
  const endDateText = t('leaving', 'End Date');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [address, setAddress] = useState<string | undefined>(
    params.address ? decodeURIComponent(params.address as string) : '',
  );

  const [geolocation, setGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude as string)},${parseFloat(
      params.longitude as string,
    )}`,
  );
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

  const timeList = useMemo(() => {
    const today = dayjs().startOf('day');
    return Array(48)
      .fill(5)
      .map((_, index) => {
        const thirtyMinutesMore = today.add(30 * index, 'minutes');
        return {
          label: thirtyMinutesMore.format('hh:mm a'),
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);
  const [showEndTimeError, setShowEndTimeError] = useState(false);

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

  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('lastSearch', value);
  };

  const rerouteToSearchPage = () => {
    const route = `/search/${
      props.slug
    }?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&latitude=${
      geolocation?.split(',')[LATITUDE_INDEX]
    }&longitude=${
      geolocation?.split(',')[LONGITUDE_INDEX]
    }&address=${encodeURIComponent(address || '')}`;

    handleSaveLastSearch(route);
    router.push(route);
  };

  const handleChangeLocation = () => {
    setShowLocationError(false);
  };

  const validateEndTime = () => {
    const startDateTime = dayjs(`${startDate} ${startTime}`, 'YYYY-MM-DD HHmm');
    const endDateTime = dayjs(`${endDate} ${endTime}`, 'YYYY-MM-DD HHmm');
    return endDateTime.isAfter(startDateTime);
  };
  const geolocationIsNull = geolocation === `${NaN},${NaN}`;

  const handleSearchClick = () => {
    if (props.hasReRoute) {
      if (geolocationIsNull) {
        setShowLocationError(true);
      }

      const isEndTimeInvalid = !validateEndTime();
      if (isEndTimeInvalid) {
        setShowEndTimeError(isEndTimeInvalid);
      }

      if (geolocationIsNull || isEndTimeInvalid) {
        return;
      }

      rerouteToSearchPage();
      return;
    }

    const encodedAddress = encodeURIComponent(address || '');

    setQueryParam({
      startDate,
      startTime,
      endDate,
      endTime,
      address: encodedAddress,
      geolocation: geolocation ?? '',
      latitude: geolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.split(',')[LONGITUDE_INDEX] ?? '',
    });
    if (props.setIsSearching) props.setIsSearching(false);
  };

  const handleSelectLocation = (latLng: latLngProp, address: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setGeolocation(newGeolocation);
    setAddress(address);
  };

  const handleClearLocation = () => {
    setGeolocation(`${NaN},${NaN}`);
    setAddress('');
  };

  const locationPlaceholder = t(
    'locationInputPlaceholder',
    'Where do you like to go?',
  );

  return (
    <section
      className={classNames(
        'flex flex-col justify-between lg:flex-row lg:items-end lg:gap-4 lg:pb-0 lg:px-0',
        props.className,
      )}
    >
      <section className="flex flex-col gap-4 lg:flex-row lg:w-[90%] lg:justify-between lg:items-center">
        <section className="w-full lg:w-1/2">
          <LocationInput
            icon={<LocationPin className="w-5 h-5 text-dark-700 lg:w-full" />}
            label={locationInputLabel}
            name="location"
            placeholder={locationPlaceholder}
            routeParams={['type']}
            onSelect={handleSelectLocation}
            error={showLocationError}
            onChange={handleChangeLocation}
            clearable={true}
            onClear={handleClearLocation}
            autoFocus
          />
        </section>

        <section className="relative flex flex-col lg:flex-row gap-4 lg:mt-0 lg:w-full">
          <section className="flex items-end gap-4 w-full lg:w-1/2">
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
            />

            <Select
              name="Check-in-time"
              value={startTime}
              onChange={setStartTime}
              items={timeList}
              icon={<Clock />}
            />
          </section>

          <section className="flex items-end gap-4 w-full lg:w-1/2">
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
            />

            <Select
              name="Check-out-time"
              value={endTime}
              onChange={handleEndTimeChange}
              items={timeList}
              icon={<Clock />}
              error={showEndTimeError}
            />
          </section>

          <DatePicker
            showDatePicker={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            startDateLabel={startDateText}
            endDateLabel={endDateText}
            initialStartDate={startDate}
            initialEndDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            openOnStart={clickOnStart}
            minRange={0}
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
