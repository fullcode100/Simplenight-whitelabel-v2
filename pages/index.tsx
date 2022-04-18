import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { getHomepageScrollHandler } from '../store/selectors/core';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';
import { useTranslation } from 'react-i18next';
import Tabs from 'components/global/Tabs/Tabs';
import { Tab } from 'components/global/Tabs/types';
import SectionTitle from 'components/global/SectionTitle/SectionTitle';

import hotelMock from 'hotels/hotelMock';
import ItemCard from 'components/global/ItemCard/ItemCard';
import { tabsMock } from 'mocks/tabsMock';

const UpperSectionBackground = ({ children }: { children?: any }) => (
  <div className="min-h-[50vh] w-[100vw] px-4 py-28 bg-primary-100 ">
    {children}
  </div>
);

const Home: NextPage = () => {
  const [t, i18next] = useTranslation('global');
  const nearYouLabel = t('nearYou', 'Near you right now');

  const mainRef = useRef<HTMLDivElement>(null);
  const homepageScrollHandler = getHomepageScrollHandler();

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

  useEffect(() => {
    const mainTag = mainRef.current;
    if (homepageScrollHandler) {
      mainTag?.addEventListener('scroll', homepageScrollHandler);
    }

    return () => {
      if (homepageScrollHandler) {
        mainTag?.removeEventListener('scroll', homepageScrollHandler);
      }
    };
  }, [homepageScrollHandler]);

  return (
    <main ref={mainRef} className="min-h-[100vh] w-full overflow-x-auto">
      <UpperSectionBackground>
        <p className="h3 text-dark-1000 mb-9">Book Everything, Anywhere</p>
        <Tabs tabs={tabsMock} onClick={handleTabClick} />
        <Panel className="mt-6 z-100">
          <SearchCategoryForm searchType={searchType} />
        </Panel>
      </UpperSectionBackground>
      <section className="px-4">
        <SectionTitle label={nearYouLabel} />
        <section className="flex flex-row gap-4 flex-nowrap overflow-x-auto">
          {hotelMock.map((hotel, index) => {
            const { name, thumbnail, amount_min: amountMin, address } = hotel;
            const itemKey = hotel.id + index;

            return (
              <ItemCard
                key={itemKey}
                handleOnViewDetailClick={() => console.log(hotel)}
                item={hotel}
                title={name}
                image={thumbnail}
                price={amountMin}
                extraInformation={{ address }}
                className=" flex-0-0-auto"
              />
            );
          })}
        </section>
      </section>
    </main>
  );
};

export default Home;
