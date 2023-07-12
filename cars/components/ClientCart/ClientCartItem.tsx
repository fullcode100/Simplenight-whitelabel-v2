/* eslint-disable camelcase */
import { useState } from 'react';
import ToggleSwitch from 'components/global/ToggleSwitch/ToggleSwitch';
import Label from 'components/global/Label/Label';
import Textarea from 'components/global/Textarea/Textarea';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import { CarCartItemData } from 'cars/types/response/CarCartItemData';

interface ClientCartItemProps {
  index: number;
  item: CarCartItemData;
  formSchema: any;
  formUiSchema: any;
  onChange: (
    data: string,
    cartItemId: string,
    isAddingSpecialRequest?: boolean,
    useOrderName?: boolean,
  ) => void;
}

let additionalRequest: string;

const ClientCartItem = ({
  index,
  item,
  formSchema,
  formUiSchema,
  onChange,
}: ClientCartItemProps) => {
  const [t] = useTranslation('global');
  const [usePrimaryContact, setUsePrimaryContact] = useState(true);
  const itemCustomer = item?.custumer;

  const handleChangeAdditionalRequest = (e: any) => {
    additionalRequest = e.target.value;
    onChange(e.target.value, item.cart_item_id, true);
  };
  const handleChangeCustomer = (data: any) => {
    onChange(data, item.cart_item_id, false, false);
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

  const CartItemDetail = () => {
    let sectorName = item.sector?.toLowerCase();
    const categoryName = item.category?.toLowerCase();
    if (
      sectorName === 'cars' ||
      sectorName === 'car-rental' ||
      categoryName === 'cars' ||
      categoryName === 'car-rental'
    )
      sectorName = 'car-rental';
    const sector = useCategory(sectorName || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
    });
  };

  return (
    <section className="py-6">
      <CartItemDetail />
      <section className="flex items-center mt-5">
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
      {!usePrimaryContact ? (
        <section className="mt-1.5">
          {formSchema && formUiSchema && (
            <FormSchema
              schema={!usePrimaryContact ? formSchema : null}
              uiSchema={!usePrimaryContact ? formUiSchema : null}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={!usePrimaryContact ? handleChangeCustomer : () => {}}
            >
              <></>
            </FormSchema>
          )}
        </section>
      ) : null}
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

export default ClientCartItem;
