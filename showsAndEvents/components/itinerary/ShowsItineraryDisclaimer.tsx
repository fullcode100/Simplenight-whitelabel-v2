import { Item } from 'types/cart/CartType';
import Tag from 'public/icons/assets/tag.svg';

interface ShowsItineraryDisclaimerProps {
  item: Item;
}

interface BoldProps {
  children: React.ReactNode;
}

const ShowsItineraryDisclaimer = ({ item }: ShowsItineraryDisclaimerProps) => {
  return (
    <section className="border-b border-green-300 bg-green-100 rounded-t px-5">
      <section className="flex items-center gap-2 py-1 pl-1.5 pr-1 text-green-1000">
        <section className="mt-1">
          <Tag />
        </section>
        <section className="text-green-1000 text-xs lg:flex lg:gap-1">
          <p>Check Out Now to avoid rate changes</p>
        </section>
      </section>
    </section>
  );
};

export default ShowsItineraryDisclaimer;
