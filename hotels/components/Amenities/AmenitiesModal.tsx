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
      title="Hotel Amenities"
      closeModal={onClose}
      primaryButtonAction={onClose}
      noFooter={true}
      className={
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-4 shadow-full lg:max-h-[660px] lg:max-w-[842px]'
      }
    >
      <section className="overflow-y-scroll p-5">
        <AmenitiesList amenities={amenities} />
      </section>
    </FullScreenModal>
  );
};

export default AmenitiesModal;
