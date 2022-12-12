/* eslint-disable @next/next/no-img-element */
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

import HamburgerMenuButton from 'public/icons/assets/hamburger-menu-button.svg';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getCart } from 'core/client/services/CartClientService';
import { useTranslation } from 'react-i18next';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Menu from './components/Menu/Menu';
import { clearCart } from 'store/actions/cartActions';
import Link from 'next/link';
import HeaderDesktop from './components/Menu/HeaderDesktop';
import ItineraryOverlay from '../../components/itinerary/ItineraryOverlay/ItineraryOverlay';
import useModal from 'hooks/layoutAndUITooling/useModal';
import { CartObjectResponse } from '../../types/cart/CartType';

interface HeaderProps {
  color: string;
}

interface HeaderButtonProps {
  children?: any;
  onClick?: () => void;
}

const Header = ({ color }: HeaderProps) => {
  const [isOpen, onOpen, onClose] = useModal();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };

  const { images } = useBrandConfig() || {};
  const { logo } = images || {};

  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState<CartObjectResponse>();
  const [t, i18next] = useTranslation('global');
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  useEffect(() => {
    if (!state.cartStore) {
      return;
    }
    getCart(i18next, store)
      .then((cart) => {
        if (cart?.status === 'BOOKED') {
          localStorage.removeItem('cart');
          dispatch(clearCart());
        } else if (cart) {
          setCartQty(cart.total_item_qty);
          setCart(cart);
        }
      })
      .catch((error) => console.error(error));
  }, [state.cartStore]);

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
                width="94px"
                height="36px"
                className="object-fit"
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
