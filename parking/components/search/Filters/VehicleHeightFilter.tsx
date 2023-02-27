import React, { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { RangeSlider } from '../../../../components/global/RangeSliderNew/RangeSlider';
import { Heading } from '@simplenight/ui';
import CollapseUnbordered from '../../../../components/global/CollapseUnbordered/CollapseUnbordered';

interface VehicleHeightFilterProps {
  minHeight: number;
  maxHeight: number;
  value: [number, number];
  onChange: (minMax: [number, number]) => void;
  onAfterChange: (minMax: [number, number]) => void;
}

export const VehicleHeightFilter: FC<VehicleHeightFilterProps> = ({
  minHeight = 0,
  maxHeight = 5000,
  value,
  onChange,
  onAfterChange,
}) => {
  const [t] = useTranslation('parking');

  return (
    <CollapseUnbordered
      title={<Heading tag="h6">{t('vehicleHeight')}</Heading>}
      initialState={true}
      body={
        <RangeSlider
          min={minHeight}
          max={maxHeight}
          value={value}
          onChange={onChange}
          onAfterChange={onAfterChange}
          format={(height) => `${height / 100}m`}
        />
      }
    />
  );
};
