import CategorySelect from './CategorySelect';
import LanguageSelect from 'components/global/LanguageSelect/LanguageSelect';
import TitleDrop from 'components/global/TitleDrop/TitleDrop';
import CurrencySelect from 'components/global/CurrencySelect/CurrencySelect';
import Divider from 'components/global/Divider/Divider';

const Menu = () => {
  return (
    <section className="p-4">
      <section className="mb-2">
        <CategorySelect />
      </section>
      <TitleDrop title="Language">
        <LanguageSelect />
      </TitleDrop>
      <Divider className="py-8" />
      <TitleDrop title="Currency">
        <CurrencySelect />
      </TitleDrop>
    </section>
  );
};

export default Menu;
