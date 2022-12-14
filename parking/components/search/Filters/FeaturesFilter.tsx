import React, { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { CheckboxList } from '../../../../components/global/Checkbox/CheckboxList';
import Heading from '../../../../components/global/Typography/Heading';
import Checkbox from '../../../../components/global/Checkbox/Checkbox';
import CollapseUnbordered from '../../../../components/global/CollapseUnbordered/CollapseUnbordered';

interface FeaturesFilter {
  value: string[];
  onChange: (items: string[]) => void;
}

export const FeaturesFilter: FC<FeaturesFilter> = ({ value, onChange }) => {
  const [t] = useTranslation('parking');

  return (
    <CollapseUnbordered
      title={<Heading tag="h6">{t('features')}</Heading>}
      initialState={true}
      body={
        <CheckboxList
          value={value}
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
      }
    />
  );
};
