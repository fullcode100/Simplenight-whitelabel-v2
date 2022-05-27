import Divider from 'components/global/Divider/Divider';
import ClientCartItem from './ClientCartItem';

interface ClientCartProps {
  items: any;
  schema: any;
  uiSchema: any;
}

const ClientCart = ({ items, schema, uiSchema }: ClientCartProps) => {
  return (
    <section className="px-5 mb-6">
      {items?.map?.((item: any, index: number) => {
        const showDivider = index !== items.length - 1;
        return (
          <section key={item.id}>
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
