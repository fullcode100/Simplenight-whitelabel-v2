import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import CheckInOutInput, {
  useCheckInOutInput,
} from '../../../components/global/CheckInOutInput/CheckInOutInput';

interface CheckRoomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CheckRoomAvailability = ({ open, setOpen }: CheckRoomProps) => {
  const title = 'Check Room Availability';
  const onClose = () => setOpen(false);
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const onApply = () => {
    // apply here
  };

  const {
    showDatePicker,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenDatePicker,
    handleCloseDatePicker,
  } = checkInOutProps;

  return (
    <FullScreenModal
      open={open}
      closeModal={onClose}
      title={title}
      textButton="Check Availability"
      applyModal={onApply}
    >
      <section className="px-5 py-3">
        <CheckInOutInput
          showDatePicker={showDatePicker}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleOpenDatePicker={handleOpenDatePicker}
          handleCloseDatePicker={handleCloseDatePicker}
          startDate={startDate}
          endDate={endDate}
        />
      </section>
    </FullScreenModal>
  );
};

export default CheckRoomAvailability;
