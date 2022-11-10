import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useTranslation } from 'react-i18next';

const useGetGuestsTexts = (guests: any) => {
  const { adults: adultsQuery, infants } = guests;

  const [t, i18n] = useTranslation('global');

  const adults = adultsQuery;
  const ADULT_TEXT = usePlural(
    (adults as unknown as number) ?? 0,
    t('adult', 'Adult'),
    t('adults', 'Adults'),
  );

  const CHILDREN_TEXT = t('children', 'Children');
  const INFANTS_TEXT = usePlural(
    (infants as unknown as number) ?? 0,
    t('infant', 'Infant'),
    t('infants', 'Infants'),
  );

  return {
    ADULT_TEXT,
    CHILDREN_TEXT,
    INFANTS_TEXT,
  };
};

export default useGetGuestsTexts;
