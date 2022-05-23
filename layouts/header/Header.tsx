import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

import ImagePlaceHolder from 'public/icons/assets/image-placeholder.svg';
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

interface HeaderProps {
  color: string;
}

const Header = ({ color }: HeaderProps) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [cartQty, setCartQty] = useState(0);
  const [t, i18next] = useTranslation('global');
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  useEffect(() => {
    if (!state.cartStore) {
      return;
    }
    getCart(i18next, state).then((cart) => {
      if (cart?.status === 'BOOKED') {
        localStorage.removeItem('cart');
        dispatch(clearCart());
      } else if (cart) {
        setCartQty(cart.total_item_qty);
      }
    });
  }, [state.cartStore]);

  return (
    <header
      className={`flex items-center justify-between pt-16 pb-8 px-4 h-[60px] z-20 ${color} fixed w-full`}
    >
      <HamburgerMenuButton
        className="mr-2 cursor-pointer"
        onClick={handleOpenMenu}
      />
      <FullScreenModal
        open={openMenu}
        closeModal={handleCloseMenu}
        title="Simplenight"
        primaryButtonAction={handleCloseMenu}
        noFooter={true}
      >
        <Menu />
      </FullScreenModal>
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

const HeaderBrandingHoc = ({ color }: HeaderProps) => {
  const { brandCode } = useBrandConfig();

  return (
    <BrandingHOC brand={brandCode} path={'layout/Header'}>
      <Header color={color} />
    </BrandingHOC>
  );
};

export default HeaderBrandingHoc;
