import Button from 'components/global/ButtonNew/Button';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pricing } from 'thingsToDo/types/response/ThingsDetailResponse';
import CheckThingsAvailability from './CheckAvailability';

interface ThingsOccupancyProps {
  pricing: Pricing;
}

const ThingsOccupancy = ({ pricing }: ThingsOccupancyProps) => {
  const [tg] = useTranslation('global');
  const toLabel = tg('to', 'to');
  const editText = tg('edit', 'Edit');
  const {
    startDate,
    endDate,
    adults = 2,
    children = 0,
    infants = 0,
    ADULT_TEXT,
    CHILDREN_TEXT,
    INFANTS_TEXT,
  } = useSearchQueries();
  const [isEdit, setIsEdit] = useState(false);

  const DatesSection = () => (
    <section>
      <span>{fromLowerCaseToCapitilize(startDate)}</span>
      <span> {toLabel} </span>
      <span>{fromLowerCaseToCapitilize(endDate)}</span>
    </section>
  );

  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      {adults} {ADULT_TEXT}, {children} {CHILDREN_TEXT}, {infants}{' '}
      {INFANTS_TEXT}
    </section>
  );

  const OccupancyAndDate = () => (
    <section className="flex justify-between items-center">
      <section className="grid gap-2 text-xs font-lato text-dark-1000">
        <section className="flex gap-2 items-center">
          <CalendarIcon className="text-primary-1000 w-3" />
          <DatesSection />
        </section>
        <section className="flex gap-2 items-center">
          <MultiplePersonsIcon className="text-primary-1000 w-3" />
          <OccupancySection />
        </section>
      </section>
      <Button width="px-5" onClick={() => setIsEdit(true)}>
        {editText}
      </Button>
    </section>
  );

  return (
    <section className="bg-dark-100 p-4 rounded">
      {isEdit ? (
        <CheckThingsAvailability pricing={pricing} />
      ) : (
        <OccupancyAndDate />
      )}
    </section>
  );
};

export default ThingsOccupancy;
