import { PricingTicketType } from 'thingsToDo/types/response/ThingsDetailResponse';

export {};
export const formatTicketTime = (date = '10:00') => {
  const [hours, minutes] = date.split(':');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  const time = `${parseInt(hours) % 12}:${minutes} ${ampm}`;
  return time;
};

export const getDefaultGuests = (
  ticketTypes: PricingTicketType[],
  params: any,
) => {
  const numberTravelers = 2;
  const numberDefault = 0;
  const defaultGuestData: any = {};
  ticketTypes?.forEach((ticketType) => {
    const type = ticketType?.ticket_type_id;
    const isAdultOrTraveler = type === 'ADULT' || type === 'TRAVELER';
    const valueTicket = isAdultOrTraveler ? numberTravelers : numberDefault;
    defaultGuestData[type] = parseInt(params[type]) || valueTicket;
  });
  return defaultGuestData;
};
