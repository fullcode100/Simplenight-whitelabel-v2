import dayjs from 'dayjs';

export const ceilToNextHalfHour = (date: dayjs.Dayjs): dayjs.Dayjs => {
  const minutes = date.get('minutes');
  if (minutes > 30) {
    return date.startOf('hour').add(1, 'hour');
  } else {
    return date.set('minutes', 30);
  }
};
