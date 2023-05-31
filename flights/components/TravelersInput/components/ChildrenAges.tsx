import { useTranslation } from 'react-i18next';

import BaseInput from 'components/global/Input/BaseInput';
import { Traveler } from 'flights/helpers/traveler';
import { changeArraySize } from 'helpers/arrayUtils';
import classnames from 'classnames';
import { useState } from 'react';

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

  const ChildrenAgesInput = ({
    indexAge,
    age,
  }: {
    indexAge: number;
    age: number;
  }) => {
    const [childAge, setChildAge] = useState<number | ''>(age);

    const validateAge = (age: number) => {
      let _age = age;
      if (_age > 11) _age = 11;
      if (_age < 2) _age = 2;
      setChildAge(_age);

      handleChildrenAgesChange(_age, indexAge, travelerNumber);
    };
    return (
      <input
        type="number"
        className="focus:ring-primary-500 focus:border-primary-500 block w-full h-11 w-11 sm:text-sm border-gray-300 rounded text-center"
        value={childAge !== 0 ? Number(childAge).toString() : ''}
        onChange={(e) =>
          setChildAge(e.target.value !== '' ? Number(e.target.value) : '')
        }
        onBlur={(e) => validateAge(Number(e.target.value))}
      />
    );
  };

  /*  return (
            <section key={indexAge}>
              <input
                type="number"
                value={childAge}
                className="focus:ring-primary-500 focus:border-primary-500 block w-full h-11 w-11 sm:text-sm border-gray-300 rounded text-center"
                onBlur={(e) =>
                  handleChildrenAgesChange(
                    validateAge(parseInt(e.target.value)),
                    indexAge,
                    travelerNumber,
                  )
                }
                onChange={(e) => setChildAge(Number(e.target.value))}
              />
              {/* <BaseInput
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
            /> */

  console.log(traveler.childrenAges);

  return (
    <section className={classnames('flex flex-col gap-2', className)}>
      <section className="text-dark-800 text-[16px] leading-[16px]">
        {childrenAgesLabel}
      </section>
      <section className="flex flex-wrap gap-3">
        {traveler.childrenAges.map((age, indexAge) => (
          <ChildrenAgesInput key={indexAge} age={age} indexAge={indexAge} />
        ))}
      </section>
    </section>
  );
};

export default ChildrenAges;
