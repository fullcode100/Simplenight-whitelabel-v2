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
import OrderLookupIcon from 'public/icons/assets/order-lookup-icon.svg';
import CategorySelectDesktop from 'layouts/header/components/Menu/CategorySelectDestkop';

const UpperSectionBackground = ({ children }: { children?: any }) => (
  <div className="min-h-[50vh] w-[100vw] px-4 pt-[96px] pb-[26px] grid grid-cols-1 place-content-center lg:min-h-[90vh] lg:px-20">
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
  const lookupYourOrder = t('lookupYourOrder', 'Look Up Your Order');
  const reviewAndManageYourOrder = t(
    'reviewAndManageYourOrder',
    'Review and manage your order',
  );
  const goToOrderLookup = t('goToOrderLookup', 'Go to Order Lookup');

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

  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank');
  };
  interface HelpLinkProps {
    icon?: React.ReactNode;
    link?: string;
    text?: string;
  }
  const HelpLink = ({ icon, link = '', text }: HelpLinkProps) => (
    <section className="flex gap-3 justify-center items-center mt-4 text-base text-primary-1000 underline font-semibold lg:mt-0">
      <section className="text-white bg-primary-1000 h-8 w-8 rounded-full flex justify-center items-center">
        {icon}
      </section>
      <button onClick={() => handleLinkOpen(link)}>{text}</button>
    </section>
  );
  const HelpSection = () => (
    <section className="p-4 mt-4 mb-4 lg:m-0 lg:flex lg:[50%] lg:flex-1">
      <section className="font-lato p-4 shadow-md rounded-4 text-center border text-dark-1000 lg:w-full lg:py-10 lg:px-6">
        <h3 className="text-2xl lg:text-3xl lg:mt-4">{helpTitle}</h3>
        <p className="text-lg font-light mt-4">{helpDescription}</p>
        <section className="lg:flex first-letter lg:justify-center lg:items-center lg:mt-5">
          <HelpLink
            icon={<EmailIcon />}
            link={`mailto:${customerSupportEmail}`}
            text={t('emailSupport', 'Email Support')}
          />
          <span className="hidden lg:block h-[1.5rem] w-[1px] bg-dark-300 mx-8" />
          <HelpLink
            icon={<PhoneCall />}
            link={`tel:${customerSupportPhone}`}
            text={customerSupportPhone}
          />
        </section>
      </section>
    </section>
  );

  const OrderLookupCard = () => (
    <section className="p-4 mt-8 text-dark-1000 lg:m-0 lg:flex lg:w-[50%] lg:flex-1">
      <section className="font-lato p-4 shadow-md rounded-4 text-center border grid place-items-center lg:flex lg:first-line lg:gap-8 lg:w-full lg:px-8 lg:py-10">
        <OrderLookupIcon className="lg:w-[11rem] lg:h-[10rem]" />
        <section className="grid place-items-center w-full lg:place-items-start">
          <h3 className="text-2xl mt-4 lg:text-3xl lg:mt-0">
            {lookupYourOrder}
          </h3>
          <p className="text-lg font-light mt-3 lg:text-xl lg:mt-2">
            {reviewAndManageYourOrder}
          </p>
          <Button
            value={goToOrderLookup}
            size="full"
            className="mt-4 lg:mt-2 lg:w-auto lg:px-5 lg:font-normal lg:h-11"
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
      <section className="lg:flex lg:px-20 lg:py-10">
        <OrderLookupCard />
        <HelpSection />
      </section>
    </main>
  );
};

Home.getLayout = getHomepageLayout;

export default Home;
