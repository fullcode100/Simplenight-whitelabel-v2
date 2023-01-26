import { useEffect, useState, MouseEvent, Fragment } from 'react';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

import {
  createCalendar,
  MonthObject,
} from '../../../helpers/calendar/calendar';
import FullScreenModal from '../NewModal/FullScreenModal';
import RangeDate from './components/RangeDate';
import {
  formatAsRangeDate,
  initialMonth,
  initialYear,
} from 'helpers/dajjsUtils';
import { useTranslation } from 'react-i18next';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import DesktopDatepickerDropdown from './components/DesktopDatepickerDropdown';
import DayList from './components/DayList';
import useMediaViewport from 'hooks/media/useMediaViewport';

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
  maxRange?: number;
  minRange?: number;
  setIsEditing?: (value: boolean) => void;
  restricted?: boolean;
  isRange?: boolean;
  disabledDays?: string[];
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
  maxRange = 14,
  minRange = 1,
  setIsEditing,
  restricted = true,
  isRange = true,
  disabledDays,
}: DatePickerProps) => {
  const [t, i18n] = useTranslation('global');
  dayjs.locale(i18n.resolvedLanguage);
  const datesText = t('dates', 'Dates');
  const applyText = t('apply', 'Apply');
  const [calendar, setCalendar] = useState<MonthObject[]>();
  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs().add(1, 'day').format('YYYY-MM-DD'),
  );
  const [isStartDateTurn, setIsStartDateTurn] = useState<boolean>(openOnStart);
  const isStartTurnValue = !isRange || isStartDateTurn;

  const { isDesktop } = useMediaViewport();

  useEffect(() => {
    setCalendar(createCalendar(initialYear, initialMonth));
    setStartDate(initialStartDate ?? startDate);
    setEndDate(initialEndDate ?? endDate);
  }, []);

  useEffect(() => {
    setIsStartDateTurn(openOnStart);
  }, [openOnStart]);

  const setDate = (date: string) => {
    setIsEditing?.(true);
    if (!isRange || isStartDateTurn) {
      const isMaxRange = isRange
        ? (dayjs(date).isSameOrAfter(dayjs(endDate)) && startDate) ||
          (restricted &&
            (dayjs(date).isBefore(dayjs(endDate).subtract(maxRange, 'day')) ||
              dayjs(date).isBetween(
                dayjs(startDate),
                dayjs(startDate).add(minRange, 'day'),
              )))
        : false;
      if (isMaxRange) {
        setStartDate(date);
        setEndDate(dayjs(date).add(minRange, 'day').format('YYYY-MM-DD'));
        setIsStartDateTurn(!isStartTurnValue);
        return;
      }
      setStartDate(date);
      setIsStartDateTurn(!isStartTurnValue);
      return;
    }
    if (!isStartDateTurn) {
      if (dayjs(date).isBefore(dayjs(startDate))) {
        setStartDate(date);
        setEndDate(dayjs(date).add(minRange, 'day').format('YYYY-MM-DD'));
        return;
      }
      if (dayjs(date).isSame(dayjs(startDate))) {
        setEndDate(dayjs(date).add(minRange, 'day').format('YYYY-MM-DD'));
        return;
      }
      if (
        dayjs(date).isBetween(
          dayjs(startDate),
          dayjs(startDate).add(minRange, 'day'),
        )
      ) {
        setEndDate(dayjs(startDate).add(minRange, 'day').format('YYYY-MM-DD'));
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
    if (setIsEditing) {
      setIsEditing(true);
    }
    onClose();
  };

  const [calendarFirstMonth, setCalendarFirstMonth] = useState(0);
  const [calendarSecondMonth, setCalendarSecondMonth] = useState(1);

  const DesktopDatePicker = (
    <DesktopDatepickerDropdown
      open={showDatePicker}
      closeModal={onClose}
      rangeDate={
        <RangeDate
          isStartDateTurn={isStartTurnValue}
          onDateTurn={() => setIsStartDateTurn(!isStartTurnValue)}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          startDate={formatAsRangeDate(startDate)}
          endDate={formatAsRangeDate(endDate)}
          isRange={isRange}
        />
      }
      calendar={calendar}
      setDate={setDate}
      startDate={startDate}
      endDate={endDate}
      isStartDateTurn={isStartDateTurn}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      calendarFirstMonth={calendarFirstMonth}
      setCalendarFirstMonth={setCalendarFirstMonth}
      calendarSecondMonth={calendarSecondMonth}
      setCalendarSecondMonth={setCalendarSecondMonth}
      maxRange={maxRange}
      restricted={restricted}
      isRange={isRange}
      disabledDays={disabledDays}
    />
  );

  return (
    <>
      {isDesktop ? (
        <section>{DesktopDatePicker}</section>
      ) : (
        <FullScreenModal
          open={showDatePicker}
          closeModal={onClose}
          title={datesText}
          primaryButtonText={applyText}
          primaryButtonAction={setFullDate}
          hasMultipleActions={false}
          className={`lg:rounded-4 lg:overflow-hidden
      lg:w-[842px] lg:h-[660px]  lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2
      lg:shadow-full`}
        >
          <RangeDate
            isStartDateTurn={isStartTurnValue}
            onDateTurn={() => setIsStartDateTurn(!isStartTurnValue)}
            startDateLabel={startDateLabel}
            endDateLabel={endDateLabel}
            startDate={formatAsRangeDate(startDate)}
            endDate={formatAsRangeDate(endDate)}
            isRange={isRange}
          />
          <section className="grid items-center grid-cols-7 px-5 overflow-y-scroll text-base text-center">
            {calendar?.map((month: MonthObject, index) => {
              return (
                <Fragment key={index}>
                  <p className="col-span-7 mt-3 text-base font-semibold text-dark-1000 leading-base">{`${fromLowerCaseToCapitilize(
                    month.monthName,
                  )} ${month.yearNumber}`}</p>
                  <DayList
                    month={month}
                    isRange={isRange}
                    startDate={startDate}
                    endDate={endDate}
                    setDate={setDate}
                    isStartDateTurn={isStartDateTurn}
                    maxRange={maxRange}
                    restricted={restricted}
                    disabledDays={disabledDays}
                  />
                </Fragment>
              );
            })}
          </section>
        </FullScreenModal>
      )}
    </>
  );
};

export default DatePicker;
