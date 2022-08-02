import DatePicker from '../Calendar/Calendar';
import IconInput from '../Input/IconInput';
import Calendar from 'public/icons/assets/calendar.svg';
import { useState } from 'react';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import useQuery from 'hooks/pageInteraction/useQuery';
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
  const [t] = useTranslation('hotels');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  return (
    <section>
      <DatePicker
        showDatePicker={showDatePicker}
        onClose={handleCloseDatePicker}
        startDateLabel={checkInText}
        endDateLabel={checkOutText}
        initialStartDate={startDate}
        initialEndDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        openOnStart={false}
      />
      <section className="flex gap-4">
        <IconInput
          label={checkInText}
          name="Check-in"
          placeholder={checkInText}
          className="mt-4"
          orientation="right"
          icon={<Calendar className="h-5 w-5 text-dark-700" />}
          value={startDate}
          onChange={(event) => handleStartDateChange(event.target.value)}
          onClick={handleOpenDatePicker}
        />
        <IconInput
          label={checkOutText}
          name="Check-out"
          placeholder={checkOutText}
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

export interface UseCheckInOutInputPropsComponentReturn {
  showDatePicker: boolean;
  startDate: string;
  endDate: string;
  handleStartDateChange: (value: string) => void;
  handleEndDateChange: (value: string) => void;
  handleOpenDatePicker: () => void;
  handleCloseDatePicker: () => void;
}

export const useCheckInOutInput = () => {
  const params = useQuery();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    params.startDate
      ? params.startDate.toString()
      : formatAsSearchDate(dayjs()),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(1, 'day')),
  );
  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleOpenDatePicker = () => setShowDatePicker(true);
  const handleCloseDatePicker = () => setShowDatePicker(false);

  const propsComponent: UseCheckInOutInputPropsComponentReturn = {
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
