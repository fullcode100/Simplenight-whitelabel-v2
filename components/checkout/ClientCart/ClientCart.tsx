import Divider from 'components/global/Divider/Divider';
import ClientCartItem from './ClientCartItem';
import { Item } from 'types/cart/CartType';
import BlockDivider from 'components/global/Divider/BlockDivider';

interface ClientCartProps {
  items?: Item[];
  schema: any;
  uiSchema: any;
  onChange: (value: string, cartItemId: string) => void;
}

const ClientCart = ({ items, schema, uiSchema, onChange }: ClientCartProps) => {
  return (
    <section className="mb-6">
      {items && <BlockDivider className="mb-6 mt-6" />}
      {items?.map?.((item: Item, index: number) => {
        const showDivider = index !== items.length - 1;
        return (
          <section key={index}>
            <ClientCartItem
              index={index}
              item={item}
              formSchema={schema}
              formUiSchema={uiSchema}
              onChange={onChange}
            />
            {showDivider && <Divider className="py-6" />}
          </section>
        );
      })}
    </section>
  );
};

export default ClientCart;
