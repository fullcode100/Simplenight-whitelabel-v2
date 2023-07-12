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
  updateCartItem,
} from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';
import ClientCart from 'components/checkout/ClientCart/ClientCart';
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
import { useCustomer } from 'hooks/checkout/useCustomer';
import { getItemQuestionSchemas } from 'thingsToDo/helpers/questions';
import ClientForm from 'components/checkout/ClientForm/ClientForm';
import countryList from 'country-list';
import { useGA4 } from 'hooks/ga4/useGA4';
import { TRACK_ACTION, TRACK_CATEGORY, TRACK_LABEL } from 'constants/events';

interface LayoutProps {
  children: ReactNode;
}

const ITINERARY_URI = '/itinerary';

const Client = () => {
  const router = useRouter();
  const { trackEvent } = useGA4();
  const [t, i18n] = useTranslation('global');

  const [travelersFormSchema, setTravelersFormSchema] = useState<any>();
  const [travelersUiSchema, setTravelersUiSchema] = useState<any>();
  const [isRemoved, setIsRemoved] = useState(false);

  const [cart, setCart] = useState<any>();
  const schemas = cart?.items?.map((item: any) => {
    return getItemQuestionSchemas(item);
  });

  const [customer, updateCustomer] = useCustomer((state) => [
    state.customer,
    state.updateCustomer,
  ]);

  const currency = getCurrency();

  const bookingAnswerData: any = useRef({}).current;
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

      const countries = countryList.getData();
      countries.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      const countryOptions = Object.values(countries).map((label) => {
        return { value: label.code, label: label.name };
      });
      const customerCountry = countryOptions.find(
        (option) =>
          option.value.toUpperCase() === customer?.country.toUpperCase(),
      );
      const defaultCountry = customerCountry || countryOptions[235];
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
            country: {
              type: 'string',
              title: 'Country',
              default: defaultCountry.value,
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
          country: {
            'ui:widget': 'CountryWidget',
          },
          phone: {
            'ui:widget': 'PhoneWidget',
            'ui:placeholder': 'Phone Number',
          },
          email: {
            'ui:placeholder': 'Email',
            classNames: 'col-span-2',
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
  const questions = cart?.items[0]?.item_data?.extra_data?.booking_questions;
  const hasQuestionPickup = questions?.find(
    (question: any) => question.id === PICKUP_POINT_ID,
  );
  const handleTravelerAnswerChange = (
    data: IChangeEvent<FormData>,
    itemId: string,
    travelerNum?: number,
  ) => {
    const formDataCopy = questionsFormDataDestructuring(
      deepCopy(data.formData),
    );
    if (formDataCopy?.[PICKUP_POINT_ID] && !hasQuestionPickup)
      delete formDataCopy[PICKUP_POINT_ID];
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

  const cancelItinerary = () => {
    trackEvent({
      category: TRACK_CATEGORY.ALL,
      value: `itinerary length ${cart?.items?.length}`,
      action: TRACK_ACTION.CLICK,
      label: TRACK_LABEL.CANCEL,
    });
    // router.push(ITINERARY_URI);
    router.back();
  };

  const getAddCustomerRequestBody = (primaryContactData: {
    customer: AddCustomerRequest;
  }) => {
    const primaryContactCopy = deepCopy(primaryContactData);

    const requestItems = itemsForm?.map(createAdditionalItem);
    const request: any = hasAdditionalRequests
      ? { customer: primaryContactCopy, items: requestItems }
      : { customer: primaryContactCopy };
    const phone = JSON?.parse?.(primaryContactCopy.phone || '{}');
    request.customer.phone_number =
      phone?.phone_number ||
      cart.customer.phone_number ||
      customer?.phone_number;
    request.customer.phone_prefix =
      phone?.phone_prefix ||
      cart.customer.phone_prefix ||
      customer?.phone_prefix;
    request.customer.country = primaryContactCopy?.country || customer?.country;

    delete request.customer.phone;
    delete request.customer.primary_contact;

    return { ...request };
  };

  const checkFormsBeforeContinue = () => {
    const forms = document?.forms;
    if (forms) {
      for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        if (!form?.checkValidity()) {
          form?.reportValidity();
          return false;
        }
      }
      return true;
    }
  };

  const continueToPayment = async (values: any) => {
    if (!checkFormsBeforeContinue()) return;
    if (!cart || cart.total_item_qty <= 0) return;

    trackEvent({
      category: TRACK_CATEGORY.ALL,
      value: `itinerary length ${cart?.items?.length}`,
      action: TRACK_ACTION.CLICK,
      label: TRACK_LABEL.CONTINUE,
    });

    const customerUpdater = new ClientCartCustomerUpdater();
    const requestBody = getAddCustomerRequestBody(values.formData);
    updateCustomer(requestBody.customer);
    await Promise.all(
      Object.keys(bookingAnswerData)?.map(async (itemId) => {
        const itemData: any = {
          cartId: cart.cart_id,
          itemId,
          bookingAnswers: bookingAnswerData[itemId],
        };

        await updateCartItem(i18n, itemData);
      }),
    );

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
        The booking must start again
      </section>
    </FullScreenModal>
  );

  const handleClientFormChange = (data: any) => {
    const values = data.formData;
    const newCountry = values.country;
    const currentCountry = travelersFormSchema?.properties.country.default;
    setData(data.formData);
    if (travelersFormSchema && newCountry !== currentCountry) {
      setTravelersFormSchema({
        ...travelersFormSchema,
        properties: {
          ...travelersFormSchema.properties,
          country: {
            ...travelersFormSchema.properties.country,
            default: newCountry,
          },
          phone: {
            ...travelersFormSchema.properties.phone,
            defaultCode: newCountry,
          },
        },
      });
    }
  };

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

  let travelersFormSchemaWithClass;
  travelersFormSchema &&
    (travelersFormSchemaWithClass = {
      ...(travelersFormSchema as any),
      className: 'lg:grid lg:grid-cols-2 lg:gap-x-4',
    });
  const [data, setData] = useState({});
  if (!travelersFormSchemaWithClass || !travelersUiSchema) {
    return null;
  }

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
                  <ClientForm
                    schema={travelersFormSchemaWithClass}
                    uiSchema={travelersUiSchema}
                    onSubmit={continueToPayment}
                    onChange={handleClientFormChange}
                    formData={data}
                  >
                    <ClientCart
                      items={cart?.items}
                      schema={travelersFormSchema}
                      uiSchema={travelersUiSchema}
                      onChange={handleAdditionalRequestChange}
                      onChangeAnswers={handleTravelerAnswerChange}
                      bookingAnswerData={bookingAnswerData}
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
                        onClick={cancelItinerary}
                        color="outlined"
                        className="lg:w-[35%] text-[18px] bg-white border border-dark-1000 text-dark-1000 font-normal hover:text-white hover:bg-dark-1000"
                      />
                      <Button
                        value={continueButton}
                        size={'full'}
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

const Card = ({ children }: LayoutProps) => (
  <section className="lg:border lg:rounded-md lg:shadow-sm">{children}</section>
);

export default Client;
