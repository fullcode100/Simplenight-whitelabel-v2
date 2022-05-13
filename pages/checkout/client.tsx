// Libraries
import React from 'react';
// Types
import { Amount } from 'types/global/Amount';
// Components
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import Divider from 'components/global/Divider/Divider';
import Summary from 'components/checkout/Summary/Summary';
import Button from 'components/global/Button/Button';

const test: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

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
      <Summary amount={test} />
      <Button
        value="Cancel"
        size={'full'}
        color="outlined"
        className="text-[18px] hover:text-white hover:bg-primary-800"
      />
      <Button
        value="Continue"
        size={'full'}
        disabled={true}
        className="text-[18px]"
      />
    </CheckoutFooter>
  </>
);

export default Client;
