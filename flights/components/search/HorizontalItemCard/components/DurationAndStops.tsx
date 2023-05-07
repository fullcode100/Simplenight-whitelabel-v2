import { IconWrapper, Paragraph } from '@simplenight/ui';
import { SegmentInfo } from 'flights/types/response/FlightSearchResponse';
import { SegmentItem } from 'flights/types/response/FlightSearchResponseMS';
import { getDuration } from 'flights/utils';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import ClockIcon from 'public/icons/assets/clock-icon.svg';
import { useTranslation } from 'react-i18next';

const DurationAndStops = ({ segmentInfo }: { segmentInfo: SegmentItem }) => {
  const duration = getDuration(segmentInfo?.totalFlightTimeInMinutes || 0);
  const [t] = useTranslation('flights');
  const stops = segmentInfo.collection ? segmentInfo.collection.length - 1 : 0;
  const stopsTranslation = t('stops', 'Stops');
  const stopTranslation = t('stop', 'Stop');
  const stopsLabel = usePlural(stops, stopTranslation, stopsTranslation);

  return (
    <section className="flex flex-col items-end justify-center mr-2 shrink-0 lg:items-start">
      <div className="flex items-center gap-1">
        <IconWrapper size={16}>
          <ClockIcon />
        </IconWrapper>
        <Paragraph size="xs" fontWeight="semibold">
          {duration}
        </Paragraph>
      </div>
      <div className="flex items-center text-dark-700">
        <Paragraph size="xxs">
          {stops} {stopsLabel}
        </Paragraph>
      </div>
    </section>
  );
};
export default DurationAndStops;
