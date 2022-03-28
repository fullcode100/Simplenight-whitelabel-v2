import dayjs from 'dayjs';

const MONTH_DAY_FORMAT = 'M/D';

export const SEARCH_DATE_FORMAT = 'YYYY-MM-DD';

export const formatAsMonthDay = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format(MONTH_DAY_FORMAT);
