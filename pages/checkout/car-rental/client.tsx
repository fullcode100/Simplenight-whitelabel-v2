/* eslint-disable camelcase */
// Libraries
import React, { ReactNode, useEffect, useRef, useState } from 'react';
// Components
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import Button from 'components/global/Button/Button';
import {
  deleteCart,
  getCartAvailability,
  getCartId,
} from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';
import ClientCart from '../../../cars/components/ClientCart/ClientCart';
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../../components/global/Loader/Loader';
import { deepCopy } from 'helpers/objectUtils';
import { ClientCartCustomerUpdater } from 'core/client/ClientCartCustomerUpdater';
import CheckoutSummary from 'components/checkout/CheckoutSummary/CheckoutSummary';
import HelpSection from 'components/global/HelpSection/HelpSection';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { useCustomer } from 'hooks/checkout/useCustomer';
import { ClientFormContent } from 'components/checkout/ClientForm/ClientFormContent';
import { FormProvider, useForm } from 'react-hook-form';
import { useCheckoutFormSchema } from 'hooks/schemas/useCheckoutFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCoreStore } from 'hooks/core/useCoreStore';

interface LayoutProps {
  children: ReactNode;
}

const Client = () => {
  const router = useRouter();
  const [t, i18n] = useTranslation('global');

  const [travelersFormSchema, setTravelersFormSchema] = useState<any>();
  const [travelersUiSchema, setTravelersUiSchema] = useState<any>();
  const [isRemoved, setIsRemoved] = useState(false);
  const { checkOutFormSchema } = useCheckoutFormSchema();

  const [cart, setCart] = useState<any>();

  type CheckoutFormSchema = z.infer<typeof checkOutFormSchema>;
  const methods = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkOutFormSchema),
    mode: 'onSubmit',
  });

  const [customer, updateCustomer] = useCustomer((state) => [
    state.customer,
    state.updateCustomer,
  ]);

  const currency = useCoreStore((state) => state.currency);

  let itemsForm: any[] | undefined = [];
  let hasAdditionalRequests = false;

  const createAdditionalItem = (item: any) => {
    const { cart_item_id, customer, customer_additional_requests } = item;
    if (customer) {
      const phone = customer?.phone && JSON?.parse?.(customer?.phone);

      customer.phone_number = phone?.phone_number || '';
      customer.phone_prefix = phone?.phone_prefix || '';
      customer.country = phone?.country || '';

      delete customer.phone;
    }

    return {
      cart_item_id,
      ...(customer && { customer }),
      ...(customer_additional_requests && { customer_additional_requests }),
    };
  };

  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let cartId: string | null = null;
  const handleAdditionalRequestChange = (
    data: any,
    cartItemId: string,
    isAddingSpecialRequest?: boolean,
    useOrderName?: boolean,
  ) => {
    const newItemsForm = cart
      ? cart.items.map((item: { cart_item_id: string }) => {
          if (item.cart_item_id === cartItemId) {
            return {
              ...item,
              cart_item_id: cartItemId,
              ...(isAddingSpecialRequest && {
                customer_additional_requests: data,
              }),
              ...(useOrderName === false && {
                customer: data.formData,
              }),
            };
          }
          return item;
        })
      : [];
    if (cart) {
      cart.items = newItemsForm;
      itemsForm = cart.items;
    }
    hasAdditionalRequests = true;
  };

  const primaryContactText = t('orderName', 'Order Name');
  const cancelButton = t('cancel', 'Cancel');
  const continueButton = t('continue', 'Continue');
  const continueShoppingText = t('continueShopping', 'Continue Shopping');

  const handleGetSchema = async () => {
    try {
      if (!cartId) throw new Error('Cart ID is not defined');

      // const schemas = await getCartSchema(i18n, cartId);
      // TODO: Move this static schema to backend if it is necessary
      const mockSchema = {
        travelers_form_schema: {
          type: 'object',
          required: ['first_name', 'last_name', 'phone', 'email'],
          properties: {
            first_name: {
              type: 'string',
              title: 'First Name',
              default: customer?.first_name || '',
            },
            last_name: {
              type: 'string',
              title: 'Last Name',
              default: customer?.last_name || '',
            },
            phone: {
              type: 'string',
              title: 'Phone Number',
              defaultCode: customer?.country || 'us',
              default: customer?.phone_number || '',
            },
            email: {
              type: 'string',
              format: 'email',
              title: 'Email Address',
              default: customer?.email || '',
            },
          },
        },
        travel_form_ui_schema: {
          first_name: {
            'ui:placeholder': 'Name',
          },
          last_name: {
            'ui:placeholder': 'Name',
          },
          email: {
            'ui:placeholder': 'Email',
          },
          phone: {
            'ui:widget': 'PhoneWidget',
            'ui:placeholder': 'Phone Number',
          },
        },
      };
      setTravelersFormSchema(mockSchema?.travelers_form_schema);
      setTravelersUiSchema(mockSchema?.travel_form_ui_schema);
    } catch (error) {
      return error;
    }
  };

  const handleInactiveCartMessage = async () => {
    try {
      if (!cartId) throw new Error('Cart ID is not defined');
      await deleteCart(i18n, cartId);
      window.localStorage.removeItem('cart');
      setIsRemoved(true);
    } catch (error) {
      return error;
    }
  };

  const handleGetCartAvailability = async () => {
    try {
      if (cartId) {
        const response = await getCartAvailability(i18n, cartId);
        const isActiveCart = response?.status === 'active';
        !isActiveCart && handleInactiveCartMessage();
        return { isActiveCart };
      }
    } catch (error) {
      return error;
    }
  };

  const handleGetCart = async () => {
    try {
      if (cartId) {
        const response = await getCartId(i18n, cartId);
        setCart(response);
        setLoaded(true);
      }
    } catch (error) {
      return error;
    }
  };

  const redirectToItinerary = () => {
    router.back();
  };

  const getAddCustomerRequestBody = (primaryContactData: any) => {
    const primaryContactCopy = deepCopy(primaryContactData);
    const requestItems = itemsForm?.map(createAdditionalItem);
    const request: any = hasAdditionalRequests
      ? { customer: primaryContactCopy, items: requestItems }
      : { customer: primaryContactCopy };
    const phone = JSON?.parse?.(primaryContactCopy.phoneNumber || '{}');
    request.customer.phone_number =
      phone?.phone_number || customer?.phone_number;
    request.customer.phone_prefix =
      phone?.phone_prefix || customer?.phone_prefix;
    request.customer.country = phone?.country || customer?.country;

    delete request.customer.phone;
    delete request.customer.primary_contact;

    return { ...request };
  };

  const continueToPayment = async (values: any) => {
    if (!cart || cart.total_item_qty <= 0) return;
    const customerUpdater = new ClientCartCustomerUpdater();
    const requestBody = getAddCustomerRequestBody(values);
    const customer = {
      country: requestBody.customer.country,
      email: requestBody.customer.email,
      first_name: requestBody.customer.firstName,
      last_name: requestBody.customer.lastName,
      phone_number: requestBody.customer.phoneNumber,
      phone_prefix: requestBody.customer.phone_prefix,
    };
    updateCustomer(customer);

    const data = {
      ...requestBody,
      customer: {
        ...cart.customer,
        ...customer,
      },
    };

    delete data.customer.id;

    await customerUpdater.request(data, i18n, cart.cart_id);

    router.push('/checkout/car-rental/payment');
  };

  useEffect(() => {
    cartId = JSON.parse(window.localStorage.getItem('cart') ?? 'null');
    const submitFn = async () => {
      try {
        await handleGetCart();
        await handleGetCartAvailability();
        await handleGetSchema();
      } catch (error) {
        console.error(error);
      }
    };
    submitFn();
  }, [reload, currency]);

  const Title = ({ children }: LayoutProps) => (
    <p className="px-5 mt-3 mb-2 text-lg lg:mt-0 lg:text-2xl text-dark-800 lg:bg-dark-100 lg:py-6 lg:border-b lg:font-semibold">
      {children}
    </p>
  );

  const continueShopping = () => {
    router.push('/');
  };

  const InactiveCartMessage = () => (
    <FullScreenModal
      open={isRemoved}
      title={continueShoppingText}
      primaryButtonText={continueShoppingText}
      primaryButtonAction={continueShopping}
      closeModal={continueShopping}
    >
      <section className="p-8 text-2xl text-error-400 font-bold w-full text-center h-[90vh] grid content-center">
        {t('bookingMustStartAgain')}
      </section>
    </FullScreenModal>
  );

  const itemsNumber = cart?.items?.length;

  useEffect(() => {
    if (cart?.customer && travelersFormSchema) {
      const newTravelersFormSchema = travelersFormSchema;
      Object.entries(cart.customer)
        .filter(
          ([prop]) =>
            prop != 'id' &&
            prop != 'extra_fields' &&
            prop != 'phone_prefix' &&
            prop != 'country',
        )
        .map(([prop, value]) => {
          if (prop == 'phone_number') {
            newTravelersFormSchema.properties['phone'] = {
              ...newTravelersFormSchema.properties['phone'],
              defaultCode: cart.customer.country,
              default: value,
            };
          } else {
            newTravelersFormSchema.properties[prop] = {
              ...newTravelersFormSchema.properties[prop],
              default: value,
            };
          }
        });
      setTravelersFormSchema(newTravelersFormSchema);
    }
  }, [cart, travelersFormSchema]);

  return (
    <>
      <CheckoutHeader step="client" itemsNumber={itemsNumber} />
      {loaded ? (
        <section className="lg:px-20 lg:py-12">
          <section className="mx-auto lg:flex lg:gap-8 lg:justify-start max-w-7xl">
            <section className="lg:w-[68%]">
              <InactiveCartMessage />
              <Card>
                <Title>{primaryContactText}</Title>
                <section className="p-4">
                  <FormProvider {...methods}>
                    <ClientFormContent />
                    <ClientCart
                      items={cart?.items}
                      schema={travelersFormSchema}
                      uiSchema={travelersUiSchema}
                      onChange={handleAdditionalRequestChange}
                    />
                    <CheckoutFooter type="client">
                      <CheckoutSummary
                        cart={cart}
                        reload={reload}
                        setReload={setReload}
                      />
                      <Button
                        value={cancelButton}
                        size={'full'}
                        onClick={redirectToItinerary}
                        color="outlined"
                        className="lg:w-[35%] text-[18px] bg-white border border-dark-1000 text-dark-1000 font-normal hover:text-white hover:bg-dark-1000"
                      />
                      <Button
                        value={continueButton}
                        size={'full'}
                        className="lg:w-[35%] text-[18px] font-normal"
                        onClick={methods.handleSubmit(continueToPayment)}
                      />
                    </CheckoutFooter>
                  </FormProvider>
                </section>
              </Card>
            </section>
            <section className="hidden lg:block lg:w-[32%]">
              <HelpSection inItinerary={true} />
            </section>
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

const Card = ({ children }: LayoutProps) => (
  <section className="lg:border lg:rounded-md lg:shadow-sm">{children}</section>
);

export default Client;
