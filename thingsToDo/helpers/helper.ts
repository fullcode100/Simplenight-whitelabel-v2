export {};
export const formatTicketTime = (date = '10:00') => {
  const [hours, minutes] = date.split(':');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  const time = `${parseInt(hours) % 12}:${minutes} ${ampm}`;
  return time;
};
