import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { deepCopy } from 'helpers/objectUtils';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export interface DayObject {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  dayOfWeek: number;
  isFirstDayOfMonth: boolean;
}

export interface MonthObject {
  yearNumber: number;
  monthNumber: number;
  monthName: string;
  days: Array<DayObject>;
}

const getNumberOfDaysInMonth = (year: number, month: number): number => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
};

const getWeekday = (date: string): number => {
  return dayjs(date).weekday();
};

const getDay = (index: number): number => {
  return index + 1;
};

const createDay = (year: number, month: number, index: number): DayObject => {
  return {
    date: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
    dayOfMonth: getDay(index),
    isCurrentMonth: true,
    dayOfWeek: getWeekday(`${year}-${month}-${getDay(index)}`) + 1,
    isFirstDayOfMonth: getDay(index) === 1 ? true : false,
  };
};

const createDaysForCurrentMonth = (
  year: number,
  month: number,
): MonthObject => {
  return {
    yearNumber: year,
    monthNumber: month,
    monthName: dayjs(`${year}-${month}-01`).format('MMMM'),
    days: [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) =>
      createDay(year, month, index),
    ),
  };
};

const createMonth = (year: number, month: number): MonthObject => {
  const currentMonthDays = createDaysForCurrentMonth(year, month);

  return { ...currentMonthDays };
};

export const createNewMonth = (calendar: Array<MonthObject>): MonthObject => {
  const lastMonthInCalendar = deepCopy(calendar[calendar.length - 1]);
  lastMonthInCalendar.monthNumber = lastMonthInCalendar.monthNumber + 1;
  if (lastMonthInCalendar.monthNumber > 12) {
    lastMonthInCalendar.monthNumber = 1;
    lastMonthInCalendar.yearNumber = lastMonthInCalendar.yearNumber + 1;
  }

  const newMonthDays = createDaysForCurrentMonth(
    lastMonthInCalendar.yearNumber,
    lastMonthInCalendar.monthNumber,
  );

  return { ...newMonthDays };
};

export const createCalendar = (
  year: number,
  month: number,
): Array<MonthObject> => {
  let calendar: any = [];

  for (let i = 1; i <= 16; i++) {
    calendar = [...calendar, createMonth(year, month)];
    month = month + 1;
    if (month > 12) {
      month = 1;
      year = year + 1;
    }
  }

  return calendar;
};
