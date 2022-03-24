import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { getImages } from '../store/selectors/core';
import SearchCategorySelector from '../components/global/SearchCategorySelector/SearchCategorySelector';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';

import styles from '../styles/Home.module.scss';
import { useTranslation } from 'react-i18next';
import Tabs from 'components/global/Tabs/Tabs';
import { Tab } from 'components/global/Tabs/types';

const UpperSectionBackground = ({ children }: { children?: any }) => (
  <div className="min-h-[50vh] w-[100vw] px-4 py-28 bg-primary-100 absolute top-0 left-0">
    {children}
  </div>
);

const Home: NextPage = () => {
  const configImages = useSelector(getImages);
  const [t, i18next] = useTranslation('global');
  const backgroundImageUri = configImages.background;
  const [searchType, setSearchType] = useState('hotels');

  const handleTabClick = (tab: Tab, setActiveTab: (tab: Tab) => void) => {
    setActiveTab(tab);
    setSearchType(tab.value.toLowerCase());
  };

  const Panel = ({
    children,
    className = '',
  }: {
    children?: any;
    className?: string;
  }) => (
    <section
      className={`bg-white overflow-hidden shadow rounded-lg ${className}`}
    >
      <section className="px-4 py-5 sm:p-6">{children}</section>
    </section>
  );

  const tabsMock = [{ value: 'Hotels', href: '/', current: true }];
  return (
    <div>
      <main className="h-screen w-full py-6 px-4 overflow-x-auto">
        <UpperSectionBackground>
          <p className="h3 text-dark-1000 mb-9">Book Everything, Anywhere</p>
          <Tabs tabs={tabsMock} onClick={handleTabClick} />
          <Panel className="mt-6 z-100">
            <SearchCategoryForm searchType={searchType} />
          </Panel>
        </UpperSectionBackground>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
