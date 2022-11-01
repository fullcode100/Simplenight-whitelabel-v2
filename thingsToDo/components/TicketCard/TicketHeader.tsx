import SeeMoreText from 'components/global/SeeMoreText/SeeMoreText';

interface TicketHeaderProps {
  title: string;
  description: string;
}

const TicketHeader = ({ title, description }: TicketHeaderProps) => {
  return (
    <section className="p-4 text-dark-1000">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs font-normal">
        <SeeMoreText text={description} length={72} />
      </p>
    </section>
  );
};

export default TicketHeader;
