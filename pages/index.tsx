import React, { useEffect, useRef, useState } from 'react';
import { getHomepageScrollHandler } from '../store/selectors/core';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';
import { useTranslation } from 'react-i18next';
import { Tab } from 'components/global/Tabs/types';
import { tabsMock } from 'mocks/tabsMock';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import Button from 'components/global/Button/Button';
import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import { getHomepageLayout } from 'layouts/helpers/getHomepageLayout';
import Image from 'next/image';

const UpperSectionBackground = ({ children }: { children?: any }) => (
  <div className="min-h-[50vh] w-[100vw] px-4 pt-[96px] pb-[26px]">
    {children}
  </div>
);

const Home: NextPageWithLayout = () => {
  const [t, i18next] = useTranslation('global');
  const helpTitle = t('needHelpTitle', 'Need some help?');
  const helpDescription = t(
    'needHelpDescription',
    'Email or call us to get support from our team.',
  );
  const homePageText = t('homePageText');

  const mainRef = useRef<HTMLDivElement>(null);
  const homepageScrollHandler = getHomepageScrollHandler();

  const [searchType, setSearchType] = useState('hotels');
  const { partnerInformation } = useBrandConfig();
  const { customerSupportEmail, customerSupportPhone } = partnerInformation;

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

  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank');
  };
  const HelpSection = () => (
    <section className="p-4 mt-8 mb-4">
      <section className="font-lato p-4 shadow-md rounded-4 text-center border">
        <h3 className="text-2xl">{helpTitle}</h3>
        <p className="text-lg font-light mt-4">{helpDescription}</p>
        <section className="flex gap-3 justify-center items-center mt-4 text-base text-primary-1000 underline font-semibold">
          <section className="text-white bg-primary-1000 h-8 w-8 rounded-full flex justify-center items-center">
            <EmailIcon />
          </section>
          <button
            onClick={() => handleLinkOpen(`mailto:${customerSupportEmail}`)}
          >
            {t('emailSupport', 'Email Support')}
          </button>
        </section>
        <section className="flex gap-3 justify-center items-center mt-4 text-base text-primary-1000 underline font-semibold">
          <section className="text-white bg-primary-1000 h-8 w-8 rounded-full flex justify-center items-center">
            <PhoneCall />
          </section>
          <button onClick={() => handleLinkOpen(`tel:${customerSupportPhone}`)}>
            {customerSupportPhone}
          </button>
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
            <p className="font-lato leading-[38px] text-[32px] font-semibold text-white text-center mb-9">
              {homePageText}{' '}
              <span className="font-normal ml-[-6px] align-super text-sm ">
                ®
              </span>
            </p>
            <Panel className="mt-6 z-50">
              <HorizontalTabs
                tabs={tabsMock}
                onClick={handleTabClick}
                className="mb-2"
                primary
              />
              <SearchCategoryForm searchType={searchType} />
            </Panel>
          </section>
        </UpperSectionBackground>
      </section>

      <HelpSection />
    </main>
  );
};

Home.getLayout = getHomepageLayout;

export default Home;
