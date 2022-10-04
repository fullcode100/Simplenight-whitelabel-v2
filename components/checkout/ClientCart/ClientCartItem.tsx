/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import BreakdownSummary from 'hotels/components/PriceBreakdownModal/components/BreakdownSummary';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';

let additionalRequest: string;

const ClientCartItem = ({
  index,
  item,
  formSchema,
  formUiSchema,
  onChange,
}: any) => {
  const [t, i18n] = useTranslation('global');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);

  const handleChangeAdditionalRequest = (e: any) => {
    additionalRequest = e.target.value;
    onChange(e.target.value, item.cart_item_id, true);
  };
  const handleChangeCustomer = (data: any) => {
    onChange(data, item.cart_item_id, false);
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

  const CartItemHeader = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.breakdownDisplay, {
      item: item,
      showCollapse: false,
    });
  };

  const {
    check_in_instructions: checkInInstructions,
    terms_and_conditions: termsAndConditions,
  } = item.extended_data;

  const Instructions = () => {
    const {
      instructions,
      special_instructions: specialInstructions,
      fees,
    } = checkInInstructions;
    const { mandatory, optional } = fees;

    const instructionsText = `${instructions}
    ${specialInstructions}
    ${mandatory}
    ${optional}
    `;

    const policies = checkInInstructions?.policies ?? '';

    const hasInstructions = instructionsText && instructionsText !== '';
    const hasPolicies = policies && policies !== '';

    return (
      <section className="mb-6 text-base leading-[24px] font-normal text-dark-1000">
        {hasInstructions && <>{instructionsText}</>}
        {hasPolicies && (
          <>
            <br />
            {policies}
          </>
        )}
      </section>
    );
  };

  const CartItemBody = () => {
    return (
      <section className="mb-6 px-4">
        <CartItemBreakdown />
      </section>
    );
  };

  return (
    <section className="space-y-5 py-6">
      <CollapseBordered
        title={<CartItemHeader />}
        body={<CartItemBody />}
        footer={<BreakdownSummary rate={item.rate} showTotal={true} />}
      />
      {checkInInstructions && <Instructions />}
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
      {termsAndConditions && (
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
      )}
    </section>
  );
};

export default ClientCartItem;
