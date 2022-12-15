import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { Item } from 'types/cart/CartType';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface ShowsItineraryHeaderProps {
  item?: Item;
  icon: ReactElement;
}

const ShowsItineraryHeader = ({ item, icon }: ShowsItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('events');

  const name = item?.item_data?.name || '';
  const amount = item?.quantity || 0;
  const amountFormatted = `${amount} ${usePlural(
    amount,
    t('ticket', 'Ticket'),
    t('tickets', 'Tickets'),
  )}`;

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

export default ShowsItineraryHeader;
