/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import SearchCategoryForm from '../components/global/SearchCategoryForm/SearchCategoryForm';
import HelpSection from 'components/global/HelpSection/HelpSection';
import { getHomepageScrollHandler } from '../store/selectors/core';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import { getHomepageLayout } from 'layouts/helpers/getHomepageLayout';
import { OrderLookupIcon } from '@simplenight/ui';
import useCategories from 'hooks/category/useCategories';
import HomeCategoryContent from 'components/global/HomeCategoryContent/HomeCategoryContent';
import homePageText from 'translations/en/global.json';
import { useSettings } from 'hooks/services/useSettings';
import { useTabStore } from 'hooks/layoutAndUITooling/useTabStore';
import useMediaViewport from 'hooks/media/useMediaViewport';

const UpperSectionBackground = ({ children }: { children?: ReactNode }) => {
  const { data: brandConfig } = useSettings();
  const { homepage } = brandConfig;
  const { whiteLabelBackground } = homepage || {};
  return (
    <section
      className="pt-20 bg-center bg-no-repeat bg-cover lg:pt-0"
      style={{
        backgroundImage: `url(${whiteLabelBackground})`,
      }}
    >
      <div className="grid grid-cols-1 place-content-center px-4 pb-20 lg:px-20 min-h-[50vh] lg:min-h-[90vh]">
        {children}
      </div>
    </section>
  );
};

const LOOKUP_URI = '/lookup';

// Reopen
const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const tab = useTabStore((state) => state.tab);
  const { data: brandConfig } = useSettings();
  const { heroSectionTitle } = brandConfig?.homepage || {};

  const [t, i18next] = useTranslation('global');
  const lookupYourOrder = t('lookupYourOrder', 'Look Up Your Order');
  const reviewAndManageYourOrder = t(
    'reviewAndManageYourOrder',
    'Review and manage your order',
  );
  const goToOrderLookup = t('goToOrderLookup', 'Go to Order Lookup');

  const mainRef = useRef<HTMLDivElement>(null);
  const homepageScrollHandler = getHomepageScrollHandler();

  const categoriesTabs = useCategories();
  // const [activeTab, setActiveTab] = useState<Tab>(categoriesTabs?.[0]);

  // const handleTabClick = (tab: Tab) => {
  //   setActiveTab(tab);
  // };

  const Panel = ({
    children,
    className = '',
  }: {
    children?: any;
    className?: string;
  }) => (
    <section className={`bg-white shadow rounded ${className}`}>
      <section className="p-4 lg:p-6">{children}</section>
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

  const { isDesktop } = useMediaViewport();

  const OrderLookupCard = () => (
    <section className="text-dark-1000 lg:m-0 lg:flex lg:w-[50%] lg:flex-1">
      <section className="grid p-4 text-center border rounded font-lato shadow-container border-dark-300 place-items-center lg:flex lg:first-line lg:gap-8 lg:w-full lg:px-8 lg:py-10">
        <OrderLookupIcon width={isDesktop ? 161 : 100} />

        <section className="grid w-full place-items-center lg:place-items-start">
          <h3 className="mt-4 text-2xl font-semibold text-dark-1000 lg:text-3xl lg:mt-0">
            {lookupYourOrder}
          </h3>
          <p className="mt-3 text-lg font-normal text-dark-1000 lg:text-xl lg:mt-2">
            {reviewAndManageYourOrder}
          </p>
          <Button
            value={goToOrderLookup}
            size="full"
            className="mt-5 lg:mt-4 lg:w-auto lg:px-5 lg:font-normal lg:h-11"
            onClick={redirectToLookup}
          />
        </section>
      </section>
    </section>
  );

  return (
    <>
      <main ref={mainRef} className="min-h-[100vh] w-full">
        <section className="relative">
          <UpperSectionBackground>
            <section className="relative w-full mx-auto max-w-7xl">
              <p className="font-lato leading-[38px] text-[32px] font-semibold text-white text-center mb-9 lg:text-6xl lg:pb-5 lg:mt-5">
                {heroSectionTitle}{' '}
                <span className="font-normal ml-[-6px] align-super text-sm ">
                  ®
                </span>
              </p>
              <Panel className="z-50 grid-flow-col mt-6">
                <section>
                  <SearchCategoryForm
                    activeTab={tab ? tab : categoriesTabs?.[0]}
                  />
                </section>
              </Panel>
            </section>
          </UpperSectionBackground>
        </section>

        <HomeCategoryContent activeTab={tab ? tab : categoriesTabs?.[0]} />
        <section className="px-5 py-6 lg:px-20 lg:py-12">
          <section className="flex flex-col gap-4 mx-auto max-w-7xl lg:gap-8 lg:flex-row">
            <OrderLookupCard />
            <HelpSection />
          </section>
        </section>
      </main>
    </>
  );
};

Home.getLayout = getHomepageLayout;

export default Home;
