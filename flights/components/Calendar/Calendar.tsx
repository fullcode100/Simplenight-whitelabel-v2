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
import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import Day from './components/Day';
import RangeDate from './components/RangeDate';
import {
  formatAsRangeDate,
  initialMonth,
  initialYear,
} from 'helpers/dajjsUtils';
import { useTranslation } from 'react-i18next';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
require('dayjs/locale/es');

interface DatePickerProps {
  showDatePicker: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  startDateLabel: string;
  endDateLabel: string;
  initialStartDate: string;
  initialEndDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  openOnStart: boolean;
  equal: boolean;
}

const DatePicker = ({
  showDatePicker,
  onClose,
  startDateLabel,
  endDateLabel,
  initialStartDate,
  initialEndDate,
  onStartDateChange,
  onEndDateChange,
  openOnStart,
  equal,
}: DatePickerProps) => {
  const defaultIntervalDays = 7;
  const maxIntervalMonths = 12;
  const [t, i18n] = useTranslation('global');
  dayjs.locale(i18n.resolvedLanguage);
  const datesText = t('dates', 'Dates');
  const applyText = t('apply', 'Apply');
  const [calendar, setCalendar] = useState<MonthObject[]>();
  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs()
      .add(equal ? 0 : defaultIntervalDays, 'day')
      .format('YYYY-MM-DD'),
  );
  const [isStartDateTurn, setIsStartDateTurn] = useState<boolean>(openOnStart);

  useEffect(() => {
    setCalendar(createCalendar(initialYear, initialMonth));
    setStartDate(initialStartDate ?? startDate);
    setEndDate(initialEndDate ?? endDate);
  }, []);

  useEffect(() => {
    setIsStartDateTurn(openOnStart);
  }, [openOnStart]);

  const setDate = (date: string) => {
    if (equal) {
      setStartDate(date);
      return;
    }
    const limitDate = dayjs().add(1, 'year');
    const endDateAutomatic = dayjs(date).add(
      equal ? 0 : defaultIntervalDays,
      'day',
    );
    const isAfterEndDate = dayjs(date).isSameOrAfter(dayjs(endDate));
    const isBeforeEndDate = dayjs(date).isBefore(
      dayjs(endDate).subtract(2, 'week'),
    );
    if (isStartDateTurn) {
      if ((isAfterEndDate && startDate) || isBeforeEndDate) {
        setStartDate(date);
        setEndDate(
          endDateAutomatic.isAfter(limitDate)
            ? limitDate.format('YYYY-MM-DD')
            : endDateAutomatic.format('YYYY-MM-DD'),
        );
        setIsStartDateTurn(!isStartDateTurn);
        return;
      }
      setStartDate(date);
      setIsStartDateTurn(!isStartDateTurn);
      return;
    }
    const isBeforeStartDate = dayjs(date).isSameOrBefore(dayjs(startDate));
    if (!isStartDateTurn) {
      if (isBeforeStartDate) {
        setStartDate(date);
        setEndDate(
          endDateAutomatic.isAfter(limitDate)
            ? limitDate.format('YYYY-MM-DD')
            : endDateAutomatic.format('YYYY-MM-DD'),
        );
        return;
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
      className={
        'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
      }
    >
      {equal ? (
        <RangeDate
          isStartDateTurn={isStartDateTurn}
          onDateTurn={() => setIsStartDateTurn(!isStartDateTurn)}
          startDateLabel={startDateLabel}
          endDateLabel=""
          startDate={formatAsRangeDate(startDate)}
          endDate={formatAsRangeDate(startDate)}
          equal={equal}
        />
      ) : (
        <RangeDate
          isStartDateTurn={isStartDateTurn}
          onDateTurn={() => setIsStartDateTurn(!isStartDateTurn)}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          startDate={formatAsRangeDate(startDate)}
          endDate={formatAsRangeDate(endDate)}
          equal={equal}
        />
      )}
      <section className="grid grid-cols-7 overflow-y-scroll text-center text-base items-center px-5">
        {calendar?.map((month: MonthObject, index) => {
          return (
            <Fragment key={index}>
              <p className="col-span-7 font-semibold text-dark-1000 text-base leading-base mt-3">{`${fromLowerCaseToCapitilize(
                month.monthName,
              )} ${month.yearNumber}`}</p>
              <WeekDays />
              {equal &&
                month.days.map((day: DayObject, index) => (
                  <Day
                    day={day}
                    key={index + day.dayOfWeek}
                    setDate={setDate}
                    isStartDate={dayjs(day.date).isSame(dayjs(startDate))}
                    isEndDate={dayjs(day.date).isSame(dayjs(startDate))}
                    isRangeDate={dayjs(day.date).isBetween(
                      dayjs(startDate),
                      dayjs(startDate),
                    )}
                    isDisabled={
                      dayjs(day.date).isSameOrBefore(
                        dayjs().subtract(1, 'day'),
                      ) ||
                      dayjs(day.date).isAfter(
                        dayjs().add(maxIntervalMonths, 'month'),
                      ) ||
                      (!isStartDateTurn &&
                        dayjs(day.date).isAfter(
                          dayjs(startDate).add(maxIntervalMonths, 'month'),
                        ))
                    }
                  />
                ))}
              {!equal &&
                month.days.map((day: DayObject, index) => (
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
                      dayjs(day.date).isAfter(
                        dayjs().add(maxIntervalMonths, 'month'),
                      ) ||
                      (!isStartDateTurn &&
                        dayjs(day.date).isAfter(
                          dayjs(startDate).add(maxIntervalMonths, 'month'),
                        ))
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
