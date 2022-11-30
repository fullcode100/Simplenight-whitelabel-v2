import React, { useState } from 'react';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import ModalDivider from '../Modal/components/ModalDivider';
import FullScreenModal from '../NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';

const ExtendedSearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const category = useCategory(searchType);
  const [t, i18n] = useTranslation('global');
  const searchLabel = t('search', 'Search');

  const [isSearching, setIsSearching] = useState(false);

  const readStateSearchForm = category?.readStateSearchForm;
  const searchForm = category?.searchForm;

  const injectableProps = {
    setIsSearching,
  };

  const readStateSearchFormWithProps = injectProps(
    readStateSearchForm,
    injectableProps,
  );

  const searchFormWithProps = injectProps(searchForm, {
    ...injectableProps,
    className: 'h-full mt-8 px-5 pb-6',
  });

  return isSearching ? (
    <FullScreenModal
      open={isSearching}
      closeModal={() => setIsSearching(false)}
      title={searchLabel}
      primaryButtonText={searchLabel}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      primaryButtonAction={() => {}}
      noFooter
    >
      <section className="h-full overflow-y-auto px-2 py-2">
        {searchFormWithProps}
      </section>
    </FullScreenModal>
  ) : (
    readStateSearchFormWithProps
  );
};

export default ExtendedSearchCategoryForm;
