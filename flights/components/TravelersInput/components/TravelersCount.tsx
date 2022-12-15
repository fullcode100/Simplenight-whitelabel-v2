import { useTranslation } from 'react-i18next';
import NumberInput from 'components/global/Input/NumberInput';

import { Room } from 'flights/helpers/room';

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
  const [t, i18next] = useTranslation('flights');
  const adultsLabel = t('adults', 'Adults');
  const adultsAgeRangeLabel = t('adultsRange', 'Over 12 Years Old');
  const childrenLabel = t('children', 'Children');
  const childrenAgeRangeLabel = t('childrenRange', 'Ages 2 to 11');
  const infantsLabel = t('infants', 'Infants');
  const infantsAgeRangeLabel = t('infantsRange', 'Under 2 Years Old');

  return (
    <section className="flex flex-col gap-y-6 mb-6">
      <NumberInput
        label={adultsLabel}
        sublabel={adultsAgeRangeLabel}
        value={room.adults}
        onChange={(value) => value + room.children + room.infants <= 7 && handleCountChange(value, index, 'adults')}
        min={1}
        max={7 - room.children - room.infants}
        disabled
      />
      <NumberInput
        label={childrenLabel}
        sublabel={childrenAgeRangeLabel}
        value={room.children}
        onChange={(value) => room.adults + value + room.infants <= 7 && handleCountChange(value, index, 'children')}
        max={7 - room.adults - room.infants}
        disabled
      />
      <NumberInput
        label={infantsLabel}
        sublabel={infantsAgeRangeLabel}
        value={room.infants}
        onChange={(value) => value <= room.adults && room.adults + room.children + value <= 7 && handleCountChange(value, index, 'infants')}
        max={Math.min(room.adults, 7 - room.adults - room.children)}
        disabled
      />
    </section>
  );
};

export default TravelersCount;
