import React, { Dispatch, FC, SetStateAction } from 'react';
import { FilterItem } from '@/components/search';
import Checkbox from '../../../../components/global/Checkbox/Checkbox';
import { useTranslation } from 'react-i18next';
import CollapseUnbordered from '../../../../components/global/CollapseUnbordered/CollapseUnbordered';
import Heading from '../../../../components/global/Typography/Heading';

interface AvailabilityFilterProps {
  highAvailability: boolean;
  onChangeHighAvailability:
    | Dispatch<SetStateAction<boolean>>
    | ((value: boolean) => void);
}

export const AvailabilityFilter: FC<AvailabilityFilterProps> = ({
  highAvailability,
  onChangeHighAvailability,
}) => {
  const [t] = useTranslation('parking');
  return (
    <CollapseUnbordered
      title={<Heading tag="h6">{t('availability')}</Heading>}
      initialState={true}
      body={
        <Checkbox
          value="highAvailability"
          checked={highAvailability}
          name="highAvailability"
          onChange={onChangeHighAvailability}
        >
          {t('highAvailabilityLabel')}
        </Checkbox>
      }
    />
  );
};
