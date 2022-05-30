/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import CartItemDropdown from 'components/checkout/CartItemDropdown/CartItemDropdown';
import { useTranslation } from 'react-i18next';

const ClientCartItem = ({ item, formSchema, formUiSchema }: any) => {
  const [t, i18n] = useTranslation('global');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);
  const [additionalRequest, setAdditionalRequest] = useState('');
  const handleChangeAdditionalRequest = (e: any) =>
    setAdditionalRequest(e.target.value);
  const showContactForm = !usePrimaryContact && formSchema && formUiSchema;
  const additionalRequestsPlaceholder = t(
    'additionalRequestsPlaceholder',
    'Enter optional request...',
  );
  const { chain_name } = item.extended_data.details.chain;
  const { description } = item.extended_data.min_rate_room;
  return (
    <CartItemDropdown title={chain_name} description={description}>
      <section className="grid gap-4 mt-4">
        <section className="flex items-center">
          <ToggleSwitch
            onChange={() => setUsePrimaryContact(!usePrimaryContact)}
            checked={usePrimaryContact}
            id={item.cart_id}
          />
          <Label
            value="Use Primary Contact"
            className="ml-2"
            translationKey="usePrimaryContact"
          />
        </section>
        <section>
          <Label
            value="Additional Requests"
            className="mb-2"
            translationKey="additionalRequests"
          />
          <Textarea
            value={additionalRequest}
            onChange={handleChangeAdditionalRequest}
            placeholder={additionalRequestsPlaceholder}
          />
        </section>
        {showContactForm && (
          <section>
            <FormSchema schema={formSchema} uiSchema={formUiSchema}>
              <></>
            </FormSchema>
          </section>
        )}
      </section>
    </CartItemDropdown>
  );
};

export default ClientCartItem;
