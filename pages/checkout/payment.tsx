// Libraries
import React from 'react';
// Components
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';

const Payment = () => {
  return (
    <>
      <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
        Header Wizzard
      </section>
      <CheckoutMain>
        Form section to Detail section - both shares margins
      </CheckoutMain>
      <CheckoutFooter type="payment">
        <p>Checkout Footer</p>
        <p>Checkout Footer</p>
      </CheckoutFooter>
    </>
  );
};

export default Payment;
