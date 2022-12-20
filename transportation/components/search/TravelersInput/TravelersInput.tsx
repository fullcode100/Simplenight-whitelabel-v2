import {
  MouseEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';

interface TravelersInputProps {
  showTravelersInput: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  children: JSX.Element
}

const TravelersInput = ({
  showTravelersInput,
  onClose,
  children
}: TravelersInputProps) => {
  const [t] = useTranslation('global');
  const applyLabel = t('apply', 'Apply');
  const passengersLabel = t('passengers', 'Passengers');

  const setTravelers = () => {
    onClose();
  };

  return (
    <FullScreenModal
      open={showTravelersInput}
      closeModal={onClose}
      title={passengersLabel}
      primaryButtonText={applyLabel}
      primaryButtonAction={setTravelers}
      className={
        'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
      }
    >
      <section className="h-full px-5 py-[22px] overflow-y-scroll">
        {children}
      </section>
    </FullScreenModal>
  );
};

export default TravelersInput;
