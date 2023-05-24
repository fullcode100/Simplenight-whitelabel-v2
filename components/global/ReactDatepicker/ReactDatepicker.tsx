import { IconWrapper, Paragraph } from '@simplenight/ui';
import dayjs from 'dayjs';
import { range } from 'lodash';
import React, { useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import classnames from 'classnames';
import ChevronRight from 'public/icons/assets/chevron-right.svg';

interface DatepickerProps {
  onChange: (date: Date) => void;
  selected?: Date;
  maxDate?: Date;
}

interface DatePickerHeaderProps {
  date: Date;
  changeMonth(month: number): void;
  changeYear(year: number): void;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}
const ReactDatepicker = ({
  onChange,
  selected,
  maxDate = new Date(),
}: DatepickerProps) => {
  const [showYearModal, setShowYearModal] = useState(false);

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const itemsPerPage = 20;
  const numberOfPages = 8;
  const endYear = dayjs(maxDate).year();
  const startYear = endYear - itemsPerPage * numberOfPages + 1;
  const years = range(startYear, endYear + 1, 1);
  const yearsToShow: number[][] = [];

  for (let i = 0; i < years.length; i += itemsPerPage) {
    yearsToShow.push(years.slice(i, i + itemsPerPage));
  }

  const currentYearIndex = yearsToShow.findIndex(
    (years) => years.indexOf(currentYear) !== -1,
  );

  const [currentYearPage, setCurrentYearPage] = useState(currentYearIndex);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const YearSelectorButton = ({
    currentMonth,
    currentYear,
  }: {
    currentMonth: string;
    currentYear: number;
  }) => {
    return (
      <button
        className={classnames(
          'p-3 border border-dark-300 rounded',
          showYearModal && '!border-primary-1000',
        )}
        onClick={() => setShowYearModal((show) => !show)}
      >
        <Paragraph size="small" fontWeight="semibold">
          {showYearModal
            ? `${yearsToShow[currentYearPage][0]} - ${
                yearsToShow[currentYearPage][itemsPerPage - 1]
              }`
            : `${currentMonth} ${currentYear}`}
        </Paragraph>
      </button>
    );
  };

  const handlePreviousClick = (decreaseMonth: () => void) => {
    if (showYearModal) {
      setCurrentYearPage((prevPage) => prevPage - 1);
    } else {
      decreaseMonth();
    }
  };
  const handleNextClick = (increaseMonth: () => void) => {
    if (showYearModal) {
      setCurrentYearPage((prevPage) => prevPage + 1);
    } else {
      increaseMonth();
    }
  };

  const canMoveYearsForward = currentYearPage < numberOfPages - 1;
  const canMoveYearsBack = currentYearPage > 0;

  const handleChangeYear = (
    year: number,
    changeYear: (year: number) => void,
  ) => {
    setSelectedYear(year);
    changeYear(year);
    setShowYearModal(false);
  };
  const DatePickerHeader = ({
    date,
    changeYear,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: DatePickerHeaderProps) => {
    return (
      <div className="flex gap-2 pl-4 pr-2 justify-between py-2 relative items-center">
        <YearSelectorButton
          currentMonth={months[dayjs(date).get('month')]}
          currentYear={dayjs(date).get('year')}
        />

        <div
          className={classnames(
            !showYearModal && 'hidden',
            'w-full  bg-white absolute left-0 top-[72px]  grid grid-cols-4  gap-2 px-5 border border-dark-300 p-2',
          )}
        >
          {yearsToShow[currentYearPage].map((year) => (
            <button
              className={classnames(
                'rounded py-1.5 ',
                selectedYear === year &&
                  'bg-primary-100 border border-primary-1000',
              )}
              key={year}
              onClick={() => handleChangeYear(year, changeYear)}
            >
              <Paragraph fontWeight="semibold">{year}</Paragraph>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className="disabled:!opacity-25 rounded-full bg-white border-dark-300 h-8 w-8 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              handlePreviousClick(decreaseMonth);
            }}
            disabled={
              showYearModal ? !canMoveYearsBack : prevMonthButtonDisabled
            }
          >
            <IconWrapper size={20}>
              <ChevronRight className="rotate-180" />
            </IconWrapper>
          </button>

          <button
            className="disabled:!opacity-25 rounded-full bg-white border-dark-300 h-8 w-8 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              handleNextClick(increaseMonth);
            }}
            disabled={
              showYearModal ? !canMoveYearsForward : nextMonthButtonDisabled
            }
          >
            <IconWrapper size={20}>
              <ChevronRight />
            </IconWrapper>
          </button>
        </div>
      </div>
    );
  };
  const renderDayContents = (day: number, date?: Date) => {
    const isDaySelected = dayjs(date).isSame(selected, 'day');
    const isDayDisabled = dayjs(date).isAfter(maxDate, 'day');
    return (
      <div
        className={classnames(
          'h-6 flex items-center justify-center w-full',
          isDaySelected && '!bg-primary-1000  !rounded',
        )}
      >
        <Paragraph
          size="xsmall"
          className={classnames(
            isDaySelected && '!text-white',
            isDayDisabled && '!text-dark-500',
          )}
        >
          {day}
        </Paragraph>
      </div>
    );
  };
  return (
    <DatePicker
      renderDayContents={(dayOfTheMonth, date) =>
        renderDayContents(dayOfTheMonth, date)
      }
      maxDate={maxDate}
      selected={selected}
      onChange={onChange}
      onCalendarClose={() => setShowYearModal(false)}
      className="text-dark-1000 border-dark-300 focus:border-primary-1000 rounded w-full"
      showPopperArrow={false}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <DatePickerHeader
          date={date}
          changeYear={changeYear}
          changeMonth={changeMonth}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          prevMonthButtonDisabled={prevMonthButtonDisabled}
          nextMonthButtonDisabled={nextMonthButtonDisabled}
        />
      )}
    ></DatePicker>
  );
};

export default ReactDatepicker;
