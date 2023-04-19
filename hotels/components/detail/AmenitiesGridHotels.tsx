import AmenitiesItem from '../Amenities/components/AmenitiesItem';
import amenitiesIcons from '../Amenities/amenitiesIcons';

interface AmenitiesProps {
  amenities: string[];
}

const AmenitiesGrid = ({ amenities }: AmenitiesProps) => {
  return (
    <section className="grid grid-cols-8 gap-4 justify-items-center w-full mx-auto px-5 py-6">
      {amenities.map((amenity, index) => {
        const amenityIcon = amenitiesIcons.find((amenityOption) => {
          if (amenityOption.options.includes(amenity)) {
            return true;
          }
          return false;
        });

        return (
          <AmenitiesItem
            key={amenity}
            view="grid"
            text={amenity}
            icon={amenityIcon && amenityIcon.iconLarge}
          />
        );
      })}
    </section>
  );
};

export default AmenitiesGrid;
