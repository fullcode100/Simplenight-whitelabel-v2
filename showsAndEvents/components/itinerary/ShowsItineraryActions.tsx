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

interface ShowsItineraryActionsProps {
  item: any;
  onReload: () => void;
  fullWidth?: boolean;
}

const ShowsItineraryActions = ({
  item,
  onReload,
  fullWidth,
}: ShowsItineraryActionsProps) => {
  const router = useRouter();
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('events');

  const removeLabel = tg('remove', 'Remove');
  const ticketText = th('ticket', 'Ticket');
  const ticketsText = th('tickets', 'Tickets');

  const ticketsAmount = item?.quantity || 0;
  const removeFormatted = `${removeLabel} ${ticketsAmount} ${usePlural(
    ticketsAmount,
    ticketText,
    ticketsText,
  )}`;

  const editLabel = tg('edit', 'Edit');

  const removeItem = () => {
    const itemToRemove = {
      cartId: item?.cart_id,
      itemId: item?.cart_item_id,
    };
    removeFromCart(i18g, itemToRemove)
      .then(() => {
        onReload();
        notification(
          tg('events:updatedCart'),
          tg('events:removedShowItemFromCart', {
            event: item?.item_data?.name,
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

  const slug = useCategoryType('shows-events')?.slug;
  const handleEdit = () => {
    const id = item?.item_data?.id;
    const fromDate = item?.booking_data?.start_date;
    const toDate = item?.booking_data?.end_date;

    removeItem();
    router.push(`/detail/${slug}/${id}?fromDate=${fromDate}&toDate=${toDate}`);
  };

  return (
    <section
      className={classnames('flex w-full gap-3 flex-col', {
        ['lg:flex-row lg:justify-end flex-col']: !fullWidth,
        ['lg:flex-row mt-4']: fullWidth,
      })}
    >
      <Button
        value={removeFormatted}
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

export default ShowsItineraryActions;
