import { Paragraph } from '@simplenight/ui';
import LocationPin from 'public/icons/assets/location-pin.svg';
interface LocationInfoProps {
  address?: string;
  compact?: boolean;
}

const LocationInfo = ({ address, compact }: LocationInfoProps) => {
  return (
    <section className="flex flex-row gap-2">
      <LocationPin className="w-8 h-10  text-primary-1000" />
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
