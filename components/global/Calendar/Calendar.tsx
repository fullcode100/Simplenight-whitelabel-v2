import { useEffect, useState, MouseEvent, UIEvent } from 'react';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import {
  createCalendar,
  createNewMonth,
  DayObject,
  MonthObject,
} from '../../../helpers/calendar/calendar';
import WeekDays from './components/Weekdays';
import FullScreenModal from '../NewModal/FullScreenModal';
import Day from './components/Day';
import RangeDate from './components/RangeDate';
import { formatAsRangeDate } from 'helpers/dajjsUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const initialYear = parseInt(dayjs().format('YYYY'));
const initialMonth = parseInt(dayjs().format('M'));

interface DatePickerProps {
  showDatePicker: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  initialStartDate: string;
  initialEndDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const DatePicker = ({
  showDatePicker,
  onClose,
  initialStartDate,
  initialEndDate,
  onStartDateChange,
  onEndDateChange,
}: DatePickerProps) => {
  const [calendar, setCalendar] = useState(
    createCalendar(initialYear, initialMonth),
  );
  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs().add(1, 'day').format('YYYY-MM-DD'),
  );
  const [isStartDateTurn, setIsStartDateTurn] = useState<boolean>(false);

  useEffect(() => {
    setStartDate(initialStartDate ?? startDate);
    setEndDate(initialEndDate ?? endDate);
  }, []);

  const addMonth = () => {
    setCalendar([...calendar, createNewMonth(calendar)]);
  };

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.target as Element;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      addMonth();
    }
  };

  const setDate = (date: string) => {
    if (isStartDateTurn) {
      if (dayjs(date).isSameOrAfter(dayjs(endDate)) && startDate) {
        return setEndDate(date);
      }
      setStartDate(date);
      setIsStartDateTurn(!isStartDateTurn);
      return;
    }
    if (!isStartDateTurn) {
      if (dayjs(date).isSameOrBefore(dayjs(startDate))) {
        return setStartDate(date);
      }
      setEndDate(date);
      setIsStartDateTurn(!isStartDateTurn);
      return;
    }
  };

  const setFullDate = () => {
    onStartDateChange(startDate);
    onEndDateChange(endDate);
    onClose();
  };

  return (
    <FullScreenModal
      open={showDatePicker}
      closeModal={onClose}
      title="Dates"
      textButton="Apply"
      applyModal={setFullDate}
    >
      <RangeDate
        isStartDateTurn={isStartDateTurn}
        onDateTurn={() => setIsStartDateTurn(!isStartDateTurn)}
        startDate={formatAsRangeDate(startDate)}
        endDate={formatAsRangeDate(endDate)}
      />
      <section
        className="grid grid-cols-7 overflow-y-scroll text-center text-base items-center px-5"
        onScroll={handleScroll}
      >
        {calendar.map((month: MonthObject) => {
          return (
            <>
              <h1 className="col-span-7 font-semibold text-dark-1000 mt-3 bg-white">{`${month.monthName} ${month.yearNumber}`}</h1>
              <WeekDays />
              {month.days.map((day: DayObject, index) => (
                <Day
                  day={day}
                  key={index + day.dayOfWeek}
                  setDate={setDate}
                  isStartDate={dayjs(day.date).isSame(dayjs(startDate))}
                  isEndDate={dayjs(day.date).isSame(dayjs(endDate))}
                  isRangeDate={dayjs(day.date).isBetween(
                    dayjs(startDate),
                    dayjs(endDate),
                  )}
                  isDisabled={dayjs(day.date).isSameOrBefore(
                    dayjs().subtract(1, 'day'),
                  )}
                />
              ))}
            </>
          );
        })}
      </section>
    </FullScreenModal>
  );
};

export default DatePicker;
