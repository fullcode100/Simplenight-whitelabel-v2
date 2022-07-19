import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import SingleBedIcon from 'public/icons/assets/single-bed.svg';
import { useTranslation } from 'react-i18next';

const RoomSectionTitle = () => {
  const [t] = useTranslation('hotels');
  const roomsText = t('rooms', 'Rooms');
  return (
    <p className="flex items-center gap-3 mb-6">
      <IconRoundedContainer className="bg-primary-1000">
        <SingleBedIcon className="text-white" />
      </IconRoundedContainer>
      <span className="h4 text-dark-800 lg:h3">{roomsText}</span>
    </p>
  );
};

export default RoomSectionTitle;
