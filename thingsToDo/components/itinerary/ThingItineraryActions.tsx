import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import classnames from 'classnames';

import Button from 'components/global/Button/Button';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useCategoryType } from 'hooks/category/useCategory';
import { notification } from 'components/global/Notification/Notification';

interface ThingItineraryActionsProps {
  item: any;
  onReload: () => void;
  fullWidth?: boolean;
}

const ThingItineraryActions = ({
  item,
  onReload,
  fullWidth,
}: ThingItineraryActionsProps) => {
  const router = useRouter();
  const [g, i18g] = useTranslation('global');

  const { sector, quantity: ticketsAmount } = item;

  const ticketText = g('Ticket');
  const ticketsText = g('Tickets');
  const ticketsFormatted = `${ticketsAmount} ${usePlural(
    ticketsAmount,
    ticketText,
    ticketsText,
  )}`;
  const removeLabel = `${g('remove', 'Remove')} ${ticketsFormatted}`;
  const editLabel = g('edit', 'Edit');

  const removeItem = () => {
    const itemToRemove = {
      cartId: item?.cart_id,
      itemId: item?.cart_item_id,
    };
    removeFromCart(i18g, itemToRemove)
      .then(() => {
        onReload();
        notification(
          g('thing:updatedCart'),
          g('thing:removedThingItemFromCart', {
            thing: item?.item_data?.name,
          }),
          'success',
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (router.asPath === '/itinerary') {
          router.reload();
        }
      });
  };

  const slug = useCategoryType(sector)?.slug;
  const handleEdit = () => {
    const {
      booking_data: { start_date: startDate, ticket_types: paxes },
      item_data: { id },
    } = item;

    const endDate = dayjs(startDate).add(1, 'day');
    const endDateFormatted = dayjs(endDate).format('YYYY-MM-DD');
    removeItem();
    let paxesAndQuantity = '';
    paxes.forEach(
      (pax: any, idx: number) =>
        (paxesAndQuantity += `${pax.ticket_type_id}=${pax.quantity}${
          idx < paxes.length - 1 ? '&' : ''
        }`),
    );

    const urlDetail = `/detail/${slug}/${id}?startDate=${startDate}&endDate=${endDateFormatted}&${paxesAndQuantity}`;
    router.push(urlDetail);
  };

  return (
    <section
      className={classnames('flex w-full gap-3 flex-col', {
        ['lg:flex-row lg:justify-end flex-col']: !fullWidth,
        ['lg:flex-row mt-4']: fullWidth,
      })}
    >
      <Button
        value={removeLabel}
        size="full-sm"
        type="outlined"
        leftIcon={<TrashIcon />}
        onClick={removeItem}
        className={classnames({ ['lg:w-[170px]']: !fullWidth })}
      ></Button>
      <Button
        value={editLabel}
        translationKey="edit"
        size=""
        leftIcon={<EdtiIcon />}
        onClick={handleEdit}
        className={classnames('h-8', { ['lg:w-[170px]']: !fullWidth })}
      ></Button>
    </section>
  );
};

export default ThingItineraryActions;
