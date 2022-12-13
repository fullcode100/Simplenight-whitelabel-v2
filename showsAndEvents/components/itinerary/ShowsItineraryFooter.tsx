import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import { Item } from 'types/cart/CartType';
import Paragraph from 'components/global/Typography/Paragraph';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import TaxesAndFeesPopover from '../TaxesAndFeesPopover/TaxesAndFeesPopover';

interface ShowsItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ShowsItineraryFooter = ({
  item,
  reload,
  setReload,
}: ShowsItineraryFooterProps) => {
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('events');

  const removeLabel = tg('remove', 'Remove');
  const ticketsAmount = 2;
  const ticketText = th('ticket', 'Ticket');
  const ticketsText = th('tickets', 'Tickets');
  const taxesAndFeesLabel = tg(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );
  const removeRoomsFormatted = `${removeLabel} ${ticketsAmount} ${usePlural(
    ticketsAmount,
    ticketText,
    ticketsText,
  )}`;

  const editLabel = tg('edit', 'Edit');

  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col lg:flex-row items-center justify-between">
        <section className="flex justify-between w-full pb-4 lg:pb-0">
          <Paragraph size="small" fontWeight="normal">
            Total
          </Paragraph>
          <section className="text-right ml-auto">
            <section className="flex flex-col gap-1 justify-end">
              <p className="font-semibold text-[18px] leading-[18px] text-dark-1000">
                {'US$1018.00'}
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
        <section className="flex flex-col gap-3 lg:flex-row lg:justify-end w-full">
          <Button
            value={removeRoomsFormatted}
            size="full-sm"
            type="outlined"
            leftIcon={<TrashIcon />}
            className="lg:w-[170px]"
          ></Button>
          <Button
            value={editLabel}
            translationKey="edit"
            size=""
            leftIcon={<EdtiIcon />}
            className="lg:w-[170px] h-8"
          ></Button>
        </section>
      </section>
    </section>
  );
};

export default ShowsItineraryFooter;
