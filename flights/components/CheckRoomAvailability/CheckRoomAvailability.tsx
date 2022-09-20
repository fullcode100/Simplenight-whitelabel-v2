import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import CheckInOutInput, {
  useCheckInOutInput,
  UseCheckInOutInputPropsComponentReturn,
} from 'flights/components/CheckInOutInput/CheckInOutInput';
import { useTranslation } from 'react-i18next';
import GuestsRoomsInput from 'flights/components/GuestsRoomsInput/GuestsRoomsInput';
import { useState } from 'react';
import { createRoom, Room } from 'flights/helpers/room';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import {
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
  StringGeolocation,
} from 'types/search/Geolocation';

interface CheckRoomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CheckRoomAvailability = ({ open, setOpen }: CheckRoomProps) => {
  const [t] = useTranslation('flights');
  const setQueryParam = useQuerySetter();
  const title = t('checkRoomAvailability', 'Check Room Availability');
  const onClose = () => setOpen(false);
  const params = useQuery();
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const [roomsData, setRoomsData] = useState<Room[]>(
    params.roomsData ? JSON.parse(params.roomsData as string) : [createRoom()],
  );
  const [adults, setAdults] = useState(params?.adults?.toString() ?? '0');
  const [childrens, setChildrens] = useState(
    params?.children?.toString() ?? '0',
  );
  const [infants, setInfants] = useState(params?.infants?.toString() ?? '0');
  const [rooms, setRooms] = useState(roomsData.length.toString());
  const [childrenAges, setChildrenAges] = useState(
    roomsData[0].childrenAges.toString(),
  );
  const [infantsAges, setInfantsAges] = useState(
    roomsData[0].infantsAges.toString(),
  );
  const geolocation = params?.geolocation?.toString() ?? '';
  const onApply = () => {
    const roomsDataFormatted = JSON.stringify(roomsData);
    setQueryParam({
      id: params?.id?.toString() as string,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      rooms,
      adults,
      children: childrens,
      childrenAges,
      infants: infants,
      infantsAges,
      geolocation: geolocation,
      latitude: geolocation?.toString().split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.toString().split(',')[LONGITUDE_INDEX] ?? '',
      roomsData: roomsDataFormatted,
    });
    onClose();
  };

  const {
    showDatePicker,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenDatePicker,
    handleCloseDatePicker,
  } = checkInOutProps as UseCheckInOutInputPropsComponentReturn;

  const onChangeRoomData = (data: Room[]) => {
    const guests = getGuestData(data);
    setRoomsData(data);
    setAdults(guests.adults.toString());
    setChildrens(guests.childrens.toString());
    setChildrenAges(guests.ages.toString());
    setInfants(guests.infants.toString());
    setInfantsAges(guests.ages.toString());
    setRooms(roomsData.length.toString());
  };

  const getGuestData = (rooms: Room[]) => {
    let adults = 0;
    let childrens = 0;
    let infants = 0;
    let ages: number[] = [];
    rooms.forEach((room: Room) => {
      adults += room.adults;
      childrens += room.children;
      infants += room.infants;
      ages = ages.concat(room.childrenAges);
      ages = ages.concat(room.infantsAges);
    });

    return { adults, childrens, infants, ages };
  };

  return (
    <FullScreenModal
      open={open}
      closeModal={onClose}
      title={title}
      primaryButtonText="Check Availability"
      primaryButtonAction={onApply}
    >
      <section className="px-5 py-3 h-full">
        <GuestsRoomsInput
          roomsData={roomsData}
          setRoomsData={onChangeRoomData}
          adults={adults.toString()}
          childrens={childrens.toString()}
          infants={infants.toString()}
          rooms={roomsData.length}
        />
        <CheckInOutInput
          showDatePicker={showDatePicker}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleOpenDatePicker={handleOpenDatePicker}
          handleCloseDatePicker={handleCloseDatePicker}
          startDate={startDate as string}
          endDate={endDate as string}
        />
      </section>
    </FullScreenModal>
  );
};

export default CheckRoomAvailability;
