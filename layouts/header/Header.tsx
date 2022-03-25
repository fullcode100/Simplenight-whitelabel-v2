import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

import ImagePlaceHolder from 'public/icons/assets/image-placeholder.svg';
import HamburgerMenuButton from 'public/icons/assets/hamburger-menu-button.svg';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';

const Header = () => (
  <header className="flex items-center relative justify-between pt-16 pb-8 px-4 h-[60px] z-10">
    <section className="flex gap-5 items-center">
      <ImagePlaceHolder />
      <span className="text-base">Simplenight</span>
    </section>
    <section className="flex gap-5 items-center">
      <section className="flex justify-between items-center gap-2 border-2 px-2 py-2 rounded-10">
        <span className="text-dark-1000 font-bold text-sm font-lato">1</span>
        <ShoppingCart className="text-primary-1000" />
      </section>
      <HamburgerMenuButton className="mr-2 cursor-pointer" />
    </section>
  </header>
);

const HeaderBrandingHoc = () => {
  const { brandCode } = useBrandConfig();

  return (
    <BrandingHOC brand={brandCode} path={'layout/Header'}>
      <Header />
    </BrandingHOC>
  );
};

export default HeaderBrandingHoc;
