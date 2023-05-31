import { useTranslation } from 'react-i18next';

import BaseInput from 'components/global/Input/BaseInput';
import { Traveler } from 'flights/helpers/traveler';
import { changeArraySize } from 'helpers/arrayUtils';
import classnames from 'classnames';
interface InfantsAgesProps {
  traveler: Traveler;
  travelerNumber: number;
  handleInfantsAgesChange: (
    value: number,
    indexAge: number,
    travelerNumber: number,
  ) => void;
  className?: string;
}

const InfantsAges = ({
  traveler,
  travelerNumber,
  handleInfantsAgesChange,
  className,
}: InfantsAgesProps) => {
  const [t, i18next] = useTranslation('global');
  // eslint-disable-next-line quotes
  const infantsAgesLabel = t('infantsAges', "Infants' Ages");

  const newInfantsAmount = traveler.infants;
  traveler.infantsAges =
    traveler.infantsAges.length === newInfantsAmount
      ? traveler.infantsAges
      : changeArraySize(traveler.infantsAges, newInfantsAmount);

  const validateAge = (age: number) => {
    let _age = age;
    if (_age > 1) _age = 1;
    if (_age < 0) _age = 0;
    return _age;
  };

  return (
    <section className={classnames('flex flex-col gap-2', className)}>
      <section className="text-dark-800 text-[16px] leading-[16px]">
        {infantsAgesLabel}
      </section>
      <section className="flex flex-wrap gap-3">
        {traveler.infantsAges.map((age, indexAge) => (
          <section key={indexAge}>
            <input
              type="number"
              value="1"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full h-11 w-11 sm:text-sm border-gray-300 rounded text-center"
              disabled
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default InfantsAges;
