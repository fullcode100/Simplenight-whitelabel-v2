import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCategoryType } from 'hooks/category/useCategory';

import Button from 'components/global/Button/Button';
import { Item } from 'types/cart/CartType';
import Paragraph from 'components/global/Typography/Paragraph';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import TaxesAndFeesPopover from '../TaxesAndFeesPopover/TaxesAndFeesPopover';
import { removeFromCart } from 'core/client/services/CartClientService';

interface ShowsItineraryFooterProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  isItineraryView?: boolean;
}

const ShowsItineraryFooter = ({
  item,
  reload,
  setReload,
  isItineraryView,
}: ShowsItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('events');

  const slug = useCategoryType('shows-events')?.slug;

  const removeLabel = tg('remove', 'Remove');
  const ticketText = th('ticket', 'Ticket');
  const ticketsText = th('tickets', 'Tickets');
  const taxesAndFeesLabel = tg(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  const ticketsAmount = item?.quantity || 0;
  const removeFormatted = `${removeLabel} ${ticketsAmount} ${usePlural(
    ticketsAmount,
    ticketText,
    ticketsText,
  )}`;

  const editLabel = tg('edit', 'Edit');

  const removeAllTickes = () => {
    const roomToRemove = {
      cartId: item?.cart_id,
      itemId: item?.cart_item_id,
    };
    removeFromCart(i18g, roomToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllTickets = () => {
    removeAllTickes();
  };

  const handleEdit = () => {
    const id = item?.item_data?.id;
    const fromDate = item?.booking_data?.start_date;
    const toDate = item?.booking_data?.end_date;

    removeAllTickes();
    router.push(`/detail/${slug}/${id}?fromDate=${fromDate}&toDate=${toDate}`);
  };

  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col lg:flex-row items-center justify-between">
        <section className="flex justify-between w-full pb-4 lg:pb-0">
          <Paragraph size="small">Total</Paragraph>
          <section className="text-right ml-auto">
            <section className="flex flex-col gap-1 justify-end">
              <p className="font-semibold text-[18px] leading-[18px] text-dark-1000">
                {item?.rate?.total.net.formatted}
              </p>
              <section className="flex flex-row gap-1 justify-end">
                <p className="text-[12px] leading-[15px] text-dark-800">
                  {taxesAndFeesLabel}
                </p>
                <TaxesAndFeesPopover />
              </section>
            </section>
          </section>
        </section>
        {isItineraryView && (
          <section className="flex flex-col gap-3 lg:flex-row lg:justify-end w-full">
            <Button
              value={removeFormatted}
              size="full-sm"
              type="outlined"
              leftIcon={<TrashIcon />}
              className="lg:w-[170px]"
              onClick={handleRemoveAllTickets}
            ></Button>
            <Button
              value={editLabel}
              translationKey="edit"
              size=""
              leftIcon={<EdtiIcon />}
              className="lg:w-[170px] h-8"
              onClick={handleEdit}
            ></Button>
          </section>
        )}
      </section>
    </section>
  );
};

export default ShowsItineraryFooter;
