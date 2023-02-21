import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/global/ButtonNew/Button';

import { addToCart } from 'core/client/services/CartClientService';
import { CartItemRequest } from 'types/cart/CartType';
import { useMutation } from '@tanstack/react-query';

interface TicketActionsProps {
  itemToBook: CartItemRequest;
  timeNotSelected: boolean;
  numberTickets: number;
}

const TicketActions = ({
  itemToBook,
  timeNotSelected,
  numberTickets,
}: TicketActionsProps) => {
  const [tg, i18next] = useTranslation('global');
  const [t] = useTranslation('things');
  const addToItineraryText = tg('addToItinerary', 'Add to itinerary');
  const bookText = tg('book', 'Book');
  const ticketsText = t('tickets', 'tickets');

  const router = useRouter();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const store = {
    state,
    dispatch,
  };

  let url = '/itinerary';

  const handleAction = async () => {
    await addToCart(itemToBook, i18next, store);
  };

  const { mutate, isLoading } = useMutation(handleAction, {
    onSuccess: () => {
      router.push(url);
    },
  });

  return (
    <section className="flex gap-3">
      <Button
        type="outlined"
        width="w-full"
        disabled={timeNotSelected || isLoading}
        onClick={() => mutate()}
      >
        {addToItineraryText}
      </Button>
      <Button
        width="w-full"
        disabled={timeNotSelected || isLoading}
        onClick={() => {
          url = '/checkout/client';
          mutate();
        }}
      >
        {bookText} {numberTickets} {ticketsText}
      </Button>
    </section>
  );
};

export default TicketActions;
