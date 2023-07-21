import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { useTranslation } from 'react-i18next';

import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import { HOTEL_CATEGORY } from '../../../index';

const RoomSectionTitle = () => {
  const [t] = useTranslation('hotels');
  const roomsText = t('rooms', 'Rooms');

  return (
    <p className="flex items-center gap-3 mb-6 px-4">
      <IconRoundedContainer isLarge className="bg-primary-1000 ">
        <CategoryIcon
          categoryName={HOTEL_CATEGORY}
          className="text-white h-5 w-5 lg:h-[30px] lg:w-[30px]"
        />
      </IconRoundedContainer>
      <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
        {roomsText}
      </span>
    </p>
  );
};

export default RoomSectionTitle;
