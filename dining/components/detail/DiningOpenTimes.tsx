import { transformTo12hours } from 'dining/helpers/time';
import { WeekDaysAvailability } from 'dining/types/response/SearchResponse';
import React from 'react';
import { useTranslation } from 'react-i18next';

const DiningOpenTimes = ({
  hoursByDay,
}: {
  hoursByDay?: WeekDaysAvailability;
}) => {
  const [t] = useTranslation('dining');

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-6 gap-x-8">
        {hoursByDay?.map((day, index) =>
          day ? (
            <div key={index.toString()}>
              <p className="text-sm font-semibold text-dark-800">
                {t(`day${index}`)}
              </p>
              <div>
                {day.map((times) => (
                  <p
                    key={`${times.start}${times.end}`}
                    className="text-sm text-dark-700"
                  >
                    {transformTo12hours(times.start)} -{' '}
                    {transformTo12hours(times.end)}
                  </p>
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
    </>
  );
};

export default DiningOpenTimes;
