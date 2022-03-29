import React, { useState } from 'react';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

const ExtendedSearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const category = useCategory(searchType);

  const [isReading, setIsReading] = useState(false);

  const readStateSearchForm = category?.readStateSearchForm;
  const searchForm = category?.searchForm;

  const injectableProps = {
    setIsReading: setIsReading,
  };

  const readStateSearchFormWithProps = injectProps(
    readStateSearchForm,
    injectableProps,
  );

  const searchFormWithProps = injectProps(searchForm, injectableProps);

  return isReading ? readStateSearchFormWithProps : searchFormWithProps;
};

export default ExtendedSearchCategoryForm;
