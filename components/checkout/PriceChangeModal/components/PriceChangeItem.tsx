import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';

interface PriceChangeItemProps {
  item: Item;
}

const PriceChangeItem = ({ item }: PriceChangeItemProps) => {
  const [t] = useTranslation('global');
  const itemDiscardedLabel = t('itemDiscarded', 'This item will be discarded.');

  return (
    <section className="py-4">
      <section className="flex flex-wrap items-center justify-between">
        <label
          htmlFor={item.cart_item_id}
          className="flex w-11/12 gap-2 items-center pr-2 text-dark-1000"
        >
          <div className="grow rounded-full bg-primary-1000 text-white h-10 w-10 p-2 flex items-center justify-center">
            <CategoryIcon
              categoryName={item.category ? item.category?.toLowerCase() : ''}
            />
          </div>
          <p className="text-base font-semibold leading-[22px]">
            {item.extended_data?.details?.name}
          </p>
          <div className="text-right">
            <p className="text-xs text-dark-700 line-through font-normal">
              US$150.00
            </p>
            <p className="font-semibold">US$150.00</p>
          </div>
        </label>
        <input
          className="w-1/12 peer"
          type="checkbox"
          name="item"
          id={item.cart_item_id}
          defaultChecked
        />
        <p className="peer-checked:hidden block w-full pt-2 text-right text-xs text-error-1000 leading-5">
          {itemDiscardedLabel}
        </p>
      </section>
    </section>
  );
};

export default PriceChangeItem;
