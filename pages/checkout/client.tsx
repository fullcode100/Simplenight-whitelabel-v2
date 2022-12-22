/* eslint-disable camelcase */
// Libraries
import React, { ReactNode, useEffect, useState } from 'react';
// Components
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import Button from 'components/global/Button/Button';
import ClientForm from 'components/checkout/ClientForm/ClientForm';
import {
  deleteCart,
  getCartAvailability,
  getCartId,
  getCartSchema,
  updateCartItem,
} from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';
import ClientCart from 'components/checkout/ClientCart/ClientCart';
// import { CartObjectResponse } from 'types/cart/CartType';
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../components/global/Loader/Loader';
import { deepCopy } from 'helpers/objectUtils';
import { IChangeEvent } from '@rjsf/core';
import { ClientCartCustomerUpdater } from 'core/client/ClientCartCustomerUpdater';
import { AddCustomerRequest } from 'types/checkout/AddCustomerRequest';
import CheckoutSummary from 'components/checkout/CheckoutSummary/CheckoutSummary';
import { getCurrency } from 'store/selectors/core';
import HelpSection from 'components/global/HelpSection/HelpSection';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import {
  FREETEXT_UNIT,
  PICKUP_POINT_ID,
  PICKUP_POINT_UNIT,
  questionsFormDataDestructuring,
} from 'helpers/bookingQuestions';

interface LayoutProps {
  children: ReactNode;
}

const ITINERARY_URI = '/itinerary';

