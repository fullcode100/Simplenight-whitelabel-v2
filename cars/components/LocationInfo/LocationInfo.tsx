import { Paragraph } from '@simplenight/ui';
import LocationPin from 'public/icons/assets/location-pin.svg';
interface LocationInfoProps {
  address?: string;
  compact?: boolean;
}

const LocationInfo = ({ address, compact }: LocationInfoProps) => {
  return (
    <section className="flex flex-row gap-2">
      <LocationPin className="h-3.5 lg:h-4 lg:w-4 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
      <Paragraph
        size="small"
        fontWeight="semibold"
        className={compact ? 'max-w-[268px]' : ''}
      >
        {address}
      </Paragraph>
    </section>
  );
};

export default LocationInfo;
