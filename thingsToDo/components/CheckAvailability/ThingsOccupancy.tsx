import Button from 'components/global/ButtonNew/Button';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import MultiplePersonsIcon from 'public/icons/assets/multiple-persons.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDefaultGuests } from 'thingsToDo/helpers/helper';
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
    adults,
    children,
    infants,
    ADULT_TEXT,
    CHILDREN_TEXT,
    INFANTS_TEXT,
  } = useSearchQueries();
  const [isEdit, setIsEdit] = useState(false);
  const params = useQuery();
  const defaultGuestData: any = getDefaultGuests(pricing?.ticket_types, params);
  const guestsData = defaultGuestData;

  const DatesSection = () => (
    <section>
      <span>{fromLowerCaseToCapitilize(startDate)}</span>
      <span> {toLabel} </span>
      <span>{fromLowerCaseToCapitilize(endDate)}</span>
    </section>
  );

  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      {guestsData.ADULT} {ADULT_TEXT}, {children} {CHILDREN_TEXT}, {infants}{' '}
      {INFANTS_TEXT}
    </section>
  );

  const OccupancyAndDate = () => (
    <section className="flex items-center justify-between">
      <section className="grid gap-2 text-xs font-lato text-dark-1000">
        <section className="flex items-center gap-2">
          <CalendarIcon className="w-3 text-primary-1000" />
          <DatesSection />
        </section>
        <section className="flex items-center gap-2">
          <MultiplePersonsIcon className="w-3 text-primary-1000" />
          <OccupancySection />
        </section>
      </section>
      <Button width="px-5" onClick={() => setIsEdit(true)}>
        {editText}
      </Button>
    </section>
  );

  return (
    <section className="p-4 rounded bg-dark-100">
      <section className="lg:hidden">
        {isEdit ? (
          <CheckThingsAvailability pricing={pricing} />
        ) : (
          <OccupancyAndDate />
        )}
      </section>
      <section className="hidden lg:block">
        <CheckThingsAvailability pricing={pricing} />
      </section>
    </section>
  );
};

export default ThingsOccupancy;
