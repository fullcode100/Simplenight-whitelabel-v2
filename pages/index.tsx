import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import HelpSection from 'components/global/HelpSection/HelpSection';
import { getHomepageScrollHandler } from '../store/selectors/core';
import { Tab } from 'components/global/Tabs/types';
import { tabsMock } from 'mocks/tabsMock';
import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import { getHomepageLayout } from 'layouts/helpers/getHomepageLayout';
import OrderLookupIcon from 'public/icons/assets/order-lookup-icon.svg';
import CategorySelectDesktop from 'layouts/header/components/Menu/CategorySelectDestkop';

const UpperSectionBackground = ({ children }: { children?: any }) => (
  <div className="min-h-[50vh] w-[100vw] px-4 pt-[96px] pb-[26px] grid grid-cols-1 place-content-center lg:min-h-[90vh] lg:px-20">
    {children}
  </div>
);

const LOOKUP_URI = '/lookup';

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const [t, i18next] = useTranslation('global');
  const homePageText = t('homePageText');
  const lookupYourOrder = t('lookupYourOrder', 'Look Up Your Order');
  const reviewAndManageYourOrder = t(
    'reviewAndManageYourOrder',
    'Review and manage your order',
  );
  const goToOrderLookup = t('goToOrderLookup', 'Go to Order Lookup');

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
    <section className={`bg-white shadow rounded-lg ${className}`}>
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

  const redirectToLookup = () => {
    router.push(LOOKUP_URI);
  };

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

  const redirectToLookup = () => {
    router.push(LOOKUP_URI);
  };

  const OrderLookupCard = () => (
    <section className="p-4 mt-8 text-dark-1000 lg:m-0 lg:flex lg:w-[50%] lg:flex-1">
      <section className="font-lato p-4 shadow-md rounded-4 text-center border grid place-items-center lg:flex lg:first-line lg:gap-8 lg:w-full lg:px-8 lg:py-10">
        <OrderLookupIcon className="lg:w-[11rem] lg:h-[10rem]" />
        <section className="grid place-items-center w-full lg:place-items-start">
          <h3 className="text-2xl mt-4 lg:text-3xl lg:mt-0 font-semibold">
            {lookupYourOrder}
          </h3>
          <p className="text-lg font-normal mt-3 lg:text-xl lg:mt-2">
            {reviewAndManageYourOrder}
          </p>
          <Button
            value={goToOrderLookup}
            size="full"
            className="mt-4 lg:mt-2 lg:w-auto lg:px-5 lg:font-normal lg:h-11"
            onClick={redirectToLookup}
          />
        </section>
      </section>
    </section>
  );

  return (
    <main ref={mainRef} className="min-h-[100vh] w-full overflow-x-auto">
      <section className="relative">
        <Image
          src={'/images/bg-image.jpg'}
          alt={''}
          layout={'fill'}
          className="object-cover"
        />
        <UpperSectionBackground>
          <section className="relative">
            <p className="font-lato leading-[38px] text-[32px] font-semibold text-white text-center mb-9 lg:text-6xl lg:pb-5 lg:mt-5">
              {homePageText}{' '}
              <span className="font-normal ml-[-6px] align-super text-sm ">
                ®
              </span>
            </p>
            <Panel className="mt-6 z-50 grid-flow-col">
              <HorizontalTabs
                tabs={tabsMock}
                onClick={handleTabClick}
                className="mb-2"
                primary
              />
              <CategorySelectDesktop />
              <SearchCategoryForm searchType={searchType} />
            </Panel>
          </section>
        </UpperSectionBackground>
      </section>
      <section className="py-0.5 lg:flex lg:px-20 lg:py-10">
        <OrderLookupCard />
        <HelpSection />
      </section>
      <HelpSection />
    </main>
  );
};

Home.getLayout = getHomepageLayout;

export default Home;
