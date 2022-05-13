// Libraries
import React, { useState } from 'react';
// Types
import { Amount } from 'types/global/Amount';
// Components
import Button from 'components/global/Button/Button';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import Summary from 'components/checkout/Summary/Summary';
import Terms from 'components/checkout/Terms/Terms';

const test: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

const Payment = () => {
  const [terms, setTerms] = useState(false);

  return (
    <>
      <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
        Header Wizzard
      </section>
      <CheckoutMain>
        Form section to Detail section - both shares margins
      </CheckoutMain>
      <CheckoutFooter type="payment">
        <Terms checkValue={terms} checkboxMethod={setTerms} />
        <Summary amount={test} />
        <Button
          value="Back"
          size={'full'}
          color="outlined"
          className="text-[18px] hover:text-white hover:bg-primary-800"
        />
        <Button value="Check Out" size={'full'} className="text-[18px]" />
      </CheckoutFooter>
    </>
  );
};

export default Payment;
