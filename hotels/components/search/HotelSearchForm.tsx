import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
// import { SEARCH_DATE_FORMAT } from '../../../../helpers/searchConstants';
import { usePlural } from '../../../hooks/stringBehavior/usePlural';
import { HotelSearchFormData } from '../../../types/search/categories/HotelSearchFormData';
import { LocationPrefix } from '../../../types/search/LocationPrefixResponse';
import LocationAutoComplete from '../../../components/global/AutoComplete/LocationAutoComplete';
import DatePicker from '../../../components/global/DatePicker/DatePicker';

import OccupancySelector, {
  OccupancyData,
} from './OcupancySelector/OccupancySelector';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import NumberInput from 'components/global/Input/NumberInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import LocationInput from 'components/global/Input/LocationInput';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';

const SEARCH_DATE_FORMAT = 'YYYY-MM-DD';

const getInitialHotelSearchState = (): HotelSearchFormData => {
  const tomorrow = dayjs().add(1, 'day').format(SEARCH_DATE_FORMAT);

  return {
    startLocation: null,
    startDate: tomorrow,
    roomCount: 1,
    adultCount: 1,
    childCount: 0,
  };
};

const getInitialHotelOccupancyState = (): OccupancyData => ({
  adultCount: 1,
  childCount: 0,
  roomCount: 1,
});

const HotelSearchForm = ({
  setIsSearching,
  className = '',
}: SearchFormProps) => {
  const setQueryParam = useQuerySetter(['type']);

  const [adultCount, setAdultCount] = useState<Number>(0);
  const [geolocation, setGeolocation] = useState<StringGeolocation>();
  const [childrenCount, setChildrenCount] = useState<Number>(0);
  const [roomCount, setRoomCount] = useState<Number>(0);
  const [startDate, setStartDate] = useState<string>(
    formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    formatAsSearchDate(dayjs().add(1, 'day')),
  );

  const handleRoomChange = (value: Number) => {
    setRoomCount(value);
  };

  const handleAdultChange = (value: Number) => {
    setAdultCount(value);
  };

  const handleChildrenCount = (value: Number) => {
    setChildrenCount(value);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleSearchClick = async () => {
    await setQueryParam('adults', adultCount + '');
    await setQueryParam('children', childrenCount + '');
    await setQueryParam('startDate', startDate);
    await setQueryParam('endDate', endDate);
    await setQueryParam('geolocation', geolocation ?? '');
    if (setIsSearching) setIsSearching(false);
  };

  return (
    <section className={`flex flex-col justify-between ${className}`}>
      <section>
        <LocationInput
          icon={<LocationPin className="h-5 w-5 text-dark-700" />}
          label="Where to?"
          name="location"
          placeholder="Chicago, IL, USA"
          routeParams={['type']}
          onSelect={(value: StringGeolocation) => setGeolocation(value)}
        />

        <NumberInput
          label="Rooms"
          name="rooms"
          placeholder="1 Room"
          className="h-full items-center"
          value={roomCount}
          onChange={(event) =>
            handleRoomChange(parseQueryNumber(event.target.value))
          }
        />

        <IconInput
          label="Adults"
          name="Adults"
          placeholder="2 adults"
          icon={<MultiplePersons className="h-5 w-5 text-dark-700" />}
          className="mt-4"
          // value={adultCount}
          onChange={(event) =>
            handleAdultChange(parseQueryNumber(event.target.value))
          }
        />

        <section className="flex gap-4">
          <IconInput
            label="Check-in"
            name="Check-in"
            placeholder="Check-in"
            className="mt-4"
            orientation="right"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={startDate}
            onChange={(event) => handleStartDateChange(event.target.value)}
          />
          <IconInput
            label="Check-out"
            name="Check-out"
            placeholder="Check-out"
            orientation="right"
            className="mt-4"
            icon={<Calendar className="h-5 w-5 text-dark-700" />}
            value={endDate}
            onChange={(event) => handleEndDateChange(event.target.value)}
          />
        </section>
      </section>

      <section className="w-full flex items-center justify-center mt-8">
        <Button
          key="hotels.searchBtn"
          value="Search"
          className="h-12 min-w-full"
          onClick={handleSearchClick}
        />
      </section>
    </section>
  );
};

export default HotelSearchForm;
