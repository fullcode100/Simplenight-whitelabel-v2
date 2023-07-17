import AmenitiesItem from './AmenitiesItem';
import amenitiesIcons from '../amenitiesIcons';
import AmenitiesDefaultIcon from 'public/icons/assets/amenities/default.svg';

interface AmenitiesProps {
  amenities: string[];
}

const AmenityDefaultIcon = {
  iconLarge: <AmenitiesDefaultIcon className="w-12 h-12 mx-auto" />,
  iconSmall: <AmenitiesDefaultIcon />,
};

const AmenitiesList = ({ amenities }: AmenitiesProps) => {
  return (
    <section className="flex flex-col gap-6">
      {amenities.map((amenity) => {
        const icon = amenitiesIcons.find((amenityOption) => {
          return amenityOption.options.some(
            (amenityKeyword) =>
              amenityKeyword.toLowerCase().trim() ==
              amenity.toLowerCase().trim(),
          );
        });
        const amenityIcon = icon ? icon : AmenityDefaultIcon;
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
