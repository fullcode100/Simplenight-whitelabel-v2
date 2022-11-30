import Divider from 'components/global/Divider/Divider';
import ClientCartItem from './ClientCartItem';
import { Item } from 'types/cart/CartType';
import BlockDivider from 'components/global/Divider/BlockDivider';
import { IChangeEvent } from '@rjsf/core';

interface ClientCartProps {
  items?: Item[];
  schema: any;
  uiSchema: any;
  onChange: (
    value: string,
    cartItemId: string,
    isAddingSpecialRequest: boolean,
  ) => void;
  onChangeAnswers?: (value: IChangeEvent<FormData>, cartItemId: string) => void;
}

const ClientCart = ({
  items,
  schema,
  uiSchema,
  onChange,
  onChangeAnswers,
}: ClientCartProps) => {
  return (
    <>
      {items && <BlockDivider className="mt-6" />}
      {items?.map?.((item: Item, index: number) => {
        const showDivider = index !== items.length - 1;
        return (
          <>
            {item.extended_data && (
              <section key={index}>
                <ClientCartItem
                  index={index}
                  item={item}
                  formSchema={schema}
                  formUiSchema={uiSchema}
                  onChange={onChange}
                />
                {showDivider && <Divider />}
              </section>
            )}
          </>
        );
      })}
    </>
  );
};

export default ClientCart;
