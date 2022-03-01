import React from 'react';
import type { NextPage } from 'next';
import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';

const Search: NextPage = () => {
  const { type } = useQuery();

  return (
    <main>
      <SearchResultDisplay searchType={type as unknown as string} />
    </main>
  );
};

export default Search;
