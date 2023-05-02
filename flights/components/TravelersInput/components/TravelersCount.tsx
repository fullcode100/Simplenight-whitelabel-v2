import { useTranslation } from 'react-i18next';
import NumberInput from 'components/global/Input/NumberInput';

import { Traveler } from 'flights/helpers/traveler';

interface TravelersCountProps {
  traveler: Traveler;
  index: number;
  handleCountChange: (value: number, index: number, type: string) => void;
}

type TravelerOpt = 'adults' | 'children' | 'infants';

const TravelersCount = ({
  traveler,
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

  const maxTravelers = 7;
  const canAddMoreTravelers = (value: number, type: TravelerOpt) => {
    const obj = { ...traveler };
    obj[type] = value;
    let isValid = true;
    if (type === 'infants') {
      isValid = value <= obj.adults;
    }
    return isValid && obj.adults + obj.children + obj.infants <= maxTravelers;
  };

  const getMaxValue = (type: TravelerOpt) => {
    const obj = { ...traveler };
    obj[type] = maxTravelers;
    const values = [obj.adults, obj.children, obj.infants]
      .sort((a, b) => {
        return a - b;
      })
      .reverse();
    let result = values[0] - values[1] - values[2];
    if (type === 'infants') {
      result = Math.min(obj.adults, result);
    }
    return result;
  };
  return (
    <section className="flex flex-col gap-y-6 mb-6">
      <NumberInput
        label={adultsLabel}
        sublabel={adultsAgeRangeLabel}
        value={traveler.adults}
        onChange={(value) =>
          canAddMoreTravelers(value, 'adults') &&
          handleCountChange(value, index, 'adults')
        }
        min={traveler.infants > 1 ? traveler.infants : 1}
        max={getMaxValue('adults')}
        disabled
      />
      <NumberInput
        label={childrenLabel}
        sublabel={childrenAgeRangeLabel}
        value={traveler.children}
        onChange={(value) =>
          canAddMoreTravelers(value, 'children') &&
          handleCountChange(value, index, 'children')
        }
        max={getMaxValue('children')}
        disabled
      />
      <NumberInput
        label={infantsLabel}
        sublabel={infantsAgeRangeLabel}
        value={traveler.infants}
        onChange={(value) =>
          canAddMoreTravelers(value, 'infants') &&
          handleCountChange(value, index, 'infants')
        }
        max={getMaxValue('infants')}
        disabled
      />
    </section>
  );
};

export default TravelersCount;
