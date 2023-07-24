import { useTranslation } from 'react-i18next';

import { Traveler } from 'flights/helpers/traveler';
import classnames from 'classnames';
import Select from 'components/global/Select/Select';
import { minChildrenAge } from 'flights';
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

  const generateOptions = () => {
    return Array(minChildrenAge)
      .fill(1)
      .map((_, idx) => `${idx}`);
  };

  return (
    <section className={classnames('flex flex-col gap-2', className)}>
      <section className="text-dark-800 text-[16px] leading-[16px]">
        {infantsAgesLabel}
      </section>
      <section className="flex flex-wrap gap-3">
        {traveler.infantsAges.map((age, indexAge) => (
          <section key={indexAge}>
            <Select
              options={generateOptions()}
              onChange={(value) =>
                handleInfantsAgesChange(+value, indexAge, travelerNumber)
              }
              defaultValue={age !== 0 ? Number(age).toString() : ''}
              selectedIcon={false}
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default InfantsAges;
