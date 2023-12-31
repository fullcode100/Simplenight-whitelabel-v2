import { DayObject } from 'helpers/calendar/calendar';

interface DayProps {
  day: DayObject;
  setDate: (value: string) => void;
  isStartDate: boolean;
  isEndDate: boolean;
  isRangeDate: boolean;
  isDisabled: boolean;
}

const Day = ({
  day,
  setDate,
  isStartDate,
  isEndDate,
  isRangeDate,
  isDisabled,
}: DayProps) => {
  const rangeDate = isRangeDate ? 'bg-primary-100' : '';
  return (
    <button
      onClick={() => setDate(day.date)}
      style={day.isFirstDayOfMonth ? { gridColumnStart: day.dayOfWeek } : {}}
      className={`p-2 col-span-1 text-dark-1000 disabled:text-dark-700 mt-3 focus:bg-primary-1000 focus:text-white focus:rounded ${
        isStartDate || isEndDate
          ? 'bg-primary-1000 text-white rounded'
          : rangeDate
      }`}
      key={day.date}
      disabled={isDisabled}
    >
      {`${day.dayOfMonth}`}
    </button>
  );
};

export default Day;
