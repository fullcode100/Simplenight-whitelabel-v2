import React from 'react';
import PriceChangeList from './PriceChangeList';
import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';

interface PriceChangeBodyProps {
  items: Item[];
}

const PriceChangeBody = ({ items }: PriceChangeBodyProps) => {
  const [t] = useTranslation('global');
  const unselectedLabel = t(
    'unselectedItems',
    'Unselected items will be discarded.',
  );

  return (
    <section className="h-full py-6 px-4 overflow-y-scroll space-y-6">
      <p className="text-dark-1000 text-sm leading-[22px]">{unselectedLabel}</p>
      <PriceChangeList items={items} />
    </section>
  );
};

export default PriceChangeBody;
