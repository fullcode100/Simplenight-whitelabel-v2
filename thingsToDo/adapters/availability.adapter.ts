import { Ticket } from '../types/response/ThingsAvailabilityResponse';
import { TicketAvailability } from '../types/adapters/TicketAvailability';

export const ticketAvailabilityAdapter = (
  tickets: Ticket[],
): TicketAvailability[] => {
  const adaptedTickets: TicketAvailability[] = tickets.map((ticket) => {
    let totalGuests = 0;
    const ticketTypes = ticket.ticket_types.map((ticket) => {
      totalGuests += ticket.quantity;
      return {
        ticket_type_id: ticket.id,
        quantity: ticket.quantity,
      };
    });
    const t: TicketAvailability = {
      fullDay: ticket.full_day,
      ticketTypes: ticketTypes,
      code: ticket.code,
      name: ticket.name,
      description: ticket.description,
      duration: ticket.duration,
      minDuration: ticket.min_duration,
      maxDuration: ticket.max_duration,
      startDate: ticket.start_date,
      times: ticket.times,
      totalBeforeDiscount:
        ticket.rate.discounts.total_amount_before_apply.formatted,
      percentageToApply: ticket.rate.discounts.percentage_to_apply,
      totalAmount: ticket.rate.total.full.formatted,
      totalGuests,
    };
    return t;
  });
  return adaptedTickets;
};
