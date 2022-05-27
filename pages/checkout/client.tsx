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
import {
  getCartId,
  getCartSchema,
} from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';
import ClientCart from 'components/checkout/ClientCart/ClientCart';
import { CartObjectResponse } from 'types/cart/CartType';
import { getStoreCartId } from 'store/selectors/cart';

const test: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

const Client = () => {
  const [t, i18n] = useTranslation('global');
  const [cart, setCart] = useState<CartObjectResponse | undefined>();
  const [travelersFormSchema, setTraverlersFormSchema] = useState();
  const [travelersUiSchema, setTraverlersUiSchema] = useState();
  const primaryContactText = t('primaryContact', 'Primary Contact');
  const cartId = getStoreCartId() || null;
  const handleGetSchema = async () => {
    try {
      const schemas = await getCartSchema(i18n, cartId);
      setTraverlersFormSchema(schemas?.travelers_form_schema);
      setTraverlersUiSchema(schemas?.travel_form_ui_schema);
    } catch (error) {
      return error;
    }
  };

  const handleGetCart = async () => {
    try {
      if (cartId) {
        const response = await getCartId(i18n, cartId);
        setCart(response);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    handleGetSchema();
    handleGetCart();
  }, []);

  return (
    <>
      <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
        Header Wizzard
      </section>
      {/* <CheckoutMain>
        Form section to Detail section - both shares margins
      </CheckoutMain> */}
      <p className="px-5 mt-3 mb-2 text-lg text-dark-800">
        {primaryContactText}
      </p>
      <ClientForm schema={travelersFormSchema} uiSchema={travelersUiSchema} />
      <ClientCart
        items={cart?.items}
        schema={travelersFormSchema}
        uiSchema={travelersUiSchema}
      />
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
