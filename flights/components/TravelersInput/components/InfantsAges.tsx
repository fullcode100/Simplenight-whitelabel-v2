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
  const infantsAgesLabel = t('infantsAges', "Infants's Ages");

  const newInfantsAmount = room.infants;
  room.infantsAges =
    room.infantsAges.length === newInfantsAmount
      ? room.infantsAges
      : changeArraySize(room.infantsAges, newInfantsAmount);

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
              value={age}
              onChange={(e) =>
                handleInfantsAgesChange(
                  parseInt(e.target.value) >= 2 ? 2 : parseInt(e.target.value),
                  indexAge,
                  roomNumber,
                )
              }
              max={2}
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default InfantsAges;
