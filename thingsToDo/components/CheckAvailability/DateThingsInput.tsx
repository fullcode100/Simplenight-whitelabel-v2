import DatePicker from '../../../components/global/Calendar/Calendar';
import IconInput from '../../../components/global/Input/IconInput';
import Calendar from 'public/icons/assets/calendar.svg';
import { formatAsDisplayDate } from 'helpers/dajjsUtils';
import { useTranslation } from 'react-i18next';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
interface DateThingsInputProps {
  showDatePicker: boolean;
  startDate: string;
  endDate: string;
  handleStartDateChange: (date: string) => void;
  handleEndDateChange: (date: string) => void;
  handleOpenDatePicker: () => void;
  handleCloseDatePicker: () => void;
  setIsEditing?: (value: boolean) => void;
  isRange?: boolean;
}

const DateThingsInput = ({
  showDatePicker,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleOpenDatePicker,
  handleCloseDatePicker,
  setIsEditing,
  isRange = true,
}: DateThingsInputProps) => {
  const [tg] = useTranslation('global');
  const dateText = tg('date', 'Date');
  const checkInText = tg('checkIn', 'Check In');
  const checkOutText = tg('checkOut', 'Check Out');
  return (
    <>
      <section className="relative flex w-full gap-4 lg:w-1/2">
        <IconInput
          label={dateText}
          name="Check-in"
          placeholder={dateText}
          className="mt-4 lg:mt-0"
          orientation="left"
          icon={<Calendar className="w-5 h-5 text-dark-700" />}
          value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
          onChange={(event) => handleStartDateChange(event.target.value)}
          onClick={handleOpenDatePicker}
        />
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
          setIsEditing={setIsEditing}
          isRange={isRange}
        />
      </section>
    </>
  );
};

export default DateThingsInput;
