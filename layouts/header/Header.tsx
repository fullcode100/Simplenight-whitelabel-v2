/* eslint-disable react-hooks/exhaustive-deps */
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
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import useScrollDirection from 'hooks/layoutAndUITooling/useScrollDirection';
import { Tab } from 'components/global/Tabs/types';
import useCategories, { CategoryInfo } from 'hooks/category/useCategories';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useRouter } from 'next/router';
import { useTabStore } from 'hooks/layoutAndUITooling/useTabStore';
import { hasCartMode } from 'helpers/purchaseModeUtils';
import Authentication, { IAuthModalType } from 'profiles/authentication';

interface HeaderProps {
  color: string;
}

const Header = ({ color }: HeaderProps) => {
  const [isOpen, onOpen, onClose] = useModal();

  const { data: brandConfig } = useSettings();
  const { images } = brandConfig;
  const { logo } = images || {};

  const [openAuth, setOpenAuth] = useState(false);
  const [authType, setAuthType] = useState<IAuthModalType>('login');
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState<CartObjectResponse>();
  const [t, i18next] = useTranslation('global');
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);
  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setTab);
  const { pathname } = useRouter();
  const query = useQuery();
  const { slug } = query;
  const setQueryParams = useQuerySetter();
  const categoriesTabs = useCategories();
  const activeTabIndex = categoriesTabs.findIndex((tab) => tab.slug === slug);
  const handleTabClick = (tab: Tab | CategoryInfo) => {
    if (pathname.startsWith('/search')) {
      setQueryParams({
        slug: tab.slug ?? '',
      });
    }
    if (pathname === '/') {
      setTab(tab);
    }
    handleCloseMenu();
  };
  const scrollDirection = useScrollDirection();
  const showCart = hasCartMode();

  useEffect(() => {
    setTab(categoriesTabs?.[activeTabIndex]);
  }, [activeTabIndex]);

  const fetchCart = async () => {
    try {
      const data = await getCart(i18next);
      if (data?.status === 'BOOKED' || !data) {
        localStorage.removeItem('cart');
        setCartQty(0);
        return null;
      } else {
        setCartQty(data.total_item_qty);
        setCart(data);
        return data;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const { data } = useReactQuery(['get-cart'], fetchCart, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });

  const handleOpenAuthModal = (type: IAuthModalType) => {
    setOpenAuth(!openAuth);
    setAuthType(type);
  };

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
        <Menu
          activeTab={tab ? tab : categoriesTabs?.[0]}
          handleTabClick={handleTabClick}
          onCloseModal={handleCloseMenu}
          openAuth={handleOpenAuthModal}
        />
      </FullScreenModal>
      <header
        className={
          'flex items-center justify-between p-3 z-40 bg-header fixed w-full lg:hidden'
        }
      >
        <HamburgerMenuButton
          className="mr-2 text-dark-1000 cursor-pointer"
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
        {showCart ? (
          <button onClick={onOpen} className="relative w-8 h-8 gap-2 px-2 py-1">
            <span className="absolute w-4 h-4 font-semibold text-dark-1000 rounded-full text-p-xxs bg-primary-1000 -top-px font-lato">
              {cartQty ?? 0}
            </span>
            <ShoppingCart className="text-dark-1000" />
          </button>
        ) : (
          <>&nbsp;</>
        )}
      </header>
      <HeaderDesktop
        color={color}
        cartQty={cartQty}
        onOpen={onOpen}
        openAuth={handleOpenAuthModal}
      />
      {(pathname === '/' || pathname.startsWith('/search')) && (
        <HorizontalTabs
          tabs={categoriesTabs}
          activeTab={tab ? tab : categoriesTabs?.[0]}
          onClick={handleTabClick}
          className={`${
            scrollDirection === 'down'
              ? '-top-4 lg:top-0'
              : 'top-[60px] lg:top-[76px]'
          } transition-all duration-500`}
          primary
        />
      )}
      <Authentication
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        type={authType}
        setAuthType={setAuthType}
        query={query}
      />
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
