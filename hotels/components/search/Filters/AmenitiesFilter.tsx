import { useTranslation } from 'react-i18next';

import MultipleSelect, {
  Option,
} from 'components/global/MultipleSelect/MultipleSelect';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

import { AMENITIES_OPTIONS } from 'hotels/constants/amenities';

import CloseIcon from 'public/icons/assets/close.svg';

export interface AmenitiesFilterProps {
  selectedAmenities: Option[];
  onChangeAmenities: (value: Option) => void;
  handleDeleteAmenity: (value: Option) => void;
  amenitiesOptions: Option[];
}

const AmenitiesFilter = ({
  selectedAmenities,
  onChangeAmenities,
  handleDeleteAmenity,
  amenitiesOptions,
}: AmenitiesFilterProps) => {
  const [t, i18n] = useTranslation('hotels');

  return (
    <FilterContainer>
      <MultipleSelect
        options={amenitiesOptions}
        values={selectedAmenities}
        onChange={onChangeAmenities}
        translation="hotels"
      />
      <section className="min-h-[350px]">
        <section className="flex flex-wrap gap-3 mt-6 pb-6">
          {selectedAmenities.map((amenity) => (
            <section
              key={amenity.value}
              className="flex items-center gap-2 px-2 py-1 text-xs font-semibold border rounded-md leading-lg bg-dark-100 border-dark-200"
            >
              {t(amenity.label)}
              <button
                className="text-base text-dark-1000"
                onClick={() => onChangeAmenities(amenity)}
              >
                <CloseIcon className="text-dark-800" />
              </button>
            </section>
          ))}
        </section>
      </section>
    </FilterContainer>
  );
};

export default AmenitiesFilter;
