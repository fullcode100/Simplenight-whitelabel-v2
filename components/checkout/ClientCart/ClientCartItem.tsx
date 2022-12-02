/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import {
  getBookingQuestionSchema,
  getTravelerQuestionSchema,
} from 'thingsToDo/helpers/questions';
import { useCategorySlug } from 'hooks/category/useCategory';
import Divider from 'components/global/Divider/Divider';

let additionalRequest: string;

const ClientCartItem = ({
  index,
  item,
  formSchema,
  formUiSchema,
  onChange,
  onChangeAnswers,
}: any) => {
  const [t, i18n] = useTranslation('global');
  const travelerText = t('traveler', 'Traveler');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);

  const handleChangeAdditionalRequest = (e: any) => {
    additionalRequest = e.target.value;
    onChange(e.target.value, item.cart_item_id, true);
  };
  const handleChangeCustomer = (data: any) => {
    onChange(data, item.cart_item_id, false);
  };

  const handleChangeAnswers = (data: any, travelerNum: number | null) => {
    onChangeAnswers(data, item.cart_item_id, travelerNum);
  };

  const additionalRequestsPlaceholder = t(
    'additionalRequestsPlaceholder',
    'Add A Special Request.',
  );
  const toggleText = t('useOrderName', 'Use Order Name');
  const iAgreeLabel = t('iAgreeToThe', 'I agree to the');
  const supplierTermsLabel = t(
    'supplierTermsOfService',
    'Supplier Terms Of Service',
  );

  const termsAndConditions = item?.extended_data?.terms_and_conditions;

  const CartItemDetail = () => {
    const itemCategory = useCategorySlug(item.sector?.toLowerCase() || '');
    const sector = useCategory(itemCategory?.type || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
    });
  };

  const bookingQuestions = item?.item_data?.extra_data?.booking_questions;
  const travelerQuestionSchema = getTravelerQuestionSchema(bookingQuestions);
  const bookingQuestionSchema = getBookingQuestionSchema(bookingQuestions);
  const getTicketsCuantity = () => {
    let ticketsCuantity = 0;
    const itemTravelers = [];
    item?.booking_data?.ticket_types?.forEach((ticket: any) => {
      ticketsCuantity += ticket.quantity;
    });
    for (let i = 0; i < ticketsCuantity; i++) itemTravelers.push(i + 1);
    return { ticketsCuantity, itemTravelers };
  };
  const { itemTravelers } = getTicketsCuantity();

  /*   const {
    check_in_instructions: checkInInstructions,
    terms_and_conditions: termsAndConditions,
  } = item.extended_data; */

  return (
    <section className="space-y-5 py-6">
      <CartItemDetail />
      <section className="flex items-center">
        <ToggleSwitch
          onChange={() => setUsePrimaryContact(!usePrimaryContact)}
          checked={usePrimaryContact}
          id={`${item.cart_id}-${index}`}
        />
        <Label
          value={toggleText}
          className="ml-2"
          translationKey="useOrderName"
          htmlFor={`${item.cart_id}-${index}`}
        />
      </section>
      {!usePrimaryContact && (
        <section className="mt-1.5">
          {formSchema && formUiSchema && (
            <FormSchema
              schema={formSchema}
              uiSchema={formUiSchema}
              onChange={handleChangeCustomer}
            >
              {<></>}
            </FormSchema>
          )}
        </section>
      )}

      {bookingQuestionSchema && (
        <section className="mt-1.5">
          <FormSchema
            schema={bookingQuestionSchema.schema}
            uiSchema={bookingQuestionSchema.uiSchema}
            onChange={(data) => handleChangeAnswers(data, null)}
          >
            <></>
          </FormSchema>
        </section>
      )}
      {travelerQuestionSchema &&
        itemTravelers?.map((traveler: any) => (
          <section key={traveler}>
            <p>
              {travelerText} {traveler}
            </p>

            <Divider className="py-1" />
            <section className="mt-1.5">
              <FormSchema
                schema={travelerQuestionSchema.schema}
                uiSchema={travelerQuestionSchema.uiSchema}
                onChange={(data) => handleChangeAnswers(data, traveler)}
              >
                <></>
              </FormSchema>
            </section>
          </section>
        ))}
      <section>
        <Label
          value="Additional Requests"
          className="mt-5 mb-2"
          translationKey="additionalRequests"
        />
        <Textarea
          value={additionalRequest}
          onChange={handleChangeAdditionalRequest}
          placeholder={additionalRequestsPlaceholder}
          {...{
            id: `text-area-${index}`,
          }}
        />
      </section>
      {/*  {termsAndConditions && (
        <>
          <section className="flex items-center w-full gap-3 mt-2">
            <input
              type="checkbox"
              name="expedia"
              id="expedia"
              required={true}
            />
            <label htmlFor="expedia">
              <span className="text-base leading-[22px] text-dark-1000 font-normal">
                {iAgreeLabel}
              </span>{' '}
              <ExternalLink
                className="text-primary-1000 hover:text-primary-1000 font-normal text-base leading-[22px]"
                href={termsAndConditions}
              >
                {supplierTermsLabel}
              </ExternalLink>
            </label>
          </section>
        </>
      )} */}
    </section>
  );
};

export default ClientCartItem;
