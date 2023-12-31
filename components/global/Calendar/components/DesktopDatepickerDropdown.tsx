import React, { useEffect, useRef, MouseEvent, useState } from 'react';

import LeftArrow from 'public/icons/assets/carousel-left-arrow.svg';
import RightArrow from 'public/icons/assets/carousel-right-arrow.svg';

import classnames from 'classnames';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { MonthObject } from 'helpers/calendar/calendar';
import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';
import DayList from './DayList';

interface Props {
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  rangeDate?: JSX.Element;
  calendar?: MonthObject[];
  setDate: (date: string) => void;
  startDate: string;
  endDate: string;
  isStartDateTurn: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  calendarFirstMonth: number;
  setCalendarFirstMonth: (value: number) => void;
  calendarSecondMonth: number;
  setCalendarSecondMonth: (value: number) => void;
  maxRange: number;
  restricted?: boolean;
  isRange?: boolean;
  disabledDays?: string[];
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
  restricted = true,
  isRange = true,
  disabledDays,
}: Props) => {
  const ref = useRef<HTMLElement>(null);
  useOnOutsideClick(ref, () => closeModal());

  useEffect(() => {
    onStartDateChange(startDate);
    if (onEndDateChange) {
      onEndDateChange(endDate);
    }
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
      <div className="w-full  px-5 absolute top-[80px] mt-[6px] z-50">
        {calendarFirstMonth > 0 && (
          <ArrowButton
            icon={<LeftArrow className="w-15 h-15" />}
            value={-1}
            className={'absolute left-4'}
          />
        )}
        {calendar && calendarSecondMonth < calendar.length - 1 && (
          <ArrowButton
            icon={<RightArrow className="w-15 h-15" />}
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
      <p className="pb-3 text-sm font-semibold text-dark-1000 leading-base">{`${fromLowerCaseToCapitilize(
        month.monthName,
      )} ${month.yearNumber}`}</p>
      <section className="grid grid-cols-7 ">
        <DayList
          month={month}
          isRange={isRange}
          startDate={startDate}
          endDate={endDate}
          setDate={setDate}
          isStartDateTurn={isStartDateTurn}
          maxRange={maxRange}
          className={'pt-2 mt-1 text-xs'}
          restricted={restricted}
          disabledDays={disabledDays}
        />
      </section>
    </section>
  );

  return (
    <section
      ref={ref}
      className={classnames(
        'flex flex-col  bg-white  w-[610px] absolute left-0 top-[68px] shadow-container rounded-4 overflow-hidden border border-dark-300 z-20',
        {
          ['hidden']: !open,
        },
      )}
    >
      {rangeDate}
      <ArrowSection />
      <section className="grid items-start w-full grid-cols-2 gap-2 p-5 text-center">
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
