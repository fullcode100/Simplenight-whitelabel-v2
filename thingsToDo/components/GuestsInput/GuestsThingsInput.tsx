import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import GuestsThingsModal from './GuestsThingsModal';
import { PricingTicketType } from 'thingsToDo/types/response/ThingsDetailResponse';
import { Paragraph } from '@simplenight/ui';

interface GuestsThingsInputProps {
  guestsData: any;
  setGuestsData: (data: any) => void;
  inputs: PricingTicketType[];
  isAdultRequired: boolean;
  activityMaxTravelers: number;
  setIsEditing?: (value: boolean) => void;
}

const GuestsThingsInput = ({
  guestsData,
  setGuestsData,
  inputs,
  isAdultRequired,
  activityMaxTravelers,
  setIsEditing,
}: GuestsThingsInputProps) => {
  const [t] = useTranslation('global');
  const guests = t('guests', 'Guests');

  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const getResumeGuestsText = () => {
    const guestsResume = inputs?.map(
      (input) => `${guestsData[input.ticket_type_id]} ${input.label}`,
    );
    return guestsResume.join(', ');
  };
  const guestsInputLabel = getResumeGuestsText();

  return (
    <section className="w-full lg:w-1/2">
      <GuestsThingsModal
        showGuestsThingsModal={showGuestsModal}
        onClose={() => setShowGuestsModal(false)}
        guestsData={guestsData}
        setGuestsData={setGuestsData}
        inputs={inputs}
        isAdultRequired={isAdultRequired}
        activityMaxTravelers={activityMaxTravelers}
        setIsEditing={setIsEditing}
      />
      <Paragraph size="small" fontWeight="semibold" textColor="text-dark-800">
        {guests}
      </Paragraph>
      <button
        onClick={() => setShowGuestsModal(true)}
        className="mt-1 bg-white rounded border border-gray-300 w-full py-2 px-[13px] text-sm text-dark-1000 cursor-default"
      >
        <section className="flex items-center gap-2">
          <MultiplePersons className="text-dark-700" />
          <section className="flex flex-row gap-1">{guestsInputLabel}</section>
        </section>
      </button>
    </section>
  );
};

export default GuestsThingsInput;
