export const transformTo12hours = (label: string, withDivider?: boolean) => {
  let labelString = label;
  if (labelString) {
    const labelSplited = label.split(':');
    if (!withDivider) {
      labelSplited[0] = label.substring(0, 2);
      labelSplited[1] = label.substring(2);
    }

    const hour = Number(labelSplited[0]);
    const isMoreThan12 = hour > 12;
    const newHour = isMoreThan12 ? hour - 12 : hour;
    labelString = `${newHour > 9 ? newHour : '0' + newHour}:${
      labelSplited[1]
    } ${isMoreThan12 ? 'PM' : 'AM'}`;
  }

  return labelString;
};

export const transformTo12hoursLowercase = (label?: string) => {
  let labelString = label;
  if (label) {
    const labelSplited = label.split(':');
    const hour = Number(labelSplited[0]);
    const minutes = Number(labelSplited[1]);
    const isMoreThan12 = hour > 12;
    const newHour = isMoreThan12 ? hour - 12 : hour;
    labelString = `${newHour}${minutes > 0 ? ':' + minutes : ''}${
      isMoreThan12 ? 'pm' : 'am'
    }`;
  }

  return labelString;
};
