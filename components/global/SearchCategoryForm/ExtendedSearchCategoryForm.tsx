import React, { useState } from 'react';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import FullScreenModal from 'components/global/Modal/FullScreenModal';
import Tabs from 'components/global/Tabs/Tabs';
import { tabsMock } from 'mocks/tabsMock';
import { Tab } from '../Tabs/types';
import ModalDivider from '../Modal/components/ModalDivider';

const ExtendedSearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const [internalSearchType, setInternalSearchType] = useState(searchType);
  const category = useCategory(internalSearchType);

  const handleTabClick = (tab: Tab, setActiveTab: (tab: Tab) => void) => {
    setInternalSearchType(tab.value.toLowerCase());
    setActiveTab(tab);
  };

  const [isSearching, setIsSearching] = useState(false);

  const readStateSearchForm = category?.readStateSearchForm;
  const searchForm = category?.searchForm;

  const injectableProps = {
    setIsSearching,
  };

  const readStateSearchFormWithProps = injectProps(
    readStateSearchForm,
    injectableProps,
  );

  const searchFormWithProps = injectProps(searchForm, {
    ...injectableProps,
    className: 'h-full mt-8',
  });

  return isSearching ? (
    <FullScreenModal
      open={isSearching}
      setOpen={setIsSearching}
      hasHeader
      title="Search"
      className="pb-24"
    >
      <section className="h-full relative flex flex-col gap-4">
        <Tabs tabs={tabsMock} onClick={handleTabClick} />
        <ModalDivider className="inset-y-14 left-[-1rem]" />
        {searchFormWithProps}
      </section>
    </FullScreenModal>
  ) : (
    readStateSearchFormWithProps
  );
};

export default ExtendedSearchCategoryForm;
