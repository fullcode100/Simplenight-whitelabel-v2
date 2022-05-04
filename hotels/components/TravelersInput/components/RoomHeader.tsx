import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Room } from 'hotels/helpers/room';
import Trash from 'public/icons/assets/trash.svg';

interface RoomHeaderProps {
  index: number;
  room: Room;
  newRooms: Room[];
  handleDeleteRoom: (room: Room) => void;
}

const RoomHeader = ({
  index,
  room,
  newRooms,
  handleDeleteRoom,
}: RoomHeaderProps) => {
  const [t, i18next] = useTranslation('global');
  const roomLabel = t('room', 'Room');

  return (
    <section
      className={classnames('flex justify-between mb-6', {
        ['mt-6']: index !== 0,
      })}
    >
      <h1 className="text-dark-800 text-[20px] leading-[24px]">
        {roomLabel} {index + 1}
      </h1>
      {newRooms.length > 1 && (
        <button onClick={() => handleDeleteRoom(room)}>
          <Trash className="text-dark-1000" />
        </button>
      )}
    </section>
  );
};

export default RoomHeader;
