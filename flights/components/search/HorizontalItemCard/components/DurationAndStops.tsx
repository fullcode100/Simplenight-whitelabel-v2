import { IconWrapper, Paragraph } from '@simplenight/ui';
import { SegmentInfo } from 'flights/types/response/FlightSearchResponse';
import { getDuration } from 'flights/utils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import ClockIcon from 'public/icons/assets/clock-icon.svg';
import { useTranslation } from 'react-i18next';

const DurationAndStops = ({ segmentInfo }: { segmentInfo: SegmentInfo }) => {
  const flightDurationInMinutes = segmentInfo.segments.reduce(
    (acc, curr) => +curr.duration + acc,
    0,
  );
  const duration = getDuration(flightDurationInMinutes);
  const [t] = useTranslation('flights');
  const stops = segmentInfo.stops;
  const stopsTranslation = t('stops', 'Stops');
  const stopTranslation = t('stop', 'Stop');
  const stopsLabel = usePlural(stops, stopTranslation, stopsTranslation);
  return (
    <section className="justify-center flex flex-col mr-2 shrink-0 items-end lg:items-start">
      <div className="flex items-center gap-1">
        <IconWrapper size={16}>
          <ClockIcon />
        </IconWrapper>
        <Paragraph size="xs" fontWeight="semibold">
          {duration}
        </Paragraph>
      </div>
      <div className="flex text-dark-700 items-center">
        <Paragraph size="xxs">
          {stops} {stopsLabel}
        </Paragraph>
      </div>
    </section>
  );
};
export default DurationAndStops;
