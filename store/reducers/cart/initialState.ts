const initialState = {
  cart: '',
};

if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState.cart = JSON.parse(localStorage.getItem('cart') || '');
  }
}

export default initialState;
