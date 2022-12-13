import { Dispatch, FC, SetStateAction } from 'react';
import { FilterItem } from '@/components/search';
import Checkbox from '../../../../components/global/Checkbox/Checkbox';
import { useTranslation } from 'react-i18next';

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
    <FilterItem title={t('availability')}>
      <Checkbox
        value="highAvailability"
        checked={highAvailability}
        name={'highAvailability'}
        onChange={onChangeHighAvailability}
      >
        {t('highAvailabilityLabel')}
      </Checkbox>
    </FilterItem>
  );
};
