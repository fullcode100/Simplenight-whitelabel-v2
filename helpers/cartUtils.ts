import { CartObjectResponse, Item } from 'types/cart/CartType';

const getRoomsByHotel = (cart: CartObjectResponse) => {
  const hotelElements: Item[] = [];
  const { items: cartItems } = cart;
  cartItems.forEach((item: Item) => {
    if (item.category !== 'HOTELS') return;

    const hotelNotFoundYet = hotelElements.every(
      (elem) => elem.extended_data?.id !== item.extended_data?.id,
    );

    if (hotelNotFoundYet) {
      const extendedData = { ...item.extended_data };
      extendedData.items = [item];
      delete extendedData.rooms;

      const hotelInfo: Item = {
        cart_id: item.cart_id,
        category: item.category,
        extended_data: extendedData,
      };
      hotelElements.push(hotelInfo);
      return;
    }

    const hotel = hotelElements.findIndex(
      (elem) => elem.extended_data?.id === item.extended_data?.id,
    );
    hotelElements[hotel].extended_data?.items?.push(item);
  });

  return hotelElements;
};

export const formatCart = (cart: CartObjectResponse) => {
  const roomsByHotel: Item[] = getRoomsByHotel(cart);

  let formattedItems: Item[] = cart.items.filter(
    (item) => item.category !== 'HOTELS',
  );
  formattedItems = [...formattedItems, ...roomsByHotel];

  const formattedCart: CartObjectResponse = { ...cart };
  formattedCart.items = [...formattedItems];

  return formattedCart;
};
