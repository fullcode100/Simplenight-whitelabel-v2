import SeeMoreText from 'components/global/SeeMoreText/SeeMoreText';
import { Paragraph } from '@simplenight/ui';

interface TicketHeaderProps {
  title: string;
  description: string;
}

const TicketHeader = ({ title, description }: TicketHeaderProps) => {
  return (
    <section className="p-4 text-dark-1000">
      <Paragraph size="large" fontWeight="semibold">
        {title}
      </Paragraph>
      <Paragraph className="text-xs font-normal">
        <SeeMoreText text={description} length={72} />
      </Paragraph>
    </section>
  );
};

export default TicketHeader;
