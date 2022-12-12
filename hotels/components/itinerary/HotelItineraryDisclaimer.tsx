import { Item } from 'types/cart/CartType';
import ExclamationIcon from 'public/icons/assets/exclamation.svg';

interface HotelItineraryDisclaimerProps {
  item: Item;
}

interface BoldProps {
  children: React.ReactNode;
}

const HotelItineraryDisclaimer = ({ item }: HotelItineraryDisclaimerProps) => {
  const oldPrice = '$100.00';
  const newPrice = '$115.64';
  const Bold = ({ children }: BoldProps) => (
    <span className="font-bold">{children}</span>
  );
  return (
    <section className="bg-warning-100 text-warning-600 px-5 py-3 text-sm flex gap-3 items-center">
      <section className="width-[16.67px] height-[16.67px]">
        <ExclamationIcon />
      </section>
      <section>
        Price has changed from <Bold>{oldPrice}</Bold> to{' '}
        <Bold>{newPrice}</Bold>
      </section>
    </section>
  );
};

export default HotelItineraryDisclaimer;
