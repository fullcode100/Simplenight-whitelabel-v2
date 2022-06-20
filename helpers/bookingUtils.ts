import { Booking, Item } from 'types/booking/bookingType';

const getRoomsByHotel = (booking: Booking) => {
  const hotelElements: Item[] = [];
  const { items: bookingItems } = booking;
  bookingItems.forEach((item) => {
    if (item.supplier !== 'hotelbeds') return;

    const hotelNotFoundYet = hotelElements.every(
      (elem) => elem.extra_data.id !== item.extra_data.id,
    );

    if (hotelNotFoundYet) {
      const extraData = { ...item.extra_data };
      extraData.items = [item];

      const hotelInfo: Item = {
        ...item,
        extra_data: extraData,
      };
      hotelElements.push(hotelInfo);
      return;
    }

    const hotel = hotelElements.findIndex(
      (elem) => elem.extra_data.id === item.extra_data.id,
    );
    hotelElements[hotel].extra_data.items?.push(item);
  });

  return hotelElements;
};

export const formatBooking = (booking: Booking) => {
  const roomsByHotel: Item[] = getRoomsByHotel(booking);

  let formattedItems: Item[] = booking.items.filter(
    (item) => item.supplier !== 'hotelbeds',
  );
  formattedItems = [...formattedItems, ...roomsByHotel];

  const formattedBooking: Booking = { ...booking };
  formattedBooking.items = [...formattedItems];

  return formattedBooking;
};
