/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

import { getItemQuestionSchemas } from 'thingsToDo/helpers/questions';
import Divider from 'components/global/Divider/Divider';
import { deepCopy } from 'helpers/objectUtils';

let additionalRequest: string;

const ClientCartItem = ({
  index,
  item,
  formSchema,
  formUiSchema,
  onChange,
  onChangeAnswers,
  bookingAnswerData,
}: any) => {
  const [t] = useTranslation('global');
  const guestText = t('guest', 'Guest');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);
  const itemCustomer = item?.customer;

  const handleChangeAdditionalRequest = (e: any) => {
    additionalRequest = e.target.value;
    onChange(e.target.value, item.cart_item_id, true);
  };
  const handleChangeCustomer = (data: any) => {
    setPrimaryContactData(data.formValue);
    onChange(data, item.cart_item_id, false, false);
  };

  const handleChangeAnswers = (data: any, travelerNum: number | null) => {
    onChangeAnswers(data, item.cart_item_id, travelerNum);
  };

  if (itemCustomer && formSchema) {
    const newTravelersFormSchema = formSchema;
    Object.entries(itemCustomer)
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
            defaultCode: itemCustomer.country,
            default: value,
          };
        } else {
          newTravelersFormSchema.properties[prop] = {
            ...newTravelersFormSchema.properties[prop],
            default: value,
          };
        }
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
    if (
      sectorName === 'ground-transportation' ||
      categoryName === 'ground-transportation'
    ) {
      sectorName = 'ground-transportation';
    }
    const sector = useCategory(sectorName || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
    });
  };

  const bookingAnswers = item?.booking_data?.booking_answers;

  const {
    travelerSchema: travelerQuestionSchema,
    bookingSchema: bookingQuestionSchema,
  } = getItemQuestionSchemas(
    item,
    bookingAnswerData?.[item.cart_item_id] || bookingAnswers,
  );

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
  const [primaryContactData, setPrimaryContactData] = useState();
  const [bookingQuestionsData, setBookingQuestionsData] = useState<any>();
  const [travelerContactData, setTravelerContactData] = useState<
    Record<string, any>
  >({});
  return (
    <section className="py-6">
      <CartItemDetail />
      <section className="flex items-center m-5">
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
      <Divider />
      {!usePrimaryContact ? (
        <section className="mt-1.5">
          {formSchema && formUiSchema && (
            <FormSchema
              schema={!usePrimaryContact ? formSchema : null}
              uiSchema={!usePrimaryContact ? formUiSchema : null}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={!usePrimaryContact ? handleChangeCustomer : () => {}}
              formData={primaryContactData}
            >
              <></>
            </FormSchema>
          )}
        </section>
      ) : null}
      {bookingQuestionSchema && (
        <section className="mt-1.5">
          <FormSchema
            schema={bookingQuestionSchema.schema}
            uiSchema={bookingQuestionSchema.uiSchema}
            isDisabled={item.category === 'shows-events'}
            onChange={(data) => {
              setBookingQuestionsData(data.formData);
              handleChangeAnswers(data, null);
            }}
            formData={bookingQuestionsData}
          >
            <></>
          </FormSchema>
        </section>
      )}
      {travelerQuestionSchema &&
        itemTravelers?.map(
          (
            { travelerNum, ticket }: { travelerNum: any; ticket: any },
            index: number,
          ) => (
            <section key={travelerNum}>
              <p>
                {guestText} {travelerNum} - {ticket.age_band_label}
              </p>

              <Divider className="py-1" />
              <section className="mt-1.5">
                <FormSchema
                  schema={travelerQuestionSchema?.schema}
                  uiSchema={travelerQuestionSchema?.uiSchema}
                  formData={travelerContactData[index]}
                  onChange={(data) => {
                    setTravelerContactData((prevState) => ({
                      ...prevState,
                      [index]: data.formData,
                    }));
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
      {item.category !== 'DINING' && (
        <section className="mx-5">
          <Label
            value="Additional Requests"
            className="pt-5 mb-2"
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
      )}
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
