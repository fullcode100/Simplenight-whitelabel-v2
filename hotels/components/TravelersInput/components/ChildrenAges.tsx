import { useTranslation } from 'react-i18next';

import BaseInput from 'components/global/Input/BaseInput';
import { Room } from 'hotels/helpers/room';
import { changeArraySize } from 'helpers/arrayUtils';
interface ChildrenAgesProps {
  room: Room;
  roomNumber: number;
  handleAgesChange: (
    value: number,
    indexAge: number,
    roomNumber: number,
  ) => void;
}

const ChildrenAges = ({
  room,
  roomNumber,
  handleAgesChange,
}: ChildrenAgesProps) => {
  const [t, i18next] = useTranslation('global');
  // eslint-disable-next-line quotes
  const childrenAgesLabel = t('childrenAges', "Children's Ages");

  const newChildrenAmount = room.children + room.infants;
  room.childrenAges =
    room.childrenAges.length === newChildrenAmount
      ? room.childrenAges
      : changeArraySize(room.childrenAges, newChildrenAmount);

  return (
    <section className="flex flex-col gap-2 mb-6">
      <section className="text-dark-800 text-[16px] leading-[16px]">
        {childrenAgesLabel}
      </section>
      <section className="flex flex-wrap gap-3">
        {room.childrenAges.map((age, indexAge) => (
          <section key={indexAge}>
            <BaseInput
              type="number"
              value={age}
              onChange={(e) =>
                handleAgesChange(
                  parseInt(e.target.value) >= 17
                    ? 17
                    : parseInt(e.target.value),
                  indexAge,
                  roomNumber,
                )
              }
              max={17}
              autoFocus={true}
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default ChildrenAges;
