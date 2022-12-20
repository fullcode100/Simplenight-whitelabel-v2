import Day from './Day';
import WeekDays from './Weekdays';
import { DayObject, MonthObject } from 'helpers/calendar/calendar';
import dayjs from 'dayjs';
import { formatAsSearchDate } from 'helpers/dajjsUtils';

interface DayListProps {
  month: MonthObject;
  isRange: boolean;
  startDate: string;
  endDate: string;
  setDate: (date: string) => void;
  isStartDateTurn: boolean;
  maxRange: number;
  className?: string;
  restricted?: boolean;
  disabledDays?: string[];
}

const DayList = ({
  month,
  isRange,
  startDate,
  endDate,
  setDate,
  isStartDateTurn,
  maxRange,
  className = '',
  restricted = true,
  disabledDays,
}: DayListProps) => {
  return (
    <>
      <WeekDays />
      {month.days.map((day: DayObject, index: number) => {
        const isEndDate = isRange
          ? dayjs(day.date).isSame(dayjs(endDate))
          : false;
        const isRangeDate = isRange
          ? dayjs(day.date).isBetween(dayjs(startDate), dayjs(endDate))
          : false;
        const isDisabledRange = isRange
          ? dayjs(day.date).isBefore(dayjs().subtract(1, 'day')) ||
            dayjs(day.date).isAfter(dayjs().add(16, 'month')) ||
            (!isStartDateTurn &&
              restricted &&
              dayjs(day.date).isAfter(dayjs(startDate).add(maxRange, 'day')))
          : false;
        const isDisabledDay = disabledDays
          ? !disabledDays?.includes(day.date)
          : false;
        const isDisabled = isDisabledRange || isDisabledDay;

        return (
          <Day
            day={day}
            key={index + day.dayOfWeek}
            setDate={setDate}
            isStartDate={dayjs(day.date).isSame(dayjs(startDate))}
            isEndDate={isEndDate}
            isRangeDate={isRangeDate}
            isDisabled={isDisabled}
            className={className}
          />
        );
      })}
    </>
  );
};

export default DayList;
