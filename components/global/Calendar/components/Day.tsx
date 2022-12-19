import { DayObject } from 'helpers/calendar/calendar';

interface DayProps {
  day: DayObject;
  setDate: (value: string) => void;
  isStartDate: boolean;
  isEndDate: boolean;
  isRangeDate: boolean;
  isDisabled: boolean;
  className?: string;
}

const Day = ({
  day,
  setDate,
  isStartDate,
  isEndDate,
  isRangeDate,
  isDisabled,
  className = '',
}: DayProps) => {
  const rangeDate = isRangeDate ? 'bg-primary-100' : '';
  const hoverDate = 'hover:bg-primary-1000 hover:text-white hover:rounded';
  return (
    <button
      onClick={() => setDate(day.date)}
      style={day.isFirstDayOfMonth ? { gridColumnStart: day.dayOfWeek } : {}}
      className={`p-2 col-span-1 ${
        isStartDate || isEndDate ? 'text-white' : 'text-dark-1000'
      } disabled:text-dark-700 mt-3 ${isDisabled ? '' : hoverDate} ${
        isStartDate || isEndDate ? 'bg-primary-1000 rounded' : rangeDate
      } ${className}`}
      key={day.date}
      disabled={isDisabled}
    >
      {`${day.dayOfMonth}`}
    </button>
  );
};

export default Day;
