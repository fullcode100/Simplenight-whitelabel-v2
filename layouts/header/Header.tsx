import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

import ImagePlaceHolder from 'public/icons/assets/image-placeholder.svg';
import HamburgerMenuButton from 'public/icons/assets/hamburger-menu-button.svg';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';
import { useEffect, useState } from 'react';
import { setHomepageScrollHandler } from 'store/actions/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getCart } from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const state = useSelector((state: RootState) => state);
  const scrollStyle = 'bg-white';
  const normalStyle = 'bg-transparent';

  const [bgClass, setBgClass] = useState(normalStyle);
  const [cartQty, setCartQty] = useState(0);
  const [t, i18next] = useTranslation('global');

  const dispatch = useDispatch();

  const handleScroll = (event: Event) => {
    const hasScrolled =
      (event.target as HTMLDivElement)?.children[0]?.scrollTop > 0;
    if (hasScrolled) {
      setBgClass(scrollStyle);
      return;
    }

    setBgClass(normalStyle);
  };

  useEffect(() => {
    dispatch(setHomepageScrollHandler(handleScroll));
    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (state.cartStore) {
      getCart(i18next, state).then((cart) => {
        if (cart) {
          setCartQty(cart.total_item_qty);
        }
      });
    }
  }, [state.cartStore]);

  return (
    <header
      className={`flex items-center justify-between pt-16 pb-8 px-4 h-[60px] z-20 ${bgClass} fixed w-full`}
    >
      <HamburgerMenuButton className="mr-2 cursor-pointer" />
      <section className="flex gap-5 items-center">
        <ImagePlaceHolder />
        <span className="font-lato tracking-widest text-sm uppercase">
          Simplenight{' '}
          <span className="text-[8px] align-super ml-[-2px]">®</span>
        </span>
      </section>
      <section className="flex justify-between items-center gap-2 border-2 px-2 py-2 rounded-10">
        <span className="text-dark-1000 font-bold text-sm font-lato">
          {cartQty ?? 0}
        </span>
        <ShoppingCart className="text-primary-1000" />
      </section>
    </header>
  );
};

const HeaderBrandingHoc = () => {
  const { brandCode } = useBrandConfig();

  return (
    <BrandingHOC brand={brandCode} path={'layout/Header'}>
      <Header />
    </BrandingHOC>
  );
};

export default HeaderBrandingHoc;
