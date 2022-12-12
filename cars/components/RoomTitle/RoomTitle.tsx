import { useTranslation } from 'react-i18next';

import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';

interface RoomTitleProps {
  roomName?: string;
  roomQty?: number;
  nights?: number;
}

const RoomTitle = ({ roomName, nights, roomQty = 1 }: RoomTitleProps) => {
  const [t, i18next] = useTranslation('cars');
  const nightLabel = t('night', 'Night');
  const nightsLabel = t('nights', 'Nights');
  const cancelled = t('cancelled', 'Cancelled');

  const nightsCountLabel = nights == 1 ? nightLabel : nightsLabel;

  const roomNameFormatted = fromUpperCaseToCapitilize(roomName);

  return (
    <section className="flex justify-between font-semibold">
      <p className="text-sm lg:text-lg leading-[22px] lg:leading-[26px] text-dark-1000">
        {roomQty}x {roomNameFormatted}
      </p>
      {nights != undefined ? (
        <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800">
          {nights} {nightsCountLabel}
        </p>
      ) : (
        <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800">
          {cancelled}
        </p>
      )}
    </section>
  );
};

export default RoomTitle;
