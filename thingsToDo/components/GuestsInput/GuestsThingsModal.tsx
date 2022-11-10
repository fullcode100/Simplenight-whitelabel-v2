/* eslint-disable indent */
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import NumberInput from 'components/global/Input/NumberInput';
import { GuestsData } from 'thingsToDo/types/response/ThingsDetailResponse';

interface GuestsThingsModalProps {
  showGuestsThingsModal: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  guestsData: GuestsData;
  setGuestsData: (data: GuestsData) => void;
}

const GuestsThingsModal = ({
  showGuestsThingsModal,
  onClose,
  guestsData,
  setGuestsData,
}: GuestsThingsModalProps) => {
  const [t, i18next] = useTranslation('global');
  const applyLabel = t('apply', 'Apply');
  const guestsLabel = t('guests', 'Guests');
  const adultsLabel = t('adults', 'Adults');
  const childrenLabel = t('children', 'Children');
  const infantsLabel = t('infants', 'Infants');
  const [guests, setGuests] = useState(guestsData);

  const onApply = () => {
    setGuestsData(guests);
    onClose();
  };

  const handleCountChange = (value: any, key: string) => {
    setGuests({ ...guests, [key]: value });
  };

  return (
    <FullScreenModal
      open={showGuestsThingsModal}
      closeModal={onClose}
      title={guestsLabel}
      primaryButtonText={applyLabel}
      primaryButtonAction={onApply}
      className={`lg:rounded-4 lg:overflow-hidden
      lg:w-[842px] lg:h-[660px]  lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2
      lg:shadow-full`}
    >
      <section className="h-full px-5 py-[22px] overflow-y-scroll">
        <section className="flex flex-col gap-y-6 mb-6">
          <NumberInput
            label={adultsLabel}
            value={guests['adults']}
            onChange={(value) => handleCountChange(value, 'adults')}
            min={1}
            max={10}
            disabled
          />
          <NumberInput
            label={childrenLabel}
            value={guests['children']}
            onChange={(value) => handleCountChange(value, 'children')}
            max={10}
            disabled
          />
          <NumberInput
            label={infantsLabel}
            value={guests['infants']}
            onChange={(value) => handleCountChange(value, 'infants')}
            max={10}
            disabled
          />
        </section>
      </section>
    </FullScreenModal>
  );
};

export default GuestsThingsModal;
