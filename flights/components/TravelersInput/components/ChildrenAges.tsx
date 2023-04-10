import { useTranslation } from 'react-i18next';

import BaseInput from 'components/global/Input/BaseInput';
import { Traveler } from 'flights/helpers/traveler';
import { changeArraySize } from 'helpers/arrayUtils';
import classnames from 'classnames';

interface ChildrenAgesProps {
  traveler: Traveler;
  travelerNumber: number;
  handleChildrenAgesChange: (
    value: number,
    indexAge: number,
    travelerNumber: number,
  ) => void;
  className?: string;
}

const ChildrenAges = ({
  traveler,
  travelerNumber,
  handleChildrenAgesChange,
  className,
}: ChildrenAgesProps) => {
  const [t, i18next] = useTranslation('global');
  // eslint-disable-next-line quotes
  const childrenAgesLabel = t('childrenAges', "Children's Ages");

  const newChildrenAmount = traveler.children;
  traveler.childrenAges =
    traveler.childrenAges.length === newChildrenAmount
      ? traveler.childrenAges
      : changeArraySize(traveler.childrenAges, newChildrenAmount);

  const validateAge = (age: number) => {
    let _age = age;
    if (_age > 11) _age = 11;
    if (_age < 2) _age = 2;
    return _age;
  };

  return (
    <section className={classnames('flex flex-col gap-2', className)}>
      <section className="text-dark-800 text-[16px] leading-[16px]">
        {childrenAgesLabel}
      </section>
      <section className="flex flex-wrap gap-3">
        {traveler.childrenAges.map((age, indexAge) => (
          <section key={indexAge}>
            <BaseInput
              type="number"
              value={validateAge(age)}
              onChange={(e) =>
                handleChildrenAgesChange(
                  validateAge(parseInt(e.target.value)),
                  indexAge,
                  travelerNumber,
                )
              }
              min={2}
              max={11}
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default ChildrenAges;
