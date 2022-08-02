import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import SingleBedIcon from 'public/icons/assets/single-bed.svg';
import { useTranslation } from 'react-i18next';

const RoomSectionTitle = () => {
  const [t] = useTranslation('hotels');
  const roomsText = t('rooms', 'Rooms');
  return (
    <p className="flex items-center gap-3 mb-6">
      <IconRoundedContainer className="bg-primary-1000">
        <SingleBedIcon className="text-white h-5 w-5 lg:h-[30px] lg:w-[30px]" />
      </IconRoundedContainer>
      <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
        {roomsText}
      </span>
    </p>
  );
};

export default RoomSectionTitle;
