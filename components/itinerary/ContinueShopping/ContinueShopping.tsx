import useCategories from 'hooks/category/useCategories';
import { createRef, Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBrandConfig } from '../../../hooks/branding/useBrandConfig';
import CategoryList from './components/CategoryList';

const ContinueShopping = ({
  setContinueHeight,
}: {
  setContinueHeight: Dispatch<SetStateAction<number>>;
}) => {
  const [t, i18next] = useTranslation('global');
  const continueShoppingTitle = t('continueShopping', 'Continue Shopping');

  const categoriesTabs = useCategories();

  const continueRef = createRef<HTMLElement>();
  useEffect(() => {
    setContinueHeight(continueRef.current?.offsetHeight ?? 0);
  }, [continueRef, setContinueHeight]);

  return (
    <section className="py-6 space-y-6 bg-dark-100" ref={continueRef}>
      <section className="w-full mx-auto max-w-7xl">
        <h4 className="px-5 text-lg font-semibold text-dark-800">
          {continueShoppingTitle}
        </h4>
        <CategoryList categoryList={categoriesTabs} />
      </section>
    </section>
  );
};

export default ContinueShopping;
