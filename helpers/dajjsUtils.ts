import dayjs from 'dayjs';
import { DateString } from 'types/global/DateString';

const MONTH_DAY_FORMAT = 'M/D';

const RANGE_DATE_FORMAT = 'ddd., DD MMM.';

export const SEARCH_DATE_FORMAT = 'YYYY-MM-DD';

export const formatAsMonthDay = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format(MONTH_DAY_FORMAT);

export const formatAsSearchDate = (
  date: string | number | Date | dayjs.Dayjs,
) => dayjs(date).format(SEARCH_DATE_FORMAT) as unknown as DateString;

export const formatAsRangeDate = (date: string | number | Date | dayjs.Dayjs) => dayjs(date).format(RANGE_DATE_FORMAT);
