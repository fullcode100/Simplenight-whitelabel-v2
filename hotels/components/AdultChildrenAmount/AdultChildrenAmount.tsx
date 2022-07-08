import { useTranslation } from 'react-i18next';

import PersonsIcon from 'public/icons/assets/multiple-persons.svg';

interface AdultChildrenAmountProps {
  adults?: number;
  child?: number;
}

const AdultChildrenAmount = ({ adults, child }: AdultChildrenAmountProps) => {
  const [t, i18next] = useTranslation('hotels');

  const adultLabel = t('adult', 'Adult');
  const adultsLabel = t('adults', 'Adults');
  const childLabel = t('child', 'Child');
  const childrenLabel = t('children', 'Children');

  const adultsTitle = adults == 1 ? adultLabel : adultsLabel;
  const childrenTitle = child == 1 ? childLabel : childrenLabel;

  return (
    <section className="flex flex-row gap-1 lg:gap-3">
      <PersonsIcon className="h-3.5 lg:h-5 lg:w-5 mt-1 lg:mt-0 text-primary-1000" />
      <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
        {adults} {adultsTitle}, {child} {childrenTitle}
      </p>
    </section>
  );
};

export default AdultChildrenAmount;
