import { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { CheckboxList } from '../../../../components/global/Checkbox/CheckboxList';

interface FeaturesFilter {
  onChange: (items: string[]) => void;
}

export const FeaturesFilter: FC<FeaturesFilter> = ({ onChange }) => {
  const [t] = useTranslation('parking');

  return (
    <FilterItem title={t('features')}>
      <CheckboxList
        onChange={onChange}
        items={[
          {
            value: 'DISABLED_SPACES',
            label: t('disabledSpaces'),
          },
          {
            value: 'ELECTRIC_CAR_CHARGING',
            label: t('electricCarsCharging'),
          },
          {
            value: 'VALET',
            label: t('valet'),
          },
        ]}
      />
    </FilterItem>
  );
};
