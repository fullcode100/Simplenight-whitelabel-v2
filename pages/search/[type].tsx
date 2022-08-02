import React, { useState } from 'react';
import type { NextPage } from 'next';
import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';
import SecondaryCategorySearchOptions from 'components/global/SecondaryCategorySearchOptions/SecondaryCategorySearchOptions';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { tabsMock } from 'mocks/tabsMock';
import { Tab } from 'components/global/Tabs/types';
import SearchCategoryForm from 'components/global/SearchCategoryForm/SearchCategoryForm';

const Search: NextPage = () => {
  const { type } = useQuery();
  const [internalSearchType, setInternalSearchType] = useState(
    (type as unknown as string) ?? '',
  );
  const [searchType, setSearchType] = useState('hotels');

  const handleTabClick = (tab: Tab, setActiveTab: (tab: Tab) => void) => {
    setInternalSearchType(tab.value.toLowerCase());
    setActiveTab(tab);
  };

  return (
    <main>
      <header className="flex flex-col bg-dark-100 border-y border-dark-300 pt-2 fixed z-20 w-full lg:hidden">
        <HorizontalTabs
          tabs={tabsMock}
          onClick={handleTabClick}
          primary
          className="mt-1 px-4"
        />

        <ExtendedSearchCategoryForm searchType={internalSearchType} />
        <SecondaryCategorySearchOptions searchType={internalSearchType} />
      </header>
      <section className="hidden lg:block w-full px-20 py-10 bg-dark-100 border-b border-dark-300">
        <SearchCategoryForm searchType={searchType} />
      </section>
      <section className="pt-[153px] lg:pt-0 lg:w-full lg:px-20">
        <SearchResultDisplay searchType={internalSearchType} />
      </section>
    </main>
  );
};

export default Search;
