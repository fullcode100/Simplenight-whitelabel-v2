import Divider from 'components/global/Divider/Divider';
import TicketHeader from './TicketHeader';

const TicketCard = () => {
  return (
    <section className="border border-dark-300 rounded">
      <TicketHeader
        title={'All Access Premium Pass'}
        description={
          '{brief expandable description of the ticket type provided by the vendor. Rhoncus ante nunc tincidunt gravida lacinia posuere sed. Vivamus nullam urna sed neque.}'
        }
      />
      <Divider />
    </section>
  );
};

export default TicketCard;
