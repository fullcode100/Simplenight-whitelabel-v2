import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';
import { Item } from 'types/cart/CartType';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface FlightItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const FlightItineraryFooter = ({
  item,
  reload,
  setReload,
}: FlightItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('flights');

  const removeLabel = tg('remove', 'Remove');
  const flightsAmount = item?.booking_data?.flights.length ?? 1;
  const flightText = th('flight', 'Flight');
  const flightsText = th('flights', 'Flights');
  const removeFlightsFormatted = `${removeLabel} ${flightsAmount} ${usePlural(
    flightsAmount,
    flightText,
    flightsText,
  )}`;

  const editLabel = tg('edit', 'Edit');

  const totalRate = item.rate?.min_rate?.rate;

  const removeAllFlights = () => {
    const flightToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, flightToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllFlights = () => {
    removeAllFlights();
  };

  const handleEdit = () => {
    removeAllFlights();
    // router.push(`/detail/flights/${item.extended_data?.id}`);
    router.push('/flights}');
  };

  return (
    <section className="flex flex-col gap-3">
      {totalRate && (
        <BreakdownSummary
          rate={totalRate}
          nights={item.nights}
          guests={item.guests}
        />
      )}
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
        <Button
          value={removeFlightsFormatted}
          size="full-sm"
          type="outlined"
          leftIcon={<TrashIcon />}
          onClick={handleRemoveAllFlights}
          className="lg:w-[170px]"
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

export default FlightItineraryFooter;
