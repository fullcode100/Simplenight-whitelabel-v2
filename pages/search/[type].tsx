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
      <header className="flex flex-col border-b-[1px] pb-2">
        <HorizontalTabs
          tabs={tabsMock}
          onClick={handleTabClick}
          primary
          className="mt-24 px-4"
        />

        <ExtendedSearchCategoryForm searchType={internalSearchType} />
        <SecondaryCategorySearchOptions searchType={internalSearchType} />
      </header>
      <SearchResultDisplay searchType={internalSearchType} />
    </main>
  );
};

export default Search;