const Client = () => {
  const router = useRouter();
  const [t, i18n] = useTranslation('global');

  const [travelersFormSchema, setTravelersFormSchema] = useState<any>();
  const [travelersUiSchema, setTravelersUiSchema] = useState();
  const [isRemoved, setIsRemoved] = useState(false);

  const currency = getCurrency();

  let primaryContactData: FormData | undefined;
  const bookingAnswerData: any = {};
  let itemsForm: any[] | undefined = [];
  let hasAdditionalRequests = false;

  const createAdditionalItem = (item: any) => {
    const { cart_item_id, customer, customer_additional_requests } = item;
    if (customer) {
      const phone = customer?.phone && JSON?.parse?.(customer?.phone);
      customer.phone_number = phone?.phone_number;
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

  const [cart, setCart] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);
  let cartId: string | null = null;

  const handleAdditionalRequestChange = (
    data: any,
    cartItemId: string,
    isAddingSpecialRequest?: boolean,
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
              ...(!isAddingSpecialRequest && {
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
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const cancelButton = t('cancel', 'Cancel');
  const continueButton = t('continue', 'Continue');
  const continueShoppingText = t('continueShopping', 'Continue Shopping');

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

  const handleTravelerAnswerChange = (
    data: IChangeEvent<FormData>,
    itemId: string,
    travelerNum?: number,
  ) => {
    const formDataCopy = questionsFormDataDestructuring(
      deepCopy(data.formData),
    );
    Object.keys(formDataCopy).forEach((key) => {
      if (!bookingAnswerData[itemId]) bookingAnswerData[itemId] = [];
      const bookingAnswer = bookingAnswerData[itemId].find(
        (answer: any) =>
          answer.question_id === key && answer.traveler_num === travelerNum,
      );
      if (!bookingAnswer) {
        const value = formDataCopy[key].ref || formDataCopy[key];
        const answerItem: any = {
          question_id: key,
          value,
          traveler_num: travelerNum,
        };
        if (value.unit) {
          answerItem.unit = value.unit;
          answerItem.value = value.number || 0;
        }
        if (key === PICKUP_POINT_ID) answerItem.unit = PICKUP_POINT_UNIT;
        if (key === 'TRANSFER_ARRIVAL_DROP_OFF')
          answerItem.unit = FREETEXT_UNIT;
        bookingAnswerData[itemId].push(answerItem);
      } else {
        bookingAnswerData[itemId] = bookingAnswerData[itemId]?.map(
          (answer: any) => {
            if (
              answer.question_id === key &&
              answer.traveler_num === travelerNum
            ) {
              const value = formDataCopy[key].ref || formDataCopy[key];
              const answerItem: any = {
                ...answer,
                value,
              };
              if (value.unit) {
                answerItem.unit = value.unit;
                answerItem.value = value.number || 0;
              }
              if (key === PICKUP_POINT_ID) answerItem.unit = PICKUP_POINT_UNIT;
              return answerItem;
            }
            return answer;
          },
        );
      }
    });
  };

  const redirectToItinerary = () => {
    router.push(ITINERARY_URI);
  };

  const getAddCustomerRequestBody = (): { customer: AddCustomerRequest } => {
    const primaryContactCopy = deepCopy(primaryContactData);
    const requestItems = itemsForm?.map(createAdditionalItem);
    const request: any = hasAdditionalRequests
      ? { customer: primaryContactCopy, items: requestItems }
      : { customer: primaryContactCopy };
    const phone = JSON?.parse?.(primaryContactCopy.phone);
    if (phone && phone.phone_number && phone.phone_prefix) {
      request.customer.phone_number = phone.phone_number;
      request.customer.phone_prefix = phone.phone_prefix;
    }

    delete request.customer.phone;
    delete request.customer.primary_contact;

    return { ...request };
  };

  const continueToPayment = async (values: any) => {
    if (!cart || cart.total_item_qty <= 0 || !primaryContactData) return;

    const customerUpdater = new ClientCartCustomerUpdater();
    const requestBody = getAddCustomerRequestBody();

    Object.keys(bookingAnswerData)?.forEach(async (itemId) => {
      const itemData: any = {
        cartId: cart.cart_id,
        itemId,
        bookingAnswers: bookingAnswerData[itemId],
      };
      await updateCartItem(i18n, itemData);
    });

    const data = {
      ...requestBody,
      customer: {
        ...cart.customer,
        ...requestBody.customer,
      },
    };

    delete data.customer.id;

    await customerUpdater.request(data, i18n, cart.cart_id);

    router.push('/checkout/payment');
  };

  useEffect(() => {
    cartId = JSON.parse(window.localStorage.getItem('cart') ?? 'null');
    handleGetCart()
      .then(() => handleGetSchema().then(() => handleGetCartAvailability()))
      .catch((error) => console.error(error));
  }, [reload, currency]);

  const Title = ({ children }: LayoutProps) => (
    <p className="px-5 mt-3 mb-2 text-lg lg:mt-0 lg:text-2xl text-dark-800 lg:bg-dark-100 lg:py-6 lg:border-b lg:font-semibold">
      {children}
    </p>
  );

  const Card = ({ children }: LayoutProps) => (
    <section className="lg:border lg:rounded-md lg:shadow-sm">
      {children}
    </section>
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
        The booking must start again
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
            prop != 'id' && prop != 'extra_fields' && prop != 'phone_prefix',
        )
        .map(([prop, value]) => {
          if (prop == 'phone_number') {
            newTravelersFormSchema.properties['phone'] = {
              ...newTravelersFormSchema.properties['phone'],
              defaultCode: cart.customer.phone_prefix,
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

  let travelersFormSchemaWithClass;
  travelersFormSchema &&
    (travelersFormSchemaWithClass = {
      ...(travelersFormSchema as any),
      className: 'lg:grid lg:grid-cols-2 lg:gap-x-4',
    });

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
                <section>
                  <ClientForm
                    schema={travelersFormSchemaWithClass}
                    uiSchema={travelersUiSchema}
                    onChange={handlePrimaryContactFormChange}
                    onSubmit={continueToPayment}
                  >
                    <ClientCart
                      items={cart.items}
                      schema={travelersFormSchema}
                      uiSchema={travelersUiSchema}
                      onChange={handleAdditionalRequestChange}
                      onChangeAnswers={handleTravelerAnswerChange}
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
                        disabled={isDisabled}
                        className="lg:w-[35%] text-[18px] font-normal"
                      />
                    </CheckoutFooter>
                  </ClientForm>
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

export default Client;
