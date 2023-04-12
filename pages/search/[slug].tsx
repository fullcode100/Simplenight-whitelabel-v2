import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import classnames from 'classnames';

import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';
import { Tab } from 'components/global/Tabs/types';
import SearchCategoryForm from 'components/global/SearchCategoryForm/SearchCategoryForm';
import useCategories from 'hooks/category/useCategories';
import useDisplayCategory from 'hooks/category/useDisplayCategory';
import useScrollDirection from 'hooks/layoutAndUITooling/useScrollDirection';

const Search: NextPage = () => {
  const { slug } = useQuery();

  const multipleCategories = useDisplayCategory();
  const categoriesTabs = useCategories();
  const scrollDirection = useScrollDirection();

  const activeTabIndex = categoriesTabs.findIndex((tab) => tab.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>(
    categoriesTabs?.[activeTabIndex],
  );

  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    setActiveTab(categoriesTabs[activeTabIndex]);
    setSearchType(
      categoriesTabs[activeTabIndex]?.type === 'transportation' &&
        categoriesTabs[activeTabIndex]?.slug
        ? categoriesTabs[activeTabIndex]?.slug
        : categoriesTabs[activeTabIndex]?.type,
    );
  }, [categoriesTabs.length > 0]);

  return (
    <>
      <div className="z-20 w-full pt-[60px] lg:pt-0">
        <section className="py-3 lg:hidden bg-dark-100 border-dark-300">
          <ExtendedSearchCategoryForm searchType={searchType} />
        </section>
        <section className="hidden w-full px-20 pt-6 pb-10 lg:block bg-dark-100 border-dark-300">
          <section className="mx-auto max-w-7xl">
            <SearchCategoryForm activeTab={activeTab} />
          </section>
        </section>
      </div>
      <main>
        <section className="lg:w-full lg:px-20">
          <section className="mx-auto max-w-7xl ">
            <SearchResultDisplay searchType={searchType} />
          </section>
        </section>
      </main>
    </>
  );
};

export default Search;
