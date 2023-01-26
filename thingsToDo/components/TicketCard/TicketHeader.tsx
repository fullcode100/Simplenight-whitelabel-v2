import SeeMoreText from 'components/global/SeeMoreText/SeeMoreText';
import Paragraph from 'components/global/Typography/Paragraph';

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
      <p className="text-xs font-normal">
        <SeeMoreText text={description} length={72} />
      </p>
    </section>
  );
};

export default TicketHeader;
