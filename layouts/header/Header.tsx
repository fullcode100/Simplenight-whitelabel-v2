import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

import ImagePlaceHolder from 'public/icons/assets/image-placeholder.svg';
import HamburgerMenuButton from 'public/icons/assets/hamburger-menu-button.svg';

const Header = () => (
  <header className="flex items-center relative justify-between py-[20px] px-4 h-[60px] z-10">
    <section className="flex gap-5 items-center">
      <ImagePlaceHolder />
      <span className="text-base">Simplenight</span>
    </section>
    <HamburgerMenuButton className="mr-2 cursor-pointer" />
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
