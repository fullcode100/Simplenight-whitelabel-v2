import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { Item } from 'types/cart/CartType';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface DiningItineraryHeaderProps {
  item?: Item;
  icon: ReactElement;
  name?: string;
  amount?: string;
}

const DiningItineraryHeader = ({
  item,
  icon,
  name,
  amount,
}: DiningItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('dining');
  const amountFormatted = t('tableFor', 'Table For') + ` ${amount}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px] ">
          {name}
        </section>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {amountFormatted}
        </section>
      </section>
    </section>
  );
};

export default DiningItineraryHeader;
