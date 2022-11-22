import React from 'react';
import { useTranslation } from 'react-i18next';
import { getActivityDuration } from 'thingsToDo/helpers/helper';

interface RangeDuration {
  minDuration: number;
  maxDuration: number;
}
interface DurationProps {
  duration: number | RangeDuration;
}

interface DurationObject {
  duration: number;
  durationUnit: string;
  rest: number;
  restUnit: string;
}
const DurationLabel = ({ duration }: DurationProps) => {
  const [t] = useTranslation('things');
  const durationIsRange = typeof duration !== 'number';
  let formatedDuration = '';

  const formatDuration = (durationObject: DurationObject) => {
    const translatedDurationUnit = `${t(
      durationObject.durationUnit,
      durationObject.durationUnit,
    )}`;
    const durationLabel = `${durationObject.duration} ${translatedDurationUnit}`;
    const hasRest = durationObject.rest && durationObject.rest > 0;
    const translatedRestUnit = `${t(
      durationObject.restUnit,
      durationObject.restUnit,
    )}`;
    const restLabel = hasRest
      ? `${durationObject.rest} ${translatedRestUnit}`
      : '';

    return `${durationLabel} ${restLabel}`;
  };

  if (durationIsRange) {
    const { minDuration, maxDuration } = duration;
    const minDurationObject = getActivityDuration(minDuration);
    const maxDurationObject = getActivityDuration(maxDuration);
    formatedDuration = `${formatDuration(minDurationObject)} - ${formatDuration(
      maxDurationObject,
    )}`;
  } else {
    const durationObject = getActivityDuration(duration);
    formatedDuration = formatDuration(durationObject);
  }

  return <>{formatedDuration}</>;
};

export default DurationLabel;
