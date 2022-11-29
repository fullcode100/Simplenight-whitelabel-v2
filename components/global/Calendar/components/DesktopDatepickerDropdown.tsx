import React, { useEffect, useRef, MouseEvent } from 'react';

import LeftArrow from 'public/icons/assets/carousel-left-arrow.svg';
import RightArrow from 'public/icons/assets/carousel-right-arrow.svg';

import classnames from 'classnames';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import WeekDays from './Weekdays';
import { DayObject, MonthObject } from 'helpers/calendar/calendar';
import Day from './Day';
import dayjs from 'dayjs';
import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';

interface Props {
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  rangeDate: JSX.Element;
  calendar?: MonthObject[];
  setDate: (date: string) => void;
  startDate: string;
  endDate: string;
  isStartDateTurn: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  calendarFirstMonth: number;
  setCalendarFirstMonth: (value: number) => void;
  calendarSecondMonth: number;
  setCalendarSecondMonth: (value: number) => void;
  maxRange: number;
}
const DesktopDatepickerDropdown = ({
  open,
  closeModal,
  rangeDate,
  calendar,
  setDate,
  startDate,
  endDate,
  isStartDateTurn,
  onStartDateChange,
  onEndDateChange,
  calendarFirstMonth,
  setCalendarFirstMonth,
  calendarSecondMonth,
  setCalendarSecondMonth,
  maxRange,
}: Props) => {
  const ref = useRef<HTMLElement>(null);
  useOnOutsideClick(ref, () => closeModal());

  useEffect(() => {
    onStartDateChange(startDate);
    onEndDateChange(endDate);
  }, [startDate, endDate]);

  interface ArrowButtonProps {
    icon: JSX.Element;
    value: number;
    className: string;
  }

  const ArrowButton = ({ icon, value, className }: ArrowButtonProps) => {
    return (
      <button
        className={className}
        onClick={() => {
          setCalendarFirstMonth(calendarFirstMonth + value);
          setCalendarSecondMonth(calendarSecondMonth + value);
        }}
      >
        {icon}
      </button>
    );
  };
  const ArrowSection = () => {
    return (
      <div className="w-full  px-5 absolute top-[80px] mt-1 z-50">
        {calendarFirstMonth > 0 && (
          <ArrowButton
            icon={<LeftArrow />}
            value={-1}
            className={'absolute left-4'}
          />
        )}
        {calendar && calendarSecondMonth < calendar.length - 1 && (
          <ArrowButton
            icon={<RightArrow />}
            value={1}
            className={'absolute right-4'}
          />
        )}
      </div>
    );
  };

  interface MonthSectionProps {
    month: MonthObject;
  }
  const MonthSection = ({ month }: MonthSectionProps) => (
    <section className="h-full text-xs">
      <p className="mt-3 text-sm font-semibold text-dark-1000 leading-base">{`${fromLowerCaseToCapitilize(
        month.monthName,
      )} ${month.yearNumber}`}</p>
      <section className="grid grid-cols-7 ">
        <WeekDays />
        {month.days.map((day: DayObject, index: number) => (
          <Day
            className={'pt-2 mt-1 text-xs'}
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
              dayjs(day.date).isBefore(dayjs().subtract(1, 'day')) ||
              dayjs(day.date).isAfter(dayjs().add(16, 'month')) ||
              (!isStartDateTurn &&
                dayjs(day.date).isAfter(dayjs(startDate).add(maxRange, 'day')))
            }
          />
        ))}
      </section>
    </section>
  );
  return (
    <section
      ref={ref}
      className={classnames(
        'flex flex-col  bg-white  w-[610px] absolute right-0 top-[74px] shadow-container rounded-4 overflow-hidden border border-dark-300 z-10',
        {
          ['hidden']: !open,
        },
      )}
    >
      {rangeDate}
      <ArrowSection />
      <section className="flex grid items-start w-full grid-cols-2 gap-2 p-5 text-center">
        {calendar && (
          <>
            <MonthSection month={calendar[calendarFirstMonth]} />
            <MonthSection month={calendar[calendarSecondMonth]} />
          </>
        )}
      </section>
    </section>
  );
};

export default DesktopDatepickerDropdown;
