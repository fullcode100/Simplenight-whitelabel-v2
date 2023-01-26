import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { ClientBookingItemRemover } from 'core/client/ClientBookingItemRemover';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';
import FullScreenModal from 'components/global/ModalNew/FullScreenModal';
import useModal from 'hooks/layoutAndUITooling/useModal';
import { ThingBreakdownHeader } from './ThingBreakdownHeader';
import ThingBreakdownBody from './ThingBreakdownBody';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Customer } from 'types/cart/CartType';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item, Payment } from 'types/booking/bookingType';
import CardLogo from 'components/confirmation/CardLogo/CardLogo';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import Paragraph from 'components/global/Typography/Paragraph';

interface ThingConfirmationFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  customer?: Customer;
  payment?: Payment;
}

const ThingConfirmationFooter = ({
  item,
  reload,
  setReload,
  Category,
  customer,
  payment,
}: ThingConfirmationFooterProps) => {
  const dispatch = useDispatch();
  const [g, i18g] = useTranslation('global');
  const [isOpen, onOpen, onClose] = useModal();
  const cancelledDisclaimer = g(
    'cancelledDisclaimer',
    'Refunds typically take 2 to 7 business days to be returned to your bank.',
  );

  const cancelLabel = `${g('cancelReservation', 'Cancel Reservation')}`;
  const questionReservation = g(
    'doYouWishToCancelYourReservation',
    'Do You Wish To Cancel Your Reservation?',
  );
  const cancelButton = g('cancel', 'Cancel');
  const refundTitle = g('youWillBeRefunded', 'You Will Be Refunded');
  const totalLabel = g('total', 'Total');

  const removeAllTickets = async () => {
    const itemRemover = new ClientBookingItemRemover();
    const requestData: DeleteBookingItemRequest = {
      bookingId: item?.booking_id || '',
      itemId: item?.booking_item_id || '',
    };

    await itemRemover
      .request(requestData, i18g)
      .catch((error) => console.error(error));
  };

  const handleRemoveAllTickets = () => {
    removeAllTickets().then(() => {
      setReload?.(!reload);
      onClose();
    });
  };

  return (
    <>
      <FullScreenModal
        open={isOpen}
        title={cancelLabel}
        onClose={onClose}
        primaryButtonText={cancelLabel}
        primaryButtonAction={handleRemoveAllTickets}
        secondaryButtonText={cancelButton}
        secondaryButtonAction={onClose}
      >
        <section className="px-5 py-6 space-y-6 overflow-scroll lg:px-6">
          <Paragraph size="large">{questionReservation}</Paragraph>
          <CollapseBordered
            title={<ThingBreakdownHeader icon={Category.icon} item={item} />}
            body={
              <ThingBreakdownBody
                item={item}
                reload={reload}
                setReload={setReload}
                customer={customer}
              />
            }
            footer={
              <div className="flex items-center w-full">
                <Paragraph size="small">{totalLabel}</Paragraph>
                <Paragraph size="medium">
                  {item.rate.total.full.formatted}
                </Paragraph>
              </div>
            }
          />
          {payment && (
            <section className="">
              <Paragraph
                size="small"
                fontWeight="semibold"
                textColor="text-dark-700"
              >
                {refundTitle}
              </Paragraph>
              <section className="flex justify-between mt-3">
                <section className="flex p-2 border rounded bg-dark-100 border-dark-300">
                  <Paragraph
                    size="small"
                    fontWeight="semibold"
                    className="mr-3"
                  >{`···· ···· ···· ${payment.last_four}`}</Paragraph>
                  <CardLogo cardBrand={payment.card_brand} />
                </section>
                <Paragraph
                  size="small"
                  fontWeight="semibold"
                  className="self-center"
                >
                  {item.refund_amount_estimate?.formatted}
                </Paragraph>
              </section>
            </section>
          )}
          <Disclaimer message={cancelledDisclaimer} />
        </section>
      </FullScreenModal>
      <section className="flex flex-col gap-3 lg:flex-row items center">
        <div className="flex items-center w-full">
          <Paragraph size="small">{totalLabel}</Paragraph>
          <Paragraph size="medium">{item.rate.total.full.formatted}</Paragraph>
        </div>
        <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
          <Button
            value={cancelLabel}
            size="full-sm"
            type="outlined"
            leftIcon={<TrashIcon />}
            onClick={onOpen}
            className="lg:w-[170px] h-8"
          ></Button>
        </section>
      </section>
    </>
  );
};

export default ThingConfirmationFooter;
