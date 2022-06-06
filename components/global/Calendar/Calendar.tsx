import { useEffect, useState, MouseEvent, Fragment } from 'react';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import {
  createCalendar,
  DayObject,
  MonthObject,
} from '../../../helpers/calendar/calendar';
import WeekDays from './components/Weekdays';
import FullScreenModal from '../NewModal/FullScreenModal';
import Day from './components/Day';
import RangeDate from './components/RangeDate';
import {
  formatAsRangeDate,
  initialMonth,
  initialYear,
} from 'helpers/dajjsUtils';
import { useTranslation } from 'react-i18next';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

interface DatePickerProps {
  showDatePicker: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  initialStartDate: string;
  initialEndDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  openOnStart: boolean;
}

const DatePicker = ({
  showDatePicker,
  onClose,
  initialStartDate,
  initialEndDate,
  onStartDateChange,
  onEndDateChange,
  openOnStart,
}: DatePickerProps) => {
  const [t] = useTranslation('hotels');
  const datesText = t('dates', 'Dates');
  const applyText = t('apply', 'Apply');
  const [calendar, setCalendar] = useState(
    createCalendar(initialYear, initialMonth),
  );
  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs().add(1, 'day').format('YYYY-MM-DD'),
  );
  const [isStartDateTurn, setIsStartDateTurn] = useState<boolean>(openOnStart);

  useEffect(() => {
    setStartDate(initialStartDate ?? startDate);
    setEndDate(initialEndDate ?? endDate);
  }, []);

  useEffect(() => {
    setIsStartDateTurn(openOnStart);
  }, [openOnStart]);

  const setDate = (date: string) => {
    if (isStartDateTurn) {
      if (
        (dayjs(date).isSameOrAfter(dayjs(endDate)) && startDate) ||
        dayjs(date).isBefore(dayjs(endDate).subtract(2, 'week'))
      ) {
        setStartDate(date);
        setEndDate(dayjs(date).add(1, 'day').format('YYYY-MM-DD'));
        setIsStartDateTurn(!isStartDateTurn);
        return;
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
      title={datesText}
      primaryButtonText={applyText}
      primaryButtonAction={setFullDate}
      hasMultipleActions={false}
    >
      <RangeDate
        isStartDateTurn={isStartDateTurn}
        onDateTurn={() => setIsStartDateTurn(!isStartDateTurn)}
        startDate={formatAsRangeDate(startDate)}
        endDate={formatAsRangeDate(endDate)}
      />
      <section className="grid grid-cols-7 overflow-y-scroll text-center text-base items-center px-5">
        {calendar.map((month: MonthObject, index) => {
          return (
            <Fragment key={index}>
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
                  isDisabled={
                    dayjs(day.date).isSameOrBefore(
                      dayjs().subtract(1, 'day'),
                    ) ||
                    dayjs(day.date).isAfter(dayjs().add(16, 'month')) ||
                    (!isStartDateTurn &&
                      dayjs(day.date).isAfter(dayjs(startDate).add(2, 'week')))
                  }
                />
              ))}
            </Fragment>
          );
        })}
      </section>
    </FullScreenModal>
  );
};

export default DatePicker;
