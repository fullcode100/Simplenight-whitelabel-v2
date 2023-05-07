import { Paragraph } from '@simplenight/ui';
import CalendarIcon from 'public/icons/assets/calendar.svg';
interface CalenadarInfoProps {
  date?: string;
  time?: string;
  compact?: boolean;
}

const CalendarInfo = ({ date, time, compact }: CalenadarInfoProps) => {
  return (
    <section className="flex flex-row gap-2">
      <CalendarIcon className="h-3.5 lg:h-4 lg:w-4 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
      <Paragraph
        size="small"
        fontWeight="semibold"
        className={compact ? 'max-w-[268px]' : ''}
      >
        {date}
        {time}
      </Paragraph>
    </section>
  );
};

export default CalendarInfo;
