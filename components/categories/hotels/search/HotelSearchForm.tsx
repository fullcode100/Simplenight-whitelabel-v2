import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
// import { SEARCH_DATE_FORMAT } from '../../../../helpers/searchConstants';
import { usePlural } from '../../../../hooks/stringBehavior/usePlural';
import { HotelSearchFormData } from '../../../../types/search/categories/HotelSearchFormData';
import { LocationPrefix } from '../../../../types/search/LocationPrefixResponse';
import LocationAutoComplete from '../../../global/AutoComplete/LocationAutoComplete';
import DatePicker from '../../../global/DatePicker/DatePicker';
import OccupancySelector, {
  OccupancyData,
} from './OcupancySelector/OccupancySelector';

import BedFillGray from 'public/icons/categories/BedFillGray.svg';

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

const HotelSearchForm = () => {
  const [searchData, setSearchData] = useState(getInitialHotelSearchState);
  const [occupancyData, setOccupancyData] = useState<OccupancyData>(
    getInitialHotelOccupancyState,
  );
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

  return (
    <section className="w-full flex flex-row items-center h-1/2">
      <StartLocationPicker />
      <StartDatePicker />
      <section className="w-1/5 h-full relative">
        <OccupancySelector
          visible={isOccupancySelectorVisible}
          values={occupancyData}
          onClose={handleOccupancySelectorClose}
          className="bg-gray-300 h-48 drop-shadow-lg absolute inset-x-0 bottom-8"
        />
        <section
          className="flex mx-2 border-2 border-gray-600 justify-center items-center h-full"
          onClick={handleClickOccupancySelector}
        >
          <section className="text-center justify-center flex flex-row">
            <span className="text-primary mr-4 flex flex-row">
              <BedFillGray className="mr-2" />
              {occupancyData.roomCount} {roomLabel}
            </span>
            <span className="text-primary">
              {guestCount} {guestLabel}
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default HotelSearchForm;
