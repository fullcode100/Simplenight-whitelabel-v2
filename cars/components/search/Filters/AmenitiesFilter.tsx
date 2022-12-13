import { useTranslation } from 'react-i18next';

import MultipleSelect, {
  Option,
} from 'components/global/MultipleSelect/MultipleSelect';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

import { AMENITIES_OPTIONS } from 'cars/constants/amenities';

import CloseIcon from 'public/icons/assets/close.svg';

interface AmenitiesFilterProps {
  selectedAmenities: Option[];
  onChangeAmenities: (value: Option) => void;
  handleDeleteAmenity: (value: Option) => void;
}

const AmenitiesFilter = ({
  selectedAmenities,
  onChangeAmenities,
  handleDeleteAmenity,
}: AmenitiesFilterProps) => {
  const [t, i18n] = useTranslation('cars');
  const amenitiesText = t('amenities', 'Amenities');

  return (
    <FilterContainer>
      <FilterTitle label={amenitiesText} />
      <MultipleSelect
        options={AMENITIES_OPTIONS}
        values={selectedAmenities}
        onChange={onChangeAmenities}
        translation="cars"
      />
      <section className="flex flex-wrap gap-3 mt-6">
        {selectedAmenities.map((amenity) => (
          <section
            key={amenity.value}
            className="flex items-center gap-2 px-2 py-1 text-xs font-semibold border rounded-md leading-lg bg-dark-100 border-dark-200"
          >
            {t(amenity.label)}
            <button
              className="text-base text-dark-1000"
              onClick={() => handleDeleteAmenity(amenity)}
            >
              <CloseIcon className="text-dark-800" />
            </button>
          </section>
        ))}
      </section>
    </FilterContainer>
  );
};

export default AmenitiesFilter;
