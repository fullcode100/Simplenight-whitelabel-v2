import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import useQuery from 'hooks/pageInteraction/useQuery';
import { getStoreCartId } from 'store/selectors/cart';
import { CartObjectResponse } from 'types/cart/CartType';
import { getCartId } from 'core/client/services/CartClientService';
import ItineraryHeader from 'components/itinerary/ItineraryHeader/ItineraryHeader';
import ItineraryEmpty from 'components/itinerary/ItineraryEmpty/ItineraryEmpty';
import ItineraryItemList from 'components/itinerary/ItineraryItemList/ItineraryItemList';
import ListFooter from '../components/itinerary/ListFooter/ListFooter';
import ListHeader from '../components/itinerary/ListHeader/ListHeader';
import ContinueShopping from '../components/itinerary/ContinueShopping/ContinueShopping';
import classnames from 'classnames';

const Itinerary: NextPage = () => {
  const [cart, setCart] = useState<CartObjectResponse | undefined>(undefined);
  const [cartId, setCartId] = useState('');
  const [reload, setReload] = useState(false);
  const [t, i18next] = useTranslation('global');
  const footerContainerRef = useRef(null);
  const [staticFooter, setStaticFooter] = useState(false);
  const cartIdParams = useQuery().cartId;
  const cartIdStore = getStoreCartId();

  useEffect(() => {
    setCartId(cartIdParams || cartIdStore);
  }, [cartIdParams, cartIdStore]);

  useEffect(() => {
    if (cartId) {
      getCartId(i18next, cartId).then((response) => {
        setCart(response);
      });
    }
  }, [cartId, i18next, reload]);

  useEffect(() => {
    if (footerContainerRef.current) {
      const onChange = (entries: any) => {
        const isShow = entries[0].isIntersecting;
        setStaticFooter(isShow);
      };
      const observer = new IntersectionObserver(onChange);

      observer.observe(footerContainerRef.current);
    }
  }, []);

  const hasItems = (cart?.total_item_qty ?? 0) > 0;

  return (
    <main>
      <header>
        <ItineraryHeader productsAmount={cart?.total_item_qty} />
      </header>

      <section>
        {!hasItems && <ItineraryEmpty />}

        {hasItems && <ListHeader />}
        {hasItems && (
          <ItineraryItemList
            cart={cart}
            reload={reload}
            setReload={setReload}
          />
        )}
      </section>

      <aside>
        <section ref={footerContainerRef}>
          {cart && (
            <ListFooter
              totalAmount={cart?.total_amount}
              className={classnames({ 'fixed bottom-0 z-30': !staticFooter })}
            />
          )}
          <ContinueShopping />
        </section>
      </aside>
    </main>
  );
};

export default Itinerary;
