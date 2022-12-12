import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';

interface ThingsBreakdownHeaderProps {
  item: Item;
  icon: ReactElement;
}
export const ThingBreakdownHeader = ({
  item,
  icon,
}: ThingsBreakdownHeaderProps) => {
  const [t, i18next] = useTranslation('hotels');

  const ticketsAmount = item.quantity || 0;
  const activityName = item.item_data?.name;
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
