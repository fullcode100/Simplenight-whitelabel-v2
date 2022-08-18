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

const ClientCartItem = ({
  index,
  item,
  formSchema,
  formUiSchema,
  onChange,
}: any) => {
  const [t, i18n] = useTranslation('global');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);

  let additionalRequest: string;
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

  const CartItemHeader = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBody = () => {
    return (
      <section className="grid mb-6">
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
      </section>
    );
  };

  return (
    <CollapseUnbordered title={<CartItemHeader />} body={<CartItemBody />} />
  );
};

export default ClientCartItem;
