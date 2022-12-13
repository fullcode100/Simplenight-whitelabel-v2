import AmenitiesItem from './AmenitiesItem';
import amenitiesIcons from '../amenitiesIcons';

interface AmenitiesProps {
  amenities: string[];
}

const AmenitiesList = ({ amenities }: AmenitiesProps) => {
  return (
    <section className="flex flex-col gap-6">
      {amenities.map((amenity) => {
        const amenityIcon = amenitiesIcons.find((amenityOption) => {
          if (amenityOption.options.includes(amenity)) {
            return true;
          }
          return false;
        });

        return (
          <AmenitiesItem
            key={amenity}
            view="list"
            text={amenity}
            icon={amenityIcon && amenityIcon.iconSmall}
          />
        );
      })}
    </section>
  );
};

export default AmenitiesList;
