import CategorySelect from './CategorySelect';
import LanguageSelect from 'components/global/LanguageSelect/LanguageSelect';
import TitleDrop from 'components/global/TitleDrop/TitleDrop';

const Menu = () => {
  return (
    <section className="p-4">
      <section className="mb-2">
        <CategorySelect />
      </section>
      <TitleDrop title="Languages">
        <LanguageSelect />
      </TitleDrop>
    </section>
  );
};

export default Menu;
