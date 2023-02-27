/* eslint-disable @next/next/no-img-element */
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';
import { useQuery as useReactQuery } from '@tanstack/react-query';

import HamburgerMenuButton from 'public/icons/assets/hamburger-menu-button.svg';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';
import { useState, useEffect } from 'react';
import { getCart } from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Menu from './components/Menu/Menu';
import Link from 'next/link';
import HeaderDesktop from './components/Menu/HeaderDesktop';
import ItineraryOverlay from '../../components/itinerary/ItineraryOverlay/ItineraryOverlay';
import useModal from 'hooks/layoutAndUITooling/useModal';
import { useSettings } from 'hooks/services/useSettings';
import { CartObjectResponse } from 'types/cart/CartType';

interface HeaderProps {
  color: string;
}

const Header = ({ color }: HeaderProps) => {
  const [isOpen, onOpen, onClose] = useModal();

  const { data: brandConfig } = useSettings();
  const { images } = brandConfig;
  const { logo } = images || {};

  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState<CartObjectResponse>();
  const [t, i18next] = useTranslation('global');
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  const fetchCart = async () => {
    try {
      const data = await getCart(i18next);
      if (data?.status === 'BOOKED' || !data) {
        localStorage.removeItem('cart');
        setCartQty(0);
      } else if (data) {
        setCartQty(data.total_item_qty);
        setCart(data);
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const { data } = useReactQuery(['get-cart'], fetchCart, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <ItineraryOverlay isOpen={isOpen} onClose={onClose} cart={cart} />
      <FullScreenModal
        open={openMenu}
        closeModal={handleCloseMenu}
        title="Simplenight"
        primaryButtonAction={handleCloseMenu}
        noFooter={true}
        noHeader={true}
        className="max-w-[90%] lg:hidden"
      >
        <div className="fixed inset-0 z-10 w-full h-full bg-black/25"></div>
        <Menu onCloseModal={handleCloseMenu} />
      </FullScreenModal>
      <header
        className={`flex items-center justify-between p-3 z-20 ${color} fixed w-full lg:hidden`}
      >
        <HamburgerMenuButton
          className="mr-2 cursor-pointer"
          onClick={handleOpenMenu}
        />
        <section className="flex items-center gap-5">
          <Link href={'/'}>
            <a>
              <img
                src={logo}
                alt="Branch Logo"
                className="object-contain h-9"
              />
            </a>
          </Link>
        </section>
        <button onClick={onOpen}>
          <section className="flex items-center justify-between gap-2 px-2 py-1 bg-white border rounded w-14 border-dark-300">
            <span className="text-sm font-semibold text-dark-1000 font-lato">
              {cartQty ?? 0}
            </span>
            <ShoppingCart className="text-primary-1000" />
          </section>
        </button>
      </header>
      <HeaderDesktop color={color} cartQty={cartQty} onOpen={onOpen} />
    </>
  );
};

const HeaderBrandingHoc = ({ color }: HeaderProps) => {
  return (
    <BrandingHOC brand="" path={'layout/Header'}>
      <Header color={color} />
    </BrandingHOC>
  );
};
export default HeaderBrandingHoc;
