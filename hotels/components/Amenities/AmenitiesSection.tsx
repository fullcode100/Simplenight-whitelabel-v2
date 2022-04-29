import { useState } from 'react';

import AmenitiesGrid from './components/AmenitiesGrid';
import AmenitiesModal from './AmenitiesModal';

interface AmenitiesProps {
  amenities: string[];
}

const AmenitiesSection = ({ amenities }: AmenitiesProps) => {
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

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
          className="mb-4 text-sm text-right leading-5 font-medium text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
        >
          View All Amenities
        </button>
      )}
    </>
  );
};

export default AmenitiesSection;
