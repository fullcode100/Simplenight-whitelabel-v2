import dayjs from 'dayjs';
export const formatTime = (date: string, TIME_FORMAT = 'hh:mm A') => {
  return dayjs(date).format(TIME_FORMAT);
};

export const formatDate = (date: string, DATE_FORMAT = 'MMM DD, YYYY') => {
  return dayjs(date).format(DATE_FORMAT);
};

export const formatDateTime = (
  date: string,
  DATE_FORMAT = 'MM/DD/YY hh:mm A',
) => {
  return dayjs(date).format(DATE_FORMAT);
};

export const getDuration = (durationInMinutes: number) => {
  const duration = dayjs.duration(durationInMinutes, 'minutes');
  const flightInHours = duration.hours();
  const flightInMinutes = duration.minutes();
  return ` ${flightInHours}h ${flightInMinutes}m`;
};

export const getTextDuration = (legDuration: string) => {
  const arr = legDuration.match(/.{1,2}/g) || [];
  return `${arr[0]}h ${arr[1]}m`;
};

export const getAirlineIconUrl = (airlineCode: string) => {
  let url = ''; // `http://pics.avs.io/200/200/${airlineCode}.png`;
  const icons: string[] = [
    'AA',
    'AC',
    'AF',
    'AM',
    'AS',
    'B6',
    'BA',
    'DL',
    'EK',
    'EY',
    'FZ',
    'GF',
    'IB',
    'KU',
    'LH',
    'LO',
    'LX',
    'MA',
    'MS',
    'OS',
    'QF',
    'QR',
    'RJ',
    'SV',
    'TK',
    'UA',
    'XY',
  ];
  if (icons.indexOf(airlineCode) > -1)
    url = `/icons/airlines/${airlineCode}.png`;
  else url = '/icons/airlines/MA.png';
  return url;
};
