/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { getItemQuestionSchemas } from 'thingsToDo/helpers/questions';
import { useCategorySlug } from 'hooks/category/useCategory';
import Divider from 'components/global/Divider/Divider';
import Button from 'components/global/Button/Button';
import { deepCopy } from 'helpers/objectUtils';

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
  const guestText = t('guest', 'Guest');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);
  const itemCustomer = item?.customer;

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

  if (itemCustomer && formSchema) {
    const newTravelersFormSchema = formSchema;
    Object.entries(itemCustomer)
      .filter(
        ([prop]) =>
          prop != 'id' && prop != 'extra_fields' && prop != 'phone_prefix',
      )
      .map(([prop, value]) => {
        const propKey = prop == 'phone_number' ? 'phone' : prop;
        newTravelersFormSchema.properties[propKey] = {
          ...newTravelersFormSchema.properties[propKey],
          default: value,
          prefix: itemCustomer.phone_prefix,
        };
      });
    formSchema = newTravelersFormSchema;
  }

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
    let sectorName = item.sector?.toLowerCase();
    const categoryName = item.category?.toLowerCase();
    if (categoryName === 'shows-events') sectorName = 'shows-events';
    if (sectorName === 'flights' || categoryName === 'flights')
      sectorName = 'flights';
    if (
      sectorName === 'cars' ||
      sectorName === 'car-rental' ||
      categoryName === 'cars' ||
      categoryName === 'car-rental'
    )
      sectorName = 'car-rental';
    if (sectorName === 'accommodations') {
      sectorName = 'hotels';
    }
    if (sectorName === 'food-beverage') {
      sectorName = 'dining';
    }
    const sector = useCategory(sectorName || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
    });
  };

  const {
    travelerSchema: travelerQuestionSchema,
    bookingSchema: bookingQuestionSchema,
  } = getItemQuestionSchemas(item);

  const getTicketsQuantity = () => {
    const itemTravelers: any = [];
    let travelerNum = 1;
    item?.booking_data?.ticket_types?.forEach((ticket: any) => {
      for (let i = 0; i < ticket.quantity; i++) {
        itemTravelers.push({
          travelerNum,
          ticket,
        });
        travelerNum++;
      }
    });
    return itemTravelers;
  };
  const itemTravelers = getTicketsQuantity();

  /*   const {
    check_in_instructions: checkInInstructions,
    terms_and_conditions: termsAndConditions,
  } = item.extended_data; */

  return (
    <section className="py-6 space-y-5">
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
        itemTravelers?.map(
          ({ travelerNum, ticket }: { travelerNum: any; ticket: any }) => (
            <section key={travelerNum}>
              <p>
                {guestText} {travelerNum} - {ticket.age_band_label}
              </p>

              <Divider className="py-1" />
              <section className="mt-1.5">
                <FormSchema
                  schema={travelerQuestionSchema.schema}
                  uiSchema={travelerQuestionSchema.uiSchema}
                  onChange={(data) => {
                    const copyData = deepCopy(data);
                    copyData.formData['AGEBAND'] = ticket.ticket_type_id;
                    handleChangeAnswers(copyData, travelerNum);
                  }}
                >
                  <></>
                </FormSchema>
              </section>
            </section>
          ),
        )}
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
