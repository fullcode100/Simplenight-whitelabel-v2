import { useState } from 'react';

import AmenitiesGrid from './components/AmenitiesGrid';
import AmenitiesModal from './AmenitiesModal';
import { useTranslation } from 'react-i18next';

interface AmenitiesProps {
  amenities: string[];
}

const AmenitiesSection = ({ amenities }: AmenitiesProps) => {
  const [t] = useTranslation('hotels');
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const viewAllAmenitiesText = t('viewAllAmenities', 'View all amenities');

  return (
    <>
      <AmenitiesModal
        showAmenitiesModal={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
        amenities={amenities}
      />
      <AmenitiesGrid amenities={amenities} />
      {amenities.length > 6 && (
        <button
          type="button"
          onClick={() => setShowAmenitiesModal(true)}
          className="mb-4 text-sm text-right leading-5 font-semibold text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
        >
          {viewAllAmenitiesText}
        </button>
      )}
    </>
  );
};

export default AmenitiesSection;
