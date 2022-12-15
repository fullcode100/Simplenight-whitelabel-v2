import { useTranslation } from 'react-i18next';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import classNames from 'classnames';
import Button from '../ButtonNew/Button';

interface ViewButton {
  value: string;
  children: React.ReactNode;
}

const SearchViewSelector = () => {
  const [t, i18n] = useTranslation('hotels');
  const setQueryParams = useQuerySetter();
  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');
  const { view = 'list' } = useQuery();

  const setView = (view: string) => {
    setQueryParams({
      view,
    });
  };

  const ViewButton = ({ value, children }: ViewButton) => {
    const isActive = value === view;
    const type = isActive ? 'active' : 'inactive';
    return (
      <Button type={type} onClick={() => setView(value)} width="w-full">
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

  return (
    <section className="flex w-full gap-3">
      <ViewButton value={'list'}>
        <ListIcon /> {textListView}
      </ViewButton>
      <ViewButton value={'map'}>
        <MapIcon /> {textMapView}
      </ViewButton>
    </section>
  );
};

export default SearchViewSelector;
