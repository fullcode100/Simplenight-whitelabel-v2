import dayjs from 'dayjs';
import { SEARCH_DATE_FORMAT, formatAsDisplayDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useTranslation } from 'react-i18next';
import { DateString } from 'types/global/DateString';

export const useSearchQueries = () => {
  const {
    startDate: startDateQuery,
    endDate: endDateQuery,
    adults: adultsQuery,
    children: childrenQuery,
    rooms,
    infants,
  } = useQuery();

  const [t, i18n] = useTranslation('hotels');

  const adults = adultsQuery;
  const children = childrenQuery;
  const startDate = dayjs(startDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );
  const endDate = dayjs(endDateQuery as unknown as string).format(
    SEARCH_DATE_FORMAT,
  );

  const ADULT_TEXT = usePlural(
    (adults as unknown as number) ?? 0,
    t('adult', 'Adult'),
    t('adults', 'Adults'),
  );

  const CHILDREN_TEXT = t('children', 'Children');
  const ROOMS_TEXT = usePlural(
    (rooms as unknown as number) ?? 0,
    t('room', 'Room'),
    t('rooms', 'Rooms'),
  );
  const INFANTS_TEXT = usePlural(
    (infants as unknown as number) ?? 0,
    t('infant', 'Infant'),
    t('infants', 'Infants'),
  );

  const formattedStartDate = startDateQuery
    ? formatAsDisplayDate(startDate)
    : '-';
  const formattedEndDate = endDateQuery ? formatAsDisplayDate(endDate) : '-';

  return {
    adults,
    children,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    searchStartDate: startDate as unknown as DateString,
    searchEndDate: endDate as unknown as DateString,
    rooms,
    infants,
    ADULT_TEXT,
    CHILDREN_TEXT,
    ROOMS_TEXT,
    INFANTS_TEXT,
  };
};
