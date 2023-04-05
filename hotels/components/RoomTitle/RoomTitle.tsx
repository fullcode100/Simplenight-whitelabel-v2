import { useTranslation } from 'react-i18next';
import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import { Paragraph, Heading } from '@simplenight/ui';

interface RoomTitleProps {
  roomName?: string;
  roomQty?: number;
  nights?: number;
}

const RoomTitle = ({ roomName, nights, roomQty = 1 }: RoomTitleProps) => {
  const [t, i18next] = useTranslation('hotels');
  const nightLabel = t('night', 'Night');
  const nightsLabel = t('nights', 'Nights');
  const cancelled = t('cancelled', 'Cancelled');

  const nightsCountLabel = nights == 1 ? nightLabel : nightsLabel;

  const roomNameFormatted = fromUpperCaseToCapitilize(roomName);

  return (
    <section className="flex justify-between items-center font-semibold">
      <Heading tag="h6">
        {roomQty} x {roomNameFormatted}
      </Heading>
      {nights != undefined ? (
        <Paragraph textColor="text-dark-700">
          {nights} {nightsCountLabel}
        </Paragraph>
      ) : (
        <Paragraph textColor="text-dark-700">{cancelled}</Paragraph>
      )}
    </section>
  );
};

export default RoomTitle;
