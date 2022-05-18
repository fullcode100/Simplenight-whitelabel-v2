import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { getHomepageScrollHandler } from '../store/selectors/core';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';
import { useTranslation } from 'react-i18next';
import { Tab } from 'components/global/Tabs/types';
import SectionTitle from 'components/global/SectionTitle/SectionTitle';
import hotelMock from 'hotels/hotelMock';
import ItemCard from 'components/global/ItemCard/ItemCard';
import { tabsMock } from 'mocks/tabsMock';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import Button from 'components/global/Button/Button';
import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import HomepageLayout from 'layouts/HomepageLayout';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import { getHomepageLayout } from 'layouts/helpers/getHomepageLayout';

const UpperSectionBackground = ({ children }: { children?: any }) => (
  <div className="min-h-[50vh] w-[100vw] px-4 pt-[122px] pb-[26px] bg-primary-100 ">
    {children}
  </div>
);

const Home: NextPageWithLayout = () => {
  const [t, i18next] = useTranslation('global');
  const nearYouLabel = t('nearYou', 'Near you right now');
  const helpTitle = t('needHelpTitle', 'Need some help?');
  const helpDescription = t(
    'needHelpDescription',
    'Email or call us to get support from our team.',
  );

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
        <Button
          value={t('emailSupport', 'Email Support')}
          size="full"
          type="outlined"
          className="mt-6"
          leftIcon={<EmailIcon />}
          onClick={() => handleLinkOpen(`mailto:${customerSupportEmail}`)}
        />
        <Button
          value={customerSupportPhone}
          size="full"
          type="outlined"
          className="mt-3"
          leftIcon={<PhoneCall />}
          onClick={() => handleLinkOpen(`tel:${customerSupportPhone}`)}
        />
      </section>
    </section>
  );

  return (
    <main ref={mainRef} className="min-h-[100vh] w-full overflow-x-auto">
      <UpperSectionBackground>
        <p className="font-lato leading-[38px] text-[32px] font-normal text-dark-1000 mb-9">
          Book Everything, Anywhere{' '}
          <span className="font-normal ml-[-6px] align-super text-sm ">®</span>
        </p>
        <Panel className="mt-6 z-100">
          <HorizontalTabs
            tabs={tabsMock}
            onClick={handleTabClick}
            className="mb-2"
            primary
          />
          <SearchCategoryForm searchType={searchType} />
        </Panel>
      </UpperSectionBackground>
      <section className="px-4">
        <SectionTitle label={nearYouLabel} />
        <section className="flex flex-row gap-4 flex-nowrap overflow-x-auto py-3">
          {hotelMock.map((hotel, index) => {
            const {
              details: { name, address },
              thumbnail,
              amount_min: amountMin,
            } = hotel;
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
      <HelpSection />
    </main>
  );
};

Home.getLayout = getHomepageLayout;

export default Home;
