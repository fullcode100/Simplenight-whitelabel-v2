import React from 'react';
import type { NextPage } from 'next';
import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';
import SecondaryCategorySearchOptions from 'components/global/SecondaryCategorySearchOptions/SecondaryCategorySearchOptions';

const Search: NextPage = () => {
  const { type } = useQuery();

  return (
    <main>
      <header className="border-b-[1px] pb-2">
        <ExtendedSearchCategoryForm searchType={type as unknown as string} />
        <SecondaryCategorySearchOptions
          searchType={type as unknown as string}
        />
      </header>
      <SearchResultDisplay searchType={type as unknown as string} />
    </main>
  );
};

export default Search;
