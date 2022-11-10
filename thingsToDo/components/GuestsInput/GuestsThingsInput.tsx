import { useState } from 'react';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import GuestsThingsModal from './GuestsThingsModal';
import useGetGuestsTexts from 'hotels/hooks/useGetGuestTexs';
import { GuestsData } from 'thingsToDo/types/response/ThingsDetailResponse';

interface GuestsThingsInputProps {
  guestsData: GuestsData;
  setGuestsData: (data: GuestsData) => void;
}

const GuestsThingsInput = ({
  guestsData,
  setGuestsData,
}: GuestsThingsInputProps) => {
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const { adults, children, infants } = guestsData;
  const { ADULT_TEXT, CHILDREN_TEXT, INFANTS_TEXT } =
    useGetGuestsTexts(guestsData);
  const OccupancySection = () => (
    <section className="flex flex-row gap-1">
      {adults} {ADULT_TEXT}, {children} {CHILDREN_TEXT}, {infants}{' '}
      {INFANTS_TEXT}
    </section>
  );

  return (
    <>
      <GuestsThingsModal
        showGuestsThingsModal={showGuestsModal}
        onClose={() => setShowGuestsModal(false)}
        guestsData={guestsData}
        setGuestsData={setGuestsData}
      />
      <p className="text-sm font-semibold text-dark-800">Guests</p>
      <button
        onClick={() => setShowGuestsModal(true)}
        className="mt-1 bg-white rounded-md border border-gray-300 w-full py-2 px-[13px] text-sm text-dark-1000 cursor-default"
      >
        <section className="flex items-center gap-2">
          <MultiplePersons className="text-dark-700" />
          <OccupancySection />
        </section>
      </button>
    </>
  );
};

export default GuestsThingsInput;
