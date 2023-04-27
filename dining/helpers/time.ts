import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const transformTo12hours = (label: string, withDivider?: boolean) => {
  let labelString = label;
  if (labelString) {
    const labelSplited = label.split(':');
    if (!withDivider) {
      labelSplited[0] = label.substring(0, 2);
      labelSplited[1] = label.substring(2);
    }

    const hour = `${labelSplited[0]}:${labelSplited[1]}`;
    const date = dayjs(hour, 'HH:mm').toDate();
    labelString = dayjs(date).format('hh:mm A');
  }

  return labelString;
};

export const transformTo12hoursLowercase = (label?: string) => {
  let labelString = label;
  if (label) {
    const date = dayjs(label, 'HH:mm').toDate();
    labelString = dayjs(date).format('hh:mm A');
  }

  return labelString;
};
