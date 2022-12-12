import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { Item } from 'types/cart/CartType';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface ThingsItineraryHeaderProps {
  item?: any;
  /* item: Item; */
  icon: ReactElement;
}

const ThingsItineraryHeader = ({ item, icon }: ThingsItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('hotels');

  const {
    quantity: ticketsAmount,
    item_data: { name: activityName },
  } = item;
  const ticketText = 'Ticket';
  const ticketsText = 'Tickets';
  const ticketsFormatted = `${ticketsAmount} ${usePlural(
    ticketsAmount,
    ticketText,
    ticketsText,
  )}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px] ">
          {activityName}
        </section>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {ticketsFormatted}
        </section>
      </section>
    </section>
  );
};

export default ThingsItineraryHeader;
