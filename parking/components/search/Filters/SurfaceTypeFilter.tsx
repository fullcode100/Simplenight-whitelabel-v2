import React, { FC } from 'react';
import { FilterItem } from '@/components/search';
import { useTranslation } from 'react-i18next';
import { CheckboxList } from '../../../../components/global/Checkbox/CheckboxList';
import { Heading } from '@simplenight/ui';
import { RangeSlider } from '../../../../components/global/RangeSliderNew/RangeSlider';
import CollapseUnbordered from '../../../../components/global/CollapseUnbordered/CollapseUnbordered';

interface SurfaceTypeFilter {
  value: string[];
  onChange: (items: string[]) => void;
}

export const SurfaceTypeFilter: FC<SurfaceTypeFilter> = ({
  value,
  onChange,
}) => {
  const [t] = useTranslation('parking');

  return (
    <CollapseUnbordered
      title={<Heading tag="h6">{t('surfaceType')}</Heading>}
      initialState={true}
      body={
        <CheckboxList
          value={value}
          onChange={onChange}
          items={[
            {
              value: 'COVERED',
              label: t('covered'),
            },
            {
              value: 'MULTISTOREY',
              label: t('multistory'),
            },
            {
              value: 'PARTIALLY_COVERED',
              label: t('partiallyCovered'),
            },
            {
              value: 'NOT_COVERED',
              label: t('notCovered'),
            },
            {
              value: 'UNDERGROUND',
              label: t('underGround'),
            },
          ]}
        />
      }
    />
  );
};
