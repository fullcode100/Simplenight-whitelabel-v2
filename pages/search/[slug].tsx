import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import classNames from 'classnames';

import SearchResultDisplay from 'components/global/SearchResultDisplay/SearchResultDisplay';
import useQuery from 'hooks/pageInteraction/useQuery';
import ExtendedSearchCategoryForm from 'components/global/SearchCategoryForm/ExtendedSearchCategoryForm';
import { Tab } from 'components/global/Tabs/types';
import SearchCategoryForm from 'components/global/SearchCategoryForm/SearchCategoryForm';
import useCategories from 'hooks/category/useCategories';
import useDisplayCategory from 'hooks/category/useDisplayCategory';
import useScrollDirection from 'hooks/layoutAndUITooling/useScrollDirection';
import { useRouter } from 'next/router';

const Search: NextPage = () => {
  const { slug } = useQuery();

  const multipleCategories = useDisplayCategory();
  const categoriesTabs = useCategories();
  const scrollDirection = useScrollDirection();

  const activeTabIndex = categoriesTabs.findIndex((tab) => tab.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>(
    categoriesTabs?.[activeTabIndex],
  );
  const router = useRouter();
  const { query } = router;
  const searchCategory = query.slug as string;

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
        <section className="py-3 lg:hidden bg-white shadow-custom border-dark-300">
          <ExtendedSearchCategoryForm searchType={searchType} />
        </section>
        <section className="hidden w-full px-20 pt-6 pb-10 lg:block bg-dark-100 border-dark-300">
          <section className="mx-auto max-w-7xl">
            <SearchCategoryForm activeTab={activeTab} />
          </section>
        </section>
      </div>
      <main>
        <section
          className={classNames(
            'lg:w-full',
            { 'lg:px-20': searchCategory !== 'hotels' },
            'relative',
          )}
        >
          <section
            className={classNames('mx-auto', {
              'max-w-7xl': searchCategory !== 'hotels',
            })}
          >
            <SearchResultDisplay searchType={searchType} />
          </section>
        </section>
      </main>
    </>
  );
};

export default Search;
