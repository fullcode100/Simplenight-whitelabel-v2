import { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { RangeSlider } from '../../../../components/global/RangeSliderNew/RangeSlider';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  value: [number, number];
  onChange: (minMax: [number, number]) => void;
  currency: string;
}

export const PriceFilter: FC<PriceFilterProps> = ({
  minPrice = 0,
  maxPrice = 5000,
  value,
  onChange,
  currency,
}) => {
  const [t] = useTranslation('parking');

  return (
    <FilterItem title={t('price')}>
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        value={value}
        onChange={onChange}
        format={(num) => `${currency}${num}`}
      />
    </FilterItem>
  );
};
