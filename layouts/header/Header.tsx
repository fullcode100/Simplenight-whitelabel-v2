import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

import ImagePlaceHolder from 'public/icons/assets/image-placeholder.svg';
import HamburgerMenuButton from 'public/icons/assets/hamburger-menu-button.svg';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';
import { useEffect, useState } from 'react';
import { setHomepageScrollHandler } from 'store/actions/core';
import { useDispatch } from 'react-redux';

const Header = () => {
  const scrollStyle = 'bg-white';
  const normalStyle = 'bg-transparent';

  const [bgClass, setBgClass] = useState(normalStyle);

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

  return (
    <header
      className={`flex items-center justify-between pt-16 pb-8 px-4 h-[60px] z-10 ${bgClass} fixed w-full`}
    >
      <HamburgerMenuButton className="mr-2 cursor-pointer" />
      <section className="flex gap-5 items-center">
        <ImagePlaceHolder />
        <span className="font-lato tracking-widest text-sm uppercase">
          Simplenight <span className="text-[8px] align-super ml-[-2px]">®</span>
        </span>
      </section>
      <section className="flex justify-between items-center gap-2 border-2 px-2 py-2 rounded-10">
        <span className="text-dark-1000 font-bold text-sm font-lato">1</span>
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
