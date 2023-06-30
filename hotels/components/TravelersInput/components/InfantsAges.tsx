import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

import { Room } from 'hotels/helpers/room';
import { changeArraySize } from 'helpers/arrayUtils';
import Select from 'components/global/Select/Select';
interface InfantsAgesProps {
  room: Room;
  infantAges: number[];
  roomNumber: number;
  setIndexOnFocus: Dispatch<SetStateAction<number>>;
  indexOnFocus: number;
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
  infantAges,
  indexOnFocus,
  setIndexOnFocus,
}: InfantsAgesProps) => {
  const [t, i18next] = useTranslation('global');
  // eslint-disable-next-line quotes
  const infantLabel = t('infant', 'Infant');
  console.log('indexOnFocus infant', indexOnFocus);
  const newChildrenAmount = room.infants;
  const InfantsAges = ['<1', '1'];
  infantAges =
    infantAges.length === newChildrenAmount
      ? infantAges
      : changeArraySize(infantAges, newChildrenAmount);

  return (
    <section className="flex w-full align-center gap-2 mb-6">
      <section className="flex w-full flex-col flex-wrap gap-3">
        {infantAges.map((age, indexAge) => {
          const newIndex = indexAge + 10;
          return (
            <section className="flex justify-between w-full" key={newIndex}>
              <div className="text-dark-800 text-[16px] leading-[16px] w-[50%] flex items-center">
                {`${infantLabel} ${indexAge + 1}`}
              </div>
              <div className="w-[50%] flex justify-end">
                <div className="w-full lg:w-[150px] mt-6 md:mt-0">
                  <Select
                    options={InfantsAges}
                    onChange={(value) =>
                      handleInfantsAgesChange(
                        InfantsAges.findIndex((p) => p === value),
                        indexAge,
                        roomNumber,
                      )
                    }
                    defaultValue={'<1'}
                  />
                </div>
              </div>
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default InfantsAges;
