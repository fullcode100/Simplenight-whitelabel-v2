import { useTranslation } from 'react-i18next';
import { useBrandConfig } from '../../../hooks/branding/useBrandConfig';
import CategoryList from './components/CategoryList';

const ContinueShopping = () => {
  const [t, i18next] = useTranslation('global');
  const continueShoppingTitle = t('continueShopping', 'Continue Shopping');
  const { features } = useBrandConfig();

  const allCategories = Object.entries(features);
  const filterCategories = allCategories.filter(
    ([key, value]) => value == true,
  );

  return (
    <section className="py-6 bg-dark-100 space-y-6">
      <h4 className="px-5 font-semibold text-dark-800 text-lg">
        {continueShoppingTitle}
      </h4>
      <CategoryList categoryList={filterCategories} />
    </section>
  );
};

export default ContinueShopping;
