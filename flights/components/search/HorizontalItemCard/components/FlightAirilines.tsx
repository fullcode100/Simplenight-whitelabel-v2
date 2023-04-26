import { getAirlineIconUrl } from 'flights/utils';
import { Segment } from 'flights/types/response/FlightSearchResponse';
import { Paragraph } from '@simplenight/ui';

const FlightAirlines = ({ segments }: { segments: Segment[] }) => {
  const firstSegment = segments[0];
  const hasOtherSegments = segments.length > 1;
  const amountOfOtherSegments = segments.length - 1;
  return (
    <section className="flex flex-col items-center  gap-1 shrink-0">
      <img
        className="h-10 hidden lg:block"
        src={getAirlineIconUrl(firstSegment?.carrier.toUpperCase())}
        alt={firstSegment?.carrier_name}
      />
      <div className="lg:hidden flex gap-2">
        {segments.map((segment) => (
          <img
            key={segment.id}
            className="h-7 "
            src={getAirlineIconUrl(segment.carrier.toUpperCase())}
            alt={segment.carrier_name}
          />
        ))}
      </div>

      {hasOtherSegments && (
        <Paragraph size="xxsmall" textColor="text-dark-700 hidden lg:block">
          + {amountOfOtherSegments}
        </Paragraph>
      )}
    </section>
  );
};

export default FlightAirlines;
