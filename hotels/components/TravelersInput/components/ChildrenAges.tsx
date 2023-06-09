import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BaseInput from 'components/global/Input/BaseInput';
import { Room } from 'hotels/helpers/room';
import { changeArraySize } from 'helpers/arrayUtils';
interface ChildrenAgesProps {
  room: Room;
  roomNumber: number;
  childrenAges: number[];
  handleAgesChange: (
    value: number,
    indexAge: number,
    roomNumber: number,
  ) => void;
  setIndexOnFocus: Dispatch<SetStateAction<number>>;
  indexOnFocus: number;
}

const ChildrenAges = ({
  room,
  roomNumber,
  childrenAges,
  handleAgesChange,
  setIndexOnFocus,
  indexOnFocus,
}: ChildrenAgesProps) => {
  const [t, i18next] = useTranslation('global');
  // eslint-disable-next-line quotes
  const childLabel = t('child', 'Child');

  const newChildrenAmount = room.children;

  childrenAges =
    childrenAges.length === newChildrenAmount
      ? childrenAges
      : changeArraySize(childrenAges, newChildrenAmount);
  return (
    <section className="flex w-full align-center gap-2 mb-6">
      <section className="flex w-full flex-col flex-wrap gap-3">
        {childrenAges.map((age, indexAge) => (
          <section className="flex justify-between w-full" key={indexAge}>
            <div className="text-dark-800 text-[16px] leading-[16px] w-[50%] flex items-center">
              {`${childLabel} ${indexAge + 1}`}
            </div>
            <div className="w-[50%] flex justify-start">
              <BaseInput
                type="number"
                value={age}
                onChange={(e) =>
                  handleAgesChange(
                    parseInt(e.target.value) >= 11
                      ? 11
                      : parseInt(e.target.value) === 0
                      ? 1
                      : parseInt(e.target.value),
                    indexAge,
                    roomNumber,
                  )
                }
                onClick={() => setIndexOnFocus(indexAge)} // Set the indexOnFocus for ChildrenAges
                autoFocus={indexOnFocus === indexAge} // Set autoFocus based on indexOnFocus
                max={11}
                min={1}
                inputClassName="w-[150px]"
                externalWidth
              />
            </div>
          </section>
        ))}
      </section>
    </section>
  );
};

export default ChildrenAges;
