import { MouseEvent } from 'react';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import AmenitiesList from './components/AmenitiesList';

interface AmenitiesModalProps {
  showAmenitiesModal: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  amenities: string[];
}

const AmenitiesModal = ({
  showAmenitiesModal,
  onClose,
  amenities,
}: AmenitiesModalProps) => {
  return (
    <FullScreenModal
      open={showAmenitiesModal}
      title="Flight Amenities"
      closeModal={onClose}
      primaryButtonAction={onClose}
      noFooter={true}
    >
      <section className="p-5 overflow-y-scroll">
        <AmenitiesList amenities={amenities} />
      </section>
    </FullScreenModal>
  );
};

export default AmenitiesModal;
