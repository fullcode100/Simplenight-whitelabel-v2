import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Button from '../ButtonNew/Button';

import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';

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
      <Button type={type} onClick={() => setview(value)} width="w-full">
        <section
          className={classNames(
            'flex gap-3 items-center font-semibold hover:text-primary-1000',
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
    <>
      <section className="pt-16 lg:hidden" />
      <section className="fixed bottom-0 left-0 z-10 w-full px-4 py-2 bg-white lg:hidden shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)]">
        <section className="flex w-full gap-3">
          <ViewButton value={'list'}>
            <ListIcon /> {textListView}
          </ViewButton>
          <ViewButton value={'map'}>
            <MapIcon /> {textMapView}
          </ViewButton>
        </section>
      </section>
    </>
  );
};
