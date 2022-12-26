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
      <h5 className="pb-6 text-lg pt-9 text-dark-800">{t('reservation')}</h5>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-9 gap-x-11">
        {hoursByDay?.map((day, index) =>
          day ? (
            <div key={index.toString()} className="flex justify-between">
              <p className="text-lg text-dark-800">{t(`day${index}`)}</p>
              <div>
                {day.map((times) => (
                  <p
                    key={`${times.start}${times.end}`}
                    className="py-1 text-sm text-dark-800"
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
