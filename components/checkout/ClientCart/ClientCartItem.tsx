/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import CartItemDropdown from 'components/checkout/CartItemDropdown/CartItemDropdown';
import { useTranslation } from 'react-i18next';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { deepCopy } from 'helpers/objectUtils';
import { IChangeEvent } from '@rjsf/core';

const ClientCartItem = ({
  index,
  item,
  formSchema,
  formUiSchema,
  onChange,
}: any) => {
  const [t, i18n] = useTranslation('global');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);
  const [additionalRequest, setAdditionalRequest] = useState('');
  const handleChangeAdditionalRequest = (e: any) => {
    setAdditionalRequest(e.target.value);
    onChange(e.target.value, item.cart_item_id);
  };
  const additionalRequestsPlaceholder = t(
    'additionalRequestsPlaceholder',
    'Add a special request...',
  );
  const toggleText = t('useOrderName', 'Use Order Name');
  const roomText = t('room', 'Room');
  const roomsText = t('rooms', 'Rooms');
  const { name } = item.extended_data.details;
  const { description } = item.extended_data.min_rate_room;
  const itemsQty = item.room_qty;
  return (
    <CartItemDropdown
      title={name}
      description={`${itemsQty} ${usePlural(itemsQty, roomText, roomsText)}`}
    >
      <section className="grid gap-3 mt-5">
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
          <section>
            {formSchema && formUiSchema && (
              <FormSchema schema={formSchema} uiSchema={formUiSchema}>
                {<></>}
              </FormSchema>
            )}
          </section>
        )}
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
            {...{
              id: `text-area-${index}`,
            }}
          />
        </section>
      </section>
    </CartItemDropdown>
  );
};

export default ClientCartItem;
