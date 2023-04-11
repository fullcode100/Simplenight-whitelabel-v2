/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useQuery as useReactQuery } from '@tanstack/react-query';

import { CartObjectResponse } from 'types/cart/CartType';
import { getCart } from 'core/client/services/CartClientService';
import ItineraryHeader from 'components/itinerary/ItineraryHeader/ItineraryHeader';
import ItineraryItemList from 'components/itinerary/ItineraryItemList/ItineraryItemList';
import ListFooter from '../components/itinerary/ListFooter/ListFooter';
import ListHeader from '../components/itinerary/ListHeader/ListHeader';
import ContinueShopping from '../components/itinerary/ContinueShopping/ContinueShopping';
import classnames from 'classnames';
import Loader from 'components/global/Loader/Loader';
import HelpSection from '../components/global/HelpSection/HelpSection';
import { getCurrency } from 'store/selectors/core';
import { Itinerary as ItineraryIcon } from '@simplenight/ui';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import useMediaViewport from '../hooks/media/useMediaViewport';
import { hasCartMode } from 'helpers/purchaseModeUtils';
import { useRouter } from 'next/router';

const Itinerary: NextPage = () => {
  const [cart, setCart] = useState<CartObjectResponse | undefined>(undefined);
  const router = useRouter();

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [t, i18next] = useTranslation('global');
  const itineraryText = t('itineraryEmpty', 'Add Something To Your Itinerary!');
  const footerContainerRef = useRef(null);
  const [staticFooter, setStaticFooter] = useState(false);
  const currency = getCurrency();
  const showItinerary = hasCartMode();

  const { refetch } = useReactQuery(['get-cart']);

  useEffect(() => {
    const cartId = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '')
      : null;
    if (cartId) {
      setLoading(true);
      getCart(i18next)
        .then((response) => {
          setCart(response);
          setLoading(false);
        })
        .catch((error) => console.error(error));
      refetch();
    }
  }, [i18next, reload, currency]);

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

  const [continueHeight, setContinueHeight] = useState(0);

  const hasItems = (cart?.total_item_qty ?? 0) > 0;

  const { isDesktop } = useMediaViewport();

  useEffect(() => {
    if (!showItinerary) {
      router.replace('/');
    }
  }, []);

  return (
    <main>
      <header>
        <ItineraryHeader productsAmount={cart?.total_item_qty} />
      </header>
      {loading && <Loader />}
      <section
        className={classnames(
          { hidden: loading },
          'px-0 py-0 lg:px-20 lg:py-12 lg:flex lg:gap-8 justify-center',
        )}
      >
        {!hasItems && !loading && (
          <EmptyStateContainer
            text={itineraryText}
            Icon={ItineraryIcon}
            forcedHeight={isDesktop ? continueHeight : undefined}
            width={!isDesktop ? 335 : undefined}
          />
        )}

        {hasItems && (
          <>
            <section className="lg:w-[843px] overflow-hidden lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container">
              <ListHeader />
              <ItineraryItemList
                cart={cart}
                reload={reload}
                setReload={setReload}
              />
            </section>
            <aside className="w-full lg:w-[405px]">
              {cart && (
                <>
                  <section className="lg:hidden" ref={footerContainerRef}>
                    <ListFooter
                      totalAmount={cart?.rate.total.full}
                      className={classnames({
                        'fixed bottom-0 z-30': !staticFooter,
                      })}
                    />
                  </section>
                  <section className="hidden space-y-8 lg:block">
                    <ListFooter
                      totalAmount={cart?.rate.total.full}
                      className="lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container"
                    />
                    <HelpSection inItinerary={true} />
                  </section>
                </>
              )}
            </aside>
          </>
        )}
      </section>
      <ContinueShopping setContinueHeight={setContinueHeight} />
    </main>
  );
};

export default Itinerary;
