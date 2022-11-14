/* eslint-disable indent */
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import NumberInput from 'components/global/Input/NumberInput';
import {
  GuestsData,
  PricingTicketType,
} from 'thingsToDo/types/response/ThingsDetailResponse';

interface GuestsThingsModalProps {
  showGuestsThingsModal: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  guestsData: any;
  setGuestsData: (data: GuestsData) => void;
  inputs: PricingTicketType[];
}

const GuestsThingsModal = ({
  showGuestsThingsModal,
  onClose,
  guestsData,
  setGuestsData,
  inputs,
}: GuestsThingsModalProps) => {
  const [t, i18next] = useTranslation('global');
  const applyLabel = t('apply', 'Apply');
  const guestsLabel = t('guests', 'Guests');
  const agesLabel = t('ages', 'Ages');
  const toLabel = t('to', 'to');
  const minLabel = t('min', 'Min');
  const maxLabel = t('max', 'Max');
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
          {inputs?.map((input) => {
            const {
              label,
              ticket_type_id: id,
              min_travelers: min,
              max_travelers: max,
              start_age: startAge,
              end_age: endAge,
            } = input;
            const subLabel = `${agesLabel} ${startAge} ${toLabel} ${endAge}`;
            const minMaxText = `${minLabel}. ${min}, ${maxLabel}. ${max}`;
            return (
              <NumberInput
                key={id}
                label={label}
                sublabel={subLabel}
                buttonsLabel={minMaxText}
                value={guests[id]}
                onChange={(value) => handleCountChange(value, id)}
                min={min}
                max={max}
                disabled
              />
            );
          })}
        </section>
      </section>
    </FullScreenModal>
  );
};

export default GuestsThingsModal;
