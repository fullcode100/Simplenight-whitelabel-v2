import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateString } from 'types/global/DateString';

const MONTH_DAY_FORMAT = 'M/D';

const RANGE_DATE_FORMAT = 'ddd, MMM DD YYYY';

const DISPLAY_DATE_FORMAT = 'MMM DD YYYY';

export const SEARCH_DATE_FORMAT = 'YYYY-MM-DD';

const DISPLAY_HOUR_FORMAT = 'h:mm A';

const EXACT_HOUR_FORMAT = 'HH:MM:SS';

const EXACT_DATETIME_FORMAT = 'MMM DD YYYY, h:mm A';

dayjs.extend(customParseFormat);

export const formatAsMonthDay = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format(MONTH_DAY_FORMAT);

export const formatAsSearchDate = (
  date: string | number | Date | dayjs.Dayjs,
) => dayjs(date).format(SEARCH_DATE_FORMAT) as unknown as DateString;

export const formatAsRangeDate = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format(RANGE_DATE_FORMAT);

export const formatAsDisplayDate = (
  date: string | number | Date | dayjs.Dayjs,
) => dayjs(date).format(DISPLAY_DATE_FORMAT);

export const initialYear = parseInt(dayjs().format('YYYY'));

export const initialMonth = parseInt(dayjs().format('M'));

export const formatAsDisplayHour = (hour: string | number) => {
  const exactDate = dayjs(hour, EXACT_HOUR_FORMAT).toDate();
  const displayDAte = dayjs(exactDate).format(DISPLAY_HOUR_FORMAT);
  return displayDAte;
};

export const formatAsExactHour = (
  hour: string | number | Date | dayjs.Dayjs,
) => {
  const date = dayjs(hour, DISPLAY_HOUR_FORMAT).toDate();
  return dayjs(date).format('HH:mm');
};

export const formatAsDisplayDatetime = (datetime: string) =>
  dayjs(datetime).format(EXACT_DATETIME_FORMAT);

export const diffDays = (
  startDate: string | number | Date | dayjs.Dayjs,
  endDate: string | number | Date | dayjs.Dayjs,
) => dayjs(endDate).diff(dayjs(startDate), 'days');

export const getCurrenDate = () => dayjs().format(SEARCH_DATE_FORMAT);
