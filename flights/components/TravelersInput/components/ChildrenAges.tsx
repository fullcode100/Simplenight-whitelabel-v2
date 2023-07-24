import { useTranslation } from 'react-i18next';

import { Traveler } from 'flights/helpers/traveler';
import classnames from 'classnames';
import { maxChildrenAge, minChildrenAge } from 'flights';
import Select from 'components/global/Select/Select';

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

  const ChildrenAgesInput = ({
    indexAge,
    age,
  }: {
    indexAge: number;
    age: number;
  }) => {
    const generateOptions = () => {
      return Array(maxChildrenAge - minChildrenAge + 1)
        .fill(1)
        .map((_, idx) => `${idx + minChildrenAge}`);
    };
    return (
      <Select
        options={generateOptions()}
        onChange={(value) =>
          handleChildrenAgesChange(+value, indexAge, travelerNumber)
        }
        defaultValue={age !== 0 ? Number(age).toString() : ''}
        selectedIcon={false}
      />
    );
  };

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
