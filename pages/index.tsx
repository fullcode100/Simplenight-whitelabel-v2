import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { getImages } from '../store/selectors/core';
import SearchCategorySelector from '../components/global/SearchCategorySelector/SearchCategorySelector';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const configImages = useSelector(getImages);
  const backgroundImageUri = configImages.background;
  const [searchType, setSearchType] = useState('hotels');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section
          className={styles.searchSection}
          style={{
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImageUri})`,
          }}
        >
          <section className={styles.searchSectionContainer}>
            <section className={styles.searchSelector}>
              <SearchCategorySelector
                className={styles.searchSelectorComponent}
                searchType={searchType}
                onItemClick={setSearchType}
              />
            </section>
            <SearchCategoryForm searchType={searchType} />
          </section>
        </section>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
