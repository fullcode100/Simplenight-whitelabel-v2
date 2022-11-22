import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import Button from 'components/global/Button/Button';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useCategorySlug } from 'hooks/category/useCategory';

interface ThingItineraryFooterProps {
  item: any;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ThingItineraryFooter = ({
  item,
  reload,
  setReload,
}: ThingItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [g, i18g] = useTranslation('global');

  const {
    category: slug,
    quantity: ticketsAmount,
    rate: { total: totalAmount },
  } = item;

  const category = useCategorySlug(slug);
  const sector = category?.type;
  const ticketText = 'Ticket';
  const ticketsText = 'Tickets';
  const ticketsFormatted = `${ticketsAmount} ${usePlural(
    ticketsAmount,
    ticketText,
    ticketsText,
  )}`;
  const removeLabel = `${g('remove', 'Remove')} ${ticketsFormatted}`;
  const editLabel = g('edit', 'Edit');

  const formatedTotalAmount = totalAmount.full.formatted;

  const removeAllTickets = () => {
    const ticketToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };

    removeFromCart(i18g, ticketToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllTickets = () => {
    removeAllTickets();
  };

  const handleEdit = () => {
    const {
      booking_data: { start_date: startDate, ticket_types: paxes },
      item_data: { id },
    } = item;

    const endDate = dayjs(startDate).add(1, 'day');
    const endDateFormatted = dayjs(endDate).format('YYYY-MM-DD');
    removeAllTickets();
    let paxesAndQuantity = '';
    paxes.forEach(
      (pax: any, idx: number) =>
        (paxesAndQuantity += `${pax.ticket_type_id}=${pax.quantity}${
          idx < paxes.length - 1 ? '&' : ''
        }`),
    );

    const urlDetail = `/detail/${sector}/${id}?startDate=${startDate}&endDate=${endDateFormatted}&${paxesAndQuantity}`;
    router.push(urlDetail);
  };

  return (
    <section className="flex flex-col lg:flex-row gap-3 items center">
      <div className="flex w-full items-center">
        <p className="w-full text-sm">Total</p>
        <p className="text-base">{formatedTotalAmount}</p>
      </div>
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
        <Button
          value={removeLabel}
          size="full-sm"
          type="outlined"
          leftIcon={<TrashIcon />}
          onClick={handleRemoveAllTickets}
          className="lg:w-[170px] h-8"
        ></Button>
        <Button
          value={editLabel}
          translationKey="edit"
          size=""
          leftIcon={<EdtiIcon />}
          onClick={handleEdit}
          className="lg:w-[170px] h-8"
        ></Button>
      </section>
    </section>
  );
};

export default ThingItineraryFooter;
