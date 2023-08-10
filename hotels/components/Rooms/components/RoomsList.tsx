import { useState } from 'react';
import { Room } from 'hotels/types/response/SearchResponse';
import RoomCard from './RoomCard';
import Button from 'components/global/Button/Button';

interface RoomsProps {
  rooms: Array<Room>;
  hotelId: string;
  hotelName: string;
  nights: number;
  guests: number;
  roomsQty: number;
}

const DEFAULT_RESULTS = 3;

const RoomsList = ({
  rooms,
  hotelId,
  hotelName,
  nights,
  guests,
  roomsQty,
}: RoomsProps) => {
  const [next, setNext] = useState(DEFAULT_RESULTS);

  const loadMoreResults = () => {
    setNext(next + DEFAULT_RESULTS);
  };
  return (
    <section className="w-full mt-6 lg:grid lg:gap-8 lg:mt-3 lg:mb-12">
      {rooms?.slice(0, next).map((room) => (
        <RoomCard
          key={room.code}
          room={room}
          hotelId={hotelId}
          hotelName={hotelName}
          nights={nights}
          guests={guests}
          roomsQty={roomsQty}
        />
      ))}
      <section className="flex justify-center px-3">
        {rooms.length > next && (
          <Button
            value={'Show more'}
            size="full"
            onClick={() => loadMoreResults()}
            className="w-60 mb-6 lg:mb-0 text-base font-semibold leading-base mt-4"
            disabled={false}
          />
        )}
      </section>
    </section>
  );
};

export default RoomsList;
