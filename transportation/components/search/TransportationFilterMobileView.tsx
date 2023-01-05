import React, { FC } from 'react';
import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';
import { TransportationFilterFormDesktop } from './TransportationFilterFormDesktop';
import {
  TransportationFilter,
  TransportationListMetaData,
} from 'transportation/types/TransportationFilter';

interface TransportationFilterFormDesktopProps {
  filterValuesChanged: (filterValues: Partial<TransportationFilter>) => void;
  transportationMetaData: TransportationListMetaData;
  filter: TransportationFilter;
}

interface TransportationFilterMobileView
  extends TransportationFilterFormDesktopProps {
  onClose: () => void;
}

export const TransportationFilterMobileView: FC<
  TransportationFilterMobileView
> = ({ onClose, filter, transportationMetaData, filterValuesChanged }) => {
  const [tg] = useTranslation('global');

  const applyFiltersHandler = () => {
    onClose();
  };

  const closeHandler = () => {
    onClose();
  };

  return (
    <FullScreenModal
      open={true}
      closeModal={closeHandler}
      title={tg('filters')}
      primaryButtonText={tg('apply')}
      primaryButtonAction={applyFiltersHandler}
    >
      <section className="h-full overflow-y-auto p-5">
        <TransportationFilterFormDesktop
          filter={filter}
          filterValuesChanged={filterValuesChanged}
          transportationMetaData={transportationMetaData}
        />
      </section>
    </FullScreenModal>
  );
};
