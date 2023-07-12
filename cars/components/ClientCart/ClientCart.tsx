import Divider from 'components/global/Divider/Divider';
import ClientCartItem from './ClientCartItem';
import { Item } from '../../../hotels/types/response/CartHotels';
import BlockDivider from 'components/global/Divider/BlockDivider';
import { CarCartItemData } from 'cars/types/response/CarCartItemData';

interface ClientCartProps {
  items?: CarCartItemData[];
  schema: any;
  uiSchema: any;
  onChange: (
    data: string,
    cartItemId: string,
    isAddingSpecialRequest?: boolean,
    useOrderName?: boolean,
  ) => void;
}

const ClientCart = ({ items, schema, uiSchema, onChange }: ClientCartProps) => {
  return (
    <>
      {items && <BlockDivider className="mt-6" />}
      {items?.map?.((item: CarCartItemData, index: number) => {
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
            {showDivider && <Divider />}
          </section>
        );
      })}
    </>
  );
};

export default ClientCart;
