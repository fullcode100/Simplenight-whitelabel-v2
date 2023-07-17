import AmenitiesItem from './AmenitiesItem';
import amenitiesIcons from '../amenitiesIcons';

interface AmenitiesProps {
  amenities: string[];
}

const AmenitiesGrid = ({ amenities }: AmenitiesProps) => {
  let availableIconCounter = 0;
  return (
    <section className="grid grid-cols-3 gap-4 justify-items-center w-full mx-auto px-5 py-6">
      {amenities.map((amenity) => {
        const amenityIcon = amenitiesIcons.find((amenityOption) => {
          return amenityOption.options.some(
            (amenityKeyword) =>
              amenityKeyword.toLowerCase().trim() ==
              amenity.toLowerCase().trim(),
          );
        });
        if (!amenityIcon) return;
        availableIconCounter += 1;
        if (availableIconCounter <= 6) {
          return (
            <AmenitiesItem
              key={amenity}
              view="grid"
              text={amenity}
              icon={amenityIcon && amenityIcon.iconLarge}
            />
          );
        }
      })}
    </section>
  );
};

export default AmenitiesGrid;
