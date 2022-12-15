import React, { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { RangeSlider } from '../../../../components/global/RangeSliderNew/RangeSlider';
import Heading from '../../../../components/global/Typography/Heading';
import Checkbox from '../../../../components/global/Checkbox/Checkbox';
import CollapseUnbordered from '../../../../components/global/CollapseUnbordered/CollapseUnbordered';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  value: [number, number];
  onChange: (minMax: [number, number]) => void;
  onAfterChange: (minMax: [number, number]) => void;
  currency: string;
}

export const PriceFilter: FC<PriceFilterProps> = ({
  minPrice = 0,
  maxPrice = 5000,
  value,
  onChange,
  onAfterChange,
  currency,
}) => {
  const [t] = useTranslation('parking');

  return (
    <CollapseUnbordered
      title={<Heading tag="h6">{t('price')}</Heading>}
      initialState={true}
      body={
        <RangeSlider
          min={minPrice}
          max={maxPrice}
          value={value}
          onChange={onChange}
          onAfterChange={onAfterChange}
          format={(num) => `${currency}${num}`}
        />
      }
    />
  );
};
