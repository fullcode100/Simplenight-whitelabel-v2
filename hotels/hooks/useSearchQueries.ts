import dayjs from 'dayjs';
import { SEARCH_DATE_FORMAT, formatAsMonthDay } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useTranslation } from 'react-i18next';

export const useSearchQueries = () => {
  const {
    startDate: startDateQuery,
    endDate: endDateQuery,
    adults: adultsQuery,
    children: childrenQuery,
    rooms,
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

  const formattedStartDate = startDateQuery ? formatAsMonthDay(startDate) : '-';
  const formattedEndDate = endDateQuery ? formatAsMonthDay(endDate) : '-';

  return {
    adults,
    children,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    rooms,
    ADULT_TEXT,
    CHILDREN_TEXT,
    ROOMS_TEXT,
  };
};
