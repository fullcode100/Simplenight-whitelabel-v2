import { useTranslation } from 'react-i18next';
import NumberInput from 'components/global/Input/NumberInput';

import { Room } from 'hotels/helpers/room';

interface TravelersCountProps {
  room: Room;
  index: number;
  handleCountChange: (value: number, index: number, type: string) => void;
}

const TravelersCount = ({
  room,
  index,
  handleCountChange,
}: TravelersCountProps) => {
  const [t, i18next] = useTranslation('global');
  const adultsLabel = t('adults', 'Adults');
  const childrenLabel = t('children', 'Children');
  const childrenAgeRangeLabel = t('childrenRange', 'Ages 1 to 17');

  return (
    <section className="flex flex-col gap-y-6 mb-6">
      <NumberInput
        label={adultsLabel}
        value={room.adults}
        onChange={(value) => handleCountChange(value, index, 'adults')}
        min={1}
        max={10}
        disabled
      />
      <NumberInput
        label={childrenLabel}
        sublabel={childrenAgeRangeLabel}
        value={room.children}
        onChange={(value) => handleCountChange(value, index, 'children')}
        max={10}
        disabled
      />
    </section>
  );
};

export default TravelersCount;
