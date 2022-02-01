import Menu from './components/Menu/Menu';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <section>Logo</section>
      <Menu />
    </header>
  );
};

export default Header;
