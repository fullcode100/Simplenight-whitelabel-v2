import { useTranslation } from 'react-i18next';

import Plus from 'public/icons/assets/Plus.svg';

interface AddRoomButtonProps {
  handleAddRoom: () => void;
}

const AddRoomButton = ({ handleAddRoom }: AddRoomButtonProps) => {
  const [t, i18next] = useTranslation('global');
  const addRoomLabel = t('addRoom', 'Add Room');

  return (
    <button className="float-right mt-6" onClick={handleAddRoom}>
      <section className="flex flex-row gap-3">
        <Plus className="text-primary-1000" />
        <section className="text-dark-1000 text-[18px] leading-[18px]">
          {addRoomLabel}
        </section>
      </section>
    </button>
  );
};

export default AddRoomButton;
