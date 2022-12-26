import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import classnames from 'classnames';

import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import { Tab } from 'components/global/Tabs/types';
import SearchCategoryForm from 'components/global/SearchCategoryForm/SearchCategoryForm';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useCategories from 'hooks/category/useCategories';
import useDisplayCategory from 'hooks/category/useDisplayCategory';
import HotelSecondarySearchOptions from 'hotels/components/search/HotelSecondarySearchOptions';
import { useFilterHotels } from 'hotels/hooks/useFilterHotels';
import { useSelector } from 'react-redux';

const Search: NextPage = () => {
  const { slug } = useQuery();
  const setQueryParams = useQuerySetter();

  const multipleCategories = useDisplayCategory();
  const categoriesTabs = useCategories();

  const activeTabIndex = categoriesTabs.findIndex((tab) => tab.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>(
    categoriesTabs?.[activeTabIndex],
  );

  const [searchType, setSearchType] = useState('');

  const handleTabClick = (tab: Tab) => {
    setQueryParams({
      slug: tab.slug ?? '',
    });
  };
  const { loading, hotels } = useSelector((state: any) => state.hotels);
  const { handleFilterHotels } = useFilterHotels(hotels);

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
      <header className="fixed z-20 flex flex-col w-full pb-2 lg:pt-6 sm:pt-1 bg-dark-100 border-y border-dark-300">
        <section className="hidden lg:block">
          <HorizontalTabs
            tabs={categoriesTabs}
            activeTab={activeTab}
            onClick={handleTabClick}
            primary
            className="px-4 mt-1"
          />
        </section>

        <section className="pt-3 lg:hidden">
          <ExtendedSearchCategoryForm searchType={searchType} />
          {/*
          <HotelSecondarySearchOptions
            handleFilterHotels={handleFilterHotels}
            loading={loading}
          />
          */}
        </section>
        <section className="hidden w-full px-20 pt-6 pb-10 lg:block bg-dark-100 border-dark-300">
          <section className="mx-auto max-w-7xl">
            <SearchCategoryForm activeTab={activeTab} />
          </section>
        </section>
      </header>
      <main>
        <section
          className={classnames('lg:w-full lg:px-20 pt-[90px]', {
            ['lg:pt-[274px]']: slug === 'car-rental',
            ['lg:pt-[304px]']: slug === 'flights',
            ['lg:pt-[204px]']: multipleCategories,
            ['lg:pt-[142px]']: !multipleCategories,
          })}
        >
          <section className="mx-auto max-w-7xl ">
            <SearchResultDisplay searchType={searchType} />
          </section>
        </section>
      </main>
    </>
  );
};

export default Search;
