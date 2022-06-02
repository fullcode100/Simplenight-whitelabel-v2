import React, { useState } from 'react';
import type { NextPage } from 'next';
import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';
import SecondaryCategorySearchOptions from 'components/global/SecondaryCategorySearchOptions/SecondaryCategorySearchOptions';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { tabsMock } from 'mocks/tabsMock';
import { Tab } from 'components/global/Tabs/types';

const Search: NextPage = () => {
  const { type } = useQuery();
  const [internalSearchType, setInternalSearchType] = useState(
    (type as unknown as string) ?? '',
  );

  const handleTabClick = (tab: Tab, setActiveTab: (tab: Tab) => void) => {
    setInternalSearchType(tab.value.toLowerCase());
    setActiveTab(tab);
  };

  return (
    <main>
      <header className="flex flex-col bg-dark-100 border-y border-dark-300 pt-2 fixed z-10 w-full">
        <HorizontalTabs
          tabs={tabsMock}
          onClick={handleTabClick}
          primary
          className="mt-1 px-4"
        />

        <ExtendedSearchCategoryForm searchType={internalSearchType} />
        <SecondaryCategorySearchOptions searchType={internalSearchType} />
      </header>
      <section className="pt-[160px] pb-6">
        <SearchResultDisplay searchType={internalSearchType} />
      </section>
    </main>
  );
};

export default Search;
