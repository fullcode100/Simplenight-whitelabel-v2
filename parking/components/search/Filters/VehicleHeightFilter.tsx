import { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { RangeSlider } from '../../../../components/global/RangeSliderNew/RangeSlider';

interface VehicleHeightFilterProps {
  minHeight: number;
  maxHeight: number;
  value: [number, number];
  onChange: (minMax: [number, number]) => void;
  marks: number[];
}

export const VehicleHeightFilter: FC<VehicleHeightFilterProps> = ({
  minHeight = 0,
  maxHeight = 5000,
  value,
  onChange,
  marks,
}) => {
  const [t] = useTranslation('parking');

  return (
    <FilterItem title={t('vehicleHeight')}>
      <RangeSlider
        min={minHeight}
        max={maxHeight}
        value={value}
        onChange={onChange}
        marks={marks}
        format={(height) => `${height / 100}m`}
      />
    </FilterItem>
  );
};
