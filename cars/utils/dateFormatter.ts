export const dateFormatter = (date: string, time: string) => {
  const DateToFormatt = date;
  const Time = time.split(/:|\s/);
  const Hour = Time[2] === 'AM' ? +Time[0] : +Time[0] + 12;
  const Minute = +Time[1];
  const DateForFormat = new Date(DateToFormatt + 'T00:00:00Z');
  DateForFormat.setUTCHours(Hour, Minute, 0);
  return DateForFormat.toISOString();
};
