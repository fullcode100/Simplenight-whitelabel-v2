import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import CheckInOutInput, {
  useCheckInOutInput,
  UseCheckInOutInputPropsComponentReturn,
} from 'hotels/components/CheckInOutInput/CheckInOutInput';
import { useTranslation } from 'react-i18next';
import GuestsRoomsInput from 'hotels/components/GuestsRoomsInput/GuestsRoomsInput';
import { useState, useEffect } from 'react';
import { createRoom, Room } from 'hotels/helpers/room';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import {
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
  StringGeolocation,
} from 'types/search/Geolocation';
import { setTravelersTotals } from 'hotels/helpers/travelers';
import Button from 'components/global/Button/Button';

interface CheckRoomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CheckRoomAvailability = ({ open, setOpen }: CheckRoomProps) => {
  const [t] = useTranslation('hotels');
  const setQueryParam = useQuerySetter();
  const title = t('checkRoomAvailability', 'Check Room Availability');
  const textCheckAvailability = t('checkAvailability', 'Check Availability');
  const onClose = () => setOpen(false);
  const params = useQuery();
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const [roomsData, setRoomsData] = useState<Room[]>(
    params.roomsData ? JSON.parse(params.roomsData as string) : [createRoom()],
  );
  const [adults, setAdults] = useState(params?.adults?.toString() ?? '0');

  const [children, setChildren] = useState(
    (Number(roomsData[0].children) + Number(roomsData[0].infants)).toString(),
  );
  const [childrenAges, setChildrenAges] = useState(
    roomsData[0].childrenAges.toString(),
  );
  const [rooms, setRooms] = useState(roomsData.length.toString());
  const geolocation = params?.geolocation?.toString() ?? '';
  const onApply = () => {
    const roomsDataFormatted = JSON.stringify(roomsData);
    setQueryParam({
      id: params?.id?.toString() as string,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      rooms,
      adults,
      children: children,
      childrenAges,
      geolocation: geolocation,
      latitude: geolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: geolocation?.split(',')[LONGITUDE_INDEX] ?? '',
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

  useEffect(() => {
    setTravelersTotals(roomsData, setAdults, setChildren, setChildrenAges);
    setRooms(roomsData.length.toString());
  }, [roomsData]);

  return (
    <FullScreenModal open={open} closeModal={onClose} title={title} noFooter>
      <section className="flex flex-col px-5 py-3 h-full justify-between">
        <section>
          <GuestsRoomsInput
            roomsData={roomsData}
            setRoomsData={setRoomsData}
            adults={adults.toString()}
            childrens={children.toString()}
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
        <Button
          key="detail.button"
          size="full"
          className="min-w-full text-base"
          value={textCheckAvailability}
          onClick={onApply}
        />
      </section>
    </FullScreenModal>
  );
};

export default CheckRoomAvailability;
