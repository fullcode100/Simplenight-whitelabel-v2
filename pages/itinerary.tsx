import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import useQuery from 'hooks/pageInteraction/useQuery';
import { CartObjectResponse } from 'types/cart/CartType';
import { getCartId } from 'core/client/services/CartClientService';
import ItineraryHeader from 'components/itinerary/ItineraryHeader/ItineraryHeader';
import ItineraryEmpty from 'components/itinerary/ItineraryEmpty/ItineraryEmpty';

const Itinerary: NextPage = () => {
  const [cart, setCart] = useState<CartObjectResponse | undefined>(undefined);
  const [t, i18next] = useTranslation('global');

  const { cartId } = useQuery();

  useEffect(() => {
    if (cartId) {
      getCartId(i18next, cartId).then((response) => {
        setCart(response);
      });
    }
  }, [cartId, i18next]);

  const hasItems = (cart?.items?.length ?? 0) > 0;

  return (
    <main>
      <header>
        <ItineraryHeader productsAmount={cart?.total_item_qty} />
      </header>
      <section className="p-5">{!hasItems && <ItineraryEmpty />}</section>
      <section></section>
      <aside></aside>
    </main>
  );
};

export default Itinerary;
