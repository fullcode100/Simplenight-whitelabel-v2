import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Button from '../ButtonNew/Button';

import MapIcon from 'public/icons/assets/map_large.svg';
import ListIcon from 'public/icons/assets/list_large.svg';

interface ListMapMobileBottomTabsProps {
  setview: React.Dispatch<React.SetStateAction<string>>;
  view: string;
}

export const ListMapMobileBottomTabs = ({
  setview,
  view,
}: ListMapMobileBottomTabsProps) => {
  interface ViewButton {
    value: string;
    children: React.ReactNode;
  }

  const ViewButton = ({ value, children }: ViewButton) => {
    const isActive = value === view;
    const type = isActive ? 'active' : 'inactive';
    return (
      <Button type={type} onClick={() => setview(value)} width="w-12">
        <section
          className={classNames(
            'flex gap-4 items-center font-semibold hover:text-primary-1000',
          )}
        >
          {children}
        </section>
      </Button>
    );
  };

  const [t, i18n] = useTranslation('hotels');
  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');
  return (
    <section className="fixed left-1/2 transform -translate-x-1/2 rounded-lg bg-white bottom-0 mb-12 z-10 px-1 py-1 lg:hidden shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)]">
      <section className="flex justify-center w-full gap-4">
        <ViewButton value={'list'}>
          <ListIcon />
        </ViewButton>
        <ViewButton value={'map'}>
          <MapIcon />
        </ViewButton>
      </section>
    </section>
  );
};
