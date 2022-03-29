import React from 'react';
import type { NextPage } from 'next';
import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import SearchCategoryForm from 'components/global/SearchCategoryForm/SearchCategoryForm';
import ReadStateSearchCategoryForm from 'components/global/ReadStateSearchCategoryForm/ReadStateSearchCategoryForm';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';

const Search: NextPage = () => {
  const { type } = useQuery();

  return (
    <main>
      {/* TODO: Add a wrapper that calls both the category form or a display form in order to reuse this component if possible */}
      {/* <ReadStateSearchCategoryForm
        searchType={(type as unknown as string) ?? ''}
      />
      <SearchCategoryForm searchType={(type as unknown as string) ?? ''} /> */}
      <ExtendedSearchCategoryForm searchType={type as unknown as string} />
      <SearchResultDisplay searchType={type as unknown as string} />
    </main>
  );
};

export default Search;
