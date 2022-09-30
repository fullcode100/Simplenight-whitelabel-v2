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
  const [activeTab, setActiveTab] = useState<Tab>(tabsMock[0]);

  const handleTabClick = (tab: Tab) => {
    setInternalSearchType(tab.value.toLowerCase());
    setActiveTab(tab);
  };

  return (
    <>
      <main>
        <header className="fixed z-20 flex flex-col w-full pt-2 bg-dark-100 border-y border-dark-300 lg:hidden">
          <HorizontalTabs
            tabs={tabsMock}
            activeTab={activeTab}
            onClick={handleTabClick}
            primary
            className="px-4 mt-1"
          />

          <ExtendedSearchCategoryForm searchType={internalSearchType} />
          <SecondaryCategorySearchOptions searchType={internalSearchType} />
        </header>
        <section className="hidden w-full px-20 py-10 border-b lg:block bg-dark-100 border-dark-300">
          <section className="mx-auto max-w-7xl">
            <SearchCategoryForm searchType={searchType} />
          </section>
        </section>
        <section className="pt-[153px] lg:pt-0 lg:w-full lg:px-20">
          <section className="mx-auto max-w-7xl">
            <SearchResultDisplay searchType={internalSearchType} />
          </section>
        </section>
      </main>
    </>
  );
};

export default Search;
