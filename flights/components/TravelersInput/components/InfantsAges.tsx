import { useTranslation } from 'react-i18next';

import BaseInput from 'components/global/Input/BaseInput';
import { Room } from 'flights/helpers/room';
import { changeArraySize } from 'helpers/arrayUtils';
interface InfantsAgesProps {
  room: Room;
  roomNumber: number;
  handleInfantsAgesChange: (
    value: number,
    indexAge: number,
    roomNumber: number,
  ) => void;
}

const InfantsAges = ({
  room,
  roomNumber,
  handleInfantsAgesChange,
}: InfantsAgesProps) => {
  const [t, i18next] = useTranslation('global');
  // eslint-disable-next-line quotes
  const infantsAgesLabel = t('infantsAges', "Infants' Ages");

  const newInfantsAmount = room.infants;
  room.infantsAges =
    room.infantsAges.length === newInfantsAmount
      ? room.infantsAges
      : changeArraySize(room.infantsAges, newInfantsAmount);

  const validateAge = (age: number) => {
    let _age = age;
    if (_age > 1) _age = 1;
    if (_age < 0) _age = 0;
    return _age;
  };

  return (
    <section className="flex flex-col gap-2 mb-6">
      <section className="text-dark-800 text-[16px] leading-[16px]">
        {infantsAgesLabel}
      </section>
      <section className="flex flex-wrap gap-3">
        {room.infantsAges.map((age, indexAge) => (
          <section key={indexAge}>
            <BaseInput
              type="number"
              value={validateAge(age)}
              onChange={(e) =>
                handleInfantsAgesChange(
                  validateAge(parseInt(e.target.value)),
                  indexAge,
                  roomNumber,
                )
              }
              min={0}
              max={1}
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default InfantsAges;
