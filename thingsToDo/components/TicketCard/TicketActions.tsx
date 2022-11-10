import Button from 'components/global/ButtonNew/Button';
import { useTranslation } from 'react-i18next';

interface TicketActionsProps {
  numberTickets: number;
  addToAction?: () => void;
  bookAction?: () => void;
}

const TicketActions = ({
  numberTickets,
  addToAction,
  bookAction,
}: TicketActionsProps) => {
  const [tg] = useTranslation('global');
  const [t] = useTranslation('things');
  const addToItineraryText = tg('addToItinerary', 'Add to itinerary');
  const bookText = tg('book', 'Book');
  const ticketsText = t('tickets', 'tickets');
  return (
    <section className="flex gap-3">
      <Button type="outlined" width="w-full" onClick={addToAction}>
        {addToItineraryText}
      </Button>
      <Button width="w-full" onClick={bookAction}>
        {bookText} {numberTickets} {ticketsText}
      </Button>
    </section>
  );
};

export default TicketActions;
