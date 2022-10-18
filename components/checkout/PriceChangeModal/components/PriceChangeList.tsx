import React from 'react';
import { Item } from 'types/cart/CartType';
import PriceChangeItem from './PriceChangeItem';

interface PriceChangeListProps {
  items: Item[];
}

const PriceChangeList = ({ items }: PriceChangeListProps) => {
  return (
    <section>
      {items?.map((item, index) => (
        <section key={index}>
          <PriceChangeItem item={item} />
          {index < items.length - 1 && (
            <div className="h-px bg-dark-300 w-full" />
          )}
        </section>
      ))}
    </section>
  );
};

export default PriceChangeList;
