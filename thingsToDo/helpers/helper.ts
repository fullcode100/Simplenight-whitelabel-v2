import { PricingTicketType } from 'thingsToDo/types/response/ThingsDetailResponse';

import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';

export {};
export const formatTicketTime = (date = '10:00') => {
  const [hours, minutes] = date.split(':');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  const time = `${parseInt(hours) % 12}:${minutes} ${ampm}`;
  return time;
};

export const getActivityDuration = (durationInMinutes: number) => {
  dayjs.extend(duration);
  const defaultDuration = {
    duration: durationInMinutes,
    durationUnit: 'minutes',
    rest: 0,
    restUnit: 'minutes',
  };
  const activityDuration = dayjs.duration({ minutes: durationInMinutes });
  const durationsArray = [
    {
      unitPlural: 'minutes',
      unitSingular: 'minute',
      function: (duration: Duration) => duration.asMinutes(),
      toMinutes: (durationInMinutes: number) => durationInMinutes,
    },
    {
      unitPlural: 'hours',
      unitSingular: 'hour',
      function: (duration: Duration) => duration.asHours(),
      toMinutes: (durationInHours: number) => {
        return dayjs.duration({ hours: durationInHours }).asMinutes();
      },
    },
    {
      unitPlural: 'days',
      unitSingular: 'day',
      function: (duration: Duration) => duration.asDays(),
      toMinutes: (durationInDays: number) => {
        return dayjs.duration({ days: durationInDays }).asMinutes();
      },
    },
  ];

  for (let i = durationsArray.length - 1; i >= 0; i--) {
    const currentDuration = durationsArray[i];

    const previousDuration = durationsArray[i - 1 > 0 ? i - 1 : 0];

    const durationInUnit = currentDuration.function(activityDuration);
    if (durationInUnit >= 1) {
      const roundedDuration =
        currentDuration.unitSingular === 'minute'
          ? Math.round(durationInUnit / 5) * 5
          : Math.floor(durationInUnit as number);

      const durationUnit =
        roundedDuration !== 1
          ? currentDuration.unitPlural
          : currentDuration.unitSingular;

      const restInMinutes = (durationInMinutes -
        currentDuration.toMinutes(roundedDuration)) as number;
      const restInMinutesDuration = dayjs.duration({ minutes: restInMinutes });

      const restInUnitDuration = previousDuration.function(
        restInMinutesDuration,
      );
      const roundedRest =
        previousDuration.unitSingular === 'minute'
          ? Math.round(restInUnitDuration / 15) * 15
          : Math.floor(restInUnitDuration as number);
      const restUnit =
        roundedRest !== 1
          ? previousDuration.unitPlural
          : previousDuration.unitSingular;

      const durationObject = {
        duration: roundedDuration,
        durationUnit,
        rest: roundedRest,
        restUnit,
      };
      return durationObject;
    }
  }
  return defaultDuration;
};

export const getDefaultGuests = (
  ticketTypes: PricingTicketType[],
  params: any,
) => {
  const numberTravelers = 2;
  const numberDefault = 0;
  const defaultGuestData: any = {};
  ticketTypes?.forEach((ticketType) => {
    const type = ticketType?.ticket_type_id;
    const isAdultOrTraveler = type === 'ADULT' || type === 'TRAVELER';
    const valueTicket = isAdultOrTraveler ? numberTravelers : numberDefault;
    defaultGuestData[type] = parseInt(params[type]) || valueTicket;
  });
  return defaultGuestData;
};
