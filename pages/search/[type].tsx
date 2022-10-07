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
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

const Search: NextPage = () => {
  const { type } = useQuery();
  const setQueryParams = useQuerySetter();

  const [searchType, setSearchType] = useState(
    (type as unknown as string) ?? 'hotels',
  );

  const activeTabIndex = tabsMock.findIndex(
    (tab) => tab.value.toLowerCase() === searchType.replace(/-/g, ' '),
  );

  const [activeTab, setActiveTab] = useState<Tab>(tabsMock[activeTabIndex]);

  const handleTabClick = (tab: Tab) => {
    setSearchType(tab.value.toLowerCase());
    setActiveTab(tab);
    setQueryParams({
      type: tab.value.toLowerCase().replace(/ /g, '-'),
    });
  };

  return (
    <>
      <main>
        <header className="fixed z-20 flex flex-col w-full pt-2 bg-dark-100 border-y border-dark-300">
          <HorizontalTabs
            tabs={tabsMock}
            activeTab={activeTab}
            onClick={handleTabClick}
            primary
            className="px-4 mt-1"
          />

          <section className="lg:hidden">
            <ExtendedSearchCategoryForm searchType={searchType} />
            <SecondaryCategorySearchOptions searchType={searchType} />
          </section>
          <section className="hidden w-full px-20 pb-10 border-b lg:block bg-dark-100 border-dark-300">
            <section className="mx-auto max-w-7xl">
              <SearchCategoryForm searchType={searchType} />
            </section>
          </section>
        </header>
        <section className="pt-[153px] lg:pt-[205px] lg:w-full lg:px-20">
          <section className="mx-auto max-w-7xl">
            <SearchResultDisplay searchType={searchType} />
          </section>
        </section>
      </main>
    </>
  );
};

export default Search;
