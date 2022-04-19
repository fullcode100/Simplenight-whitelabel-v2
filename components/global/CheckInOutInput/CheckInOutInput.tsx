import DatePicker from '../Calendar/Calendar';
import IconInput from '../Input/IconInput';
import Calendar from 'public/icons/assets/calendar.svg';
import { useState } from 'react';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import dayjs from 'dayjs';

interface CheckInOutInputProps {
  showDatePicker: boolean;
  startDate: string;
  endDate: string;
  handleStartDateChange: (date: string) => void;
  handleEndDateChange: (date: string) => void;
  handleOpenDatePicker: () => void;
  handleCloseDatePicker: () => void;
}

const CheckInOutInput = ({
  showDatePicker,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleOpenDatePicker,
  handleCloseDatePicker,
}: CheckInOutInputProps) => {
  return (
    <section>
      <DatePicker
        showDatePicker={showDatePicker}
        onClose={handleCloseDatePicker}
        initialStartDate={startDate}
        initialEndDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
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
          onClick={handleOpenDatePicker}
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
          onClick={handleOpenDatePicker}
        />
      </section>
    </section>
  );
};

export default CheckInOutInput;

export const useCheckInOutInput = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleOpenDatePicker = () => setShowDatePicker(true);
  const handleCloseDatePicker = () => setShowDatePicker(false);

  const propsComponent = {
    showDatePicker,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenDatePicker,
    handleCloseDatePicker,
  };

  return [propsComponent, startDate, endDate];
};
