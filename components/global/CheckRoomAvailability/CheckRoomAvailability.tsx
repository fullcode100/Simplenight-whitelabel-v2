import { useState } from 'react';
import FullScreenModal from '../NewModal/FullScreenModal';
import CheckInOutInput, {
  useCheckInOutInput,
} from '../CheckInOutInput/CheckInOutInput';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import SingleBed from 'public/icons/assets/single-bed.svg';
import IconInput from '../Input/IconInput';
import Label from '../Label/Label';

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

  return (
    <FullScreenModal
      open={open}
      closeModal={onClose}
      title={title}
      textButton="Check Availability"
      applyModal={onApply}
    >
      <section className="px-5 py-3">
        <CheckInOutInput {...checkInOutProps} />
      </section>
    </FullScreenModal>
  );
};

export default CheckRoomAvailability;
