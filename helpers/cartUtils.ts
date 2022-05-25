import { CartObjectResponse } from 'types/cart/CartType';

const getRoomsByHotel = (cart: CartObjectResponse) => {
  const hotelElements: any[] = [];
  const { items: cartItems } = cart;
  cartItems.forEach((item: any) => {
    if (item.category !== 'HOTELS') return;

    const hotelNotFoundYet = hotelElements.every(
      (elem) => elem.id !== item.extended_data.id,
    );

    if (hotelNotFoundYet) {
      delete item.extended_data.rooms;
      const hotelInfo = {
        ...item.extended_data,
        category: item.category,
        items: [item],
      };
      hotelElements.push(hotelInfo);
      return;
    }

    const hotel = hotelElements.findIndex(
      (elem) => elem.id === item.extended_data.id,
    );
    hotelElements[hotel].items.push(item);
  });

  return hotelElements;
};

export const formatCart = (cart: CartObjectResponse) => {
  const roomsByHotel = getRoomsByHotel(cart);

  let formattedItems = cart.items.filter((item) => item.category !== 'HOTELS');
  formattedItems = [...formattedItems, ...roomsByHotel];

  const formattedCart = { ...cart };
  formattedCart.items = [...formattedItems];

  return formattedCart;
};
