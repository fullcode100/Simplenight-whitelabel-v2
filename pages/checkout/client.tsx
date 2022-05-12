// Libraries
import React from 'react';
// Components
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import Divider from 'components/global/Divider/Divider';

const Client = () => (
  <>
    <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
      Header Wizzard
    </section>
    <CheckoutMain>
      Form section to Detail section - both shares margins
    </CheckoutMain>
    <Divider />
    <CheckoutFooter type="client">
      <p>Checkout Footer</p>
      <p>Checkout Footer</p>
    </CheckoutFooter>
  </>
);

export default Client;
