// Libraries
import React, { useEffect, useState } from 'react';
// Types
import { Amount } from 'types/global/Amount';
// Components
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
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../components/global/Loader/Loader';
import { deepCopy } from 'helpers/objectUtils';
import { IChangeEvent } from '@rjsf/core';
import { ClientCartCustomerUpdater } from 'core/client/ClientCartCustomerUpdater';
import { AddCustomerRequest } from 'types/checkout/AddCustomerRequest';
import CheckoutSummary from 'components/checkout/CheckoutSummary/CheckoutSummary';

const empty: Amount = {
  formatted: '$0.00',
  amount: 0,
  currency: 'USD',
};

const ITINERARY_URI = '/itinerary';

const Client = () => {
  const router = useRouter();
  const [t, i18n] = useTranslation('global');

  const [travelersFormSchema, setTravelersFormSchema] = useState();
  const [travelersUiSchema, setTravelersUiSchema] = useState();
  let primaryContactData: FormData | undefined;

  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [cart, setCart] = useState<CartObjectResponse | undefined>();
  const [isDisabled, setIsDisabled] = useState(true);
  let cartId: string | null = null;

  const primaryContactText = t('orderName', 'Order Name');

  const handleGetSchema = async () => {
    try {
      if (!cartId) throw new Error('Cart ID is not defined');

      const schemas = await getCartSchema(i18n, cartId);
      setTravelersFormSchema(schemas?.travelers_form_schema);
      setTravelersUiSchema(schemas?.travel_form_ui_schema);
    } catch (error) {
      return error;
    }
  };

  const handleGetCart = async () => {
    try {
      if (cartId) {
        const response = await getCartId(i18n, cartId);
        setCart(response);
        setIsDisabled(false);
        setLoaded(true);
      }
    } catch (error) {
      return error;
    }
  };

  const handlePrimaryContactFormChange = (data: IChangeEvent<FormData>) => {
    const formDataCopy = deepCopy(data.formData);
    primaryContactData = formDataCopy;
  };

  const redirectToItinerary = () => {
    router.push(ITINERARY_URI);
  };

  const getAddCustomerRequestBody = (): AddCustomerRequest => {
    const primaryContactCopy = deepCopy(primaryContactData);
    const request = { customer: primaryContactCopy };

    request.customer.phone_number = primaryContactCopy.phone;

    delete request.customer.phone;
    delete request.customer.primary_contact;

    return request as unknown as AddCustomerRequest;
  };

  const continueToPayment = async (values: any) => {
    if (!cart || cart.total_item_qty <= 0 || !primaryContactData) return;

    const customerUpdater = new ClientCartCustomerUpdater();
    const requestBody = getAddCustomerRequestBody();

    await customerUpdater.request(requestBody, i18n, cart.cart_id);

    router.push('/checkout/payment');
  };

  useEffect(() => {
    cartId = JSON.parse(window.localStorage.getItem('cart') ?? 'null');
    handleGetCart().then(() => handleGetSchema());
  }, [reload]);

  return (
    <>
      <CheckoutHeader step="client" />
      {loaded ? (
        <>
          <p className="px-5 mt-3 mb-2 text-lg text-dark-800">
            {primaryContactText}
          </p>
          <section>
            <ClientForm
              schema={travelersFormSchema}
              uiSchema={travelersUiSchema}
              onChange={handlePrimaryContactFormChange}
              onSubmit={continueToPayment}
            >
              <ClientCart
                items={cart?.items}
                schema={travelersFormSchema}
                uiSchema={travelersUiSchema}
              />
              <Divider />
              <CheckoutFooter type="client">
                <CheckoutSummary
                  cart={cart}
                  reload={reload}
                  setReload={setReload}
                />
                <Button
                  value="Cancel"
                  size={'full'}
                  onClick={redirectToItinerary}
                  color="outlined"
                  className="text-[18px] bg-white border border-dark-1000 text-dark-1000 font-normal hover:text-white hover:bg-dark-1000"
                />
                <Button
                  value="Continue"
                  size={'full'}
                  disabled={isDisabled}
                  className="text-[18px] font-normal"
                />
              </CheckoutFooter>
            </ClientForm>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Client;
