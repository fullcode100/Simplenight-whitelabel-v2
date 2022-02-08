import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';
import Menu from './components/Menu/Menu';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.root}>
    <section>Logo</section>
    <Menu />
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
