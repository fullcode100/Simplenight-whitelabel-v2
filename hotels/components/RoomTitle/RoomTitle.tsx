import { useTranslation } from 'react-i18next';

import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';

interface RoomTitleProps {
  roomName?: string;
  nights: number;
}

const RoomTitle = ({ roomName, nights }: RoomTitleProps) => {
  const [t, i18next] = useTranslation('hotels');
  const nightsLabel = t('nights', 'Nights');

  const roomNameFormatted = fromUpperCaseToCapitilize(roomName);

  return (
    <section className="flex justify-between font-semibold">
      <p className="text-[16px] leading-[22px] text-dark-1000">
        {roomNameFormatted}
      </p>
      <p className="text-sm text-dark-800">
        {nights} {nightsLabel}
      </p>
    </section>
  );
};

export default RoomTitle;
