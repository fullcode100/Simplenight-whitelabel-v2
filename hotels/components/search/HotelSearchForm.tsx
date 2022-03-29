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

const HotelSearchForm = ({ setIsReading }: SearchFormProps) => {
  const [searchData, setSearchData] = useState(getInitialHotelSearchState);
  const [occupancyData, setOccupancyData] = useState<OccupancyData>(
    getInitialHotelOccupancyState,
  );
  const setQueryParam = useQuerySetter();
  const [isOccupancySelectorVisible, setIsOccupancySelectorVisible] =
    useState(false);

  const [guestCount, setGuestCount] = useState(
    occupancyData.adultCount + occupancyData.childCount,
  );

  const roomLabel = usePlural(occupancyData.roomCount, 'Room', 'Rooms');
  const guestLabel = usePlural(guestCount, 'Guest', 'Guests');

  const handleLocationSelect = (location: LocationPrefix) => {
    setSearchData({
      ...searchData,
      startLocation: location,
    });
  };

  const handleDateChange = (date: string) => {
    const formattedDate = dayjs(date).format(SEARCH_DATE_FORMAT);

    setSearchData({
      ...searchData,
      startDate: formattedDate,
    });
  };

  const handleClickOccupancySelector = () => {
    setIsOccupancySelectorVisible(true);
  };

  const handleOccupancySelectorClose = (selectedOccupancy: OccupancyData) => {
    setOccupancyData(selectedOccupancy);
    setIsOccupancySelectorVisible(false);
  };

  useEffect(() => {
    setGuestCount(occupancyData.adultCount + occupancyData.childCount);
  }, [occupancyData]);

  const StartLocationPicker = () => (
    <LocationAutoComplete
      className="block w-3/5 mr-10 placeholder-primary text-primary"
      onSelect={handleLocationSelect}
      placeholder="Search for a location"
    />
  );

  const StartDatePicker = () => (
    <DatePicker
      className="w-1/8 h-full border-gray-600 border-2"
      value={searchData.startDate}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleDateChange(e.target.value)
      }
    />
  );

  const handleSearchClick = async () => {
    await setQueryParam('adults', '4');
    await setQueryParam('children', '2');
    await setQueryParam('startDate', '2020-01-01');
    await setQueryParam('endDate', '2020-01-02');
    if (setIsReading) setIsReading(true);
  };

  return (
    <section className="">
      <IconInput
        icon={<LocationPin className="h-5 w-5 text-dark-700" />}
        label=""
        name="rooms"
        placeholder="Chicago, IL, USA"
      />

      <NumberInput
        label="Rooms"
        name="rooms"
        placeholder="1 Room"
        className="mt-4"
      />

      <IconInput
        label="Adults"
        name="Adults"
        placeholder="2 adults"
        icon={<MultiplePersons className="h-5 w-5 text-dark-700" />}
        className="mt-4"
        orientation="right"
      />

      <section className="flex gap-4">
        <IconInput
          label="Check-in"
          name="Check-in"
          placeholder="Check-in"
          className="mt-4"
          orientation="right"
          icon={<Calendar className="h-5 w-5 text-dark-700" />}
        />
        <IconInput
          label="Check-out"
          name="Check-out"
          placeholder="Check-out"
          orientation="right"
          className="mt-4"
          icon={<Calendar className="h-5 w-5 text-dark-700" />}
        />
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
