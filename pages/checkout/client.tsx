// Libraries
import React, { useEffect, useState } from 'react';
// Types
import { Amount } from 'types/global/Amount';
// Components
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import Divider from 'components/global/Divider/Divider';
import Summary from 'components/checkout/Summary/Summary';
import Button from 'components/global/Button/Button';
import ClientForm from 'components/checkout/ClientForm/ClientForm';
import { getCartSchema } from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';

const test: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

const Client = () => {
  const [t, i18n] = useTranslation();
  const [travelersFormSchema, setTraverlersFormSchema] = useState();
  const [travelersUiSchema, setTraverlersUiSchema] = useState();
  const handleGetSchema = async () => {
    try {
      const schemas = await getCartSchema(i18n);
      setTraverlersFormSchema(schemas?.travelers_form_schema);
      setTraverlersUiSchema(schemas?.travel_form_ui_schema);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    handleGetSchema();
  }, []);
  return (
    <>
      <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
        Header Wizzard
      </section>
      <CheckoutMain>
        Form section to Detail section - both shares margins
      </CheckoutMain>
      <ClientForm schema={travelersFormSchema} uiSchema={travelersUiSchema} />
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
};
export default Client;
