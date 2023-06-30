import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BaseInput from 'components/global/Input/BaseInput';
import { Room } from 'hotels/helpers/room';
import { changeArraySize } from 'helpers/arrayUtils';
import Select from 'components/global/Select/Select';

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
  const ChildrenAges = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
  ];
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
            <div className="w-[50%] flex justify-end">
              <div className="w-full lg:w-[150px] mt-6 md:mt-0">
                <Select
                  options={ChildrenAges}
                  onChange={(value) =>
                    handleAgesChange(
                      ChildrenAges.findIndex((p) => p === value) + 2,
                      indexAge,
                      roomNumber,
                    )
                  }
                  defaultValue={'2'}
                />
              </div>
            </div>
          </section>
        ))}
      </section>
    </section>
  );
};

export default ChildrenAges;
