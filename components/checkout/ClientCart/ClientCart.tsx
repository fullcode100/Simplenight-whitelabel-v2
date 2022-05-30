import Divider from 'components/global/Divider/Divider';
import ClientCartItem from './ClientCartItem';
import { Item } from 'types/cart/CartType';

interface ClientCartProps {
  items?: Item[];
  schema: any;
  uiSchema: any;
}

const ClientCart = ({ items, schema, uiSchema }: ClientCartProps) => {
  return (
    <section className="px-5 mb-6">
      {items?.map?.((item: Item, index: number) => {
        const showDivider = index !== items.length - 1;
        return (
          <section key={index}>
            <ClientCartItem
              item={item}
              formSchema={schema}
              formUiSchema={uiSchema}
            />
            {showDivider && <Divider className="py-6" />}
          </section>
        );
      })}
    </section>
  );
};

export default ClientCart;
