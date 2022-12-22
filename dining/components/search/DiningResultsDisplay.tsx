/* eslint-disable camelcase */
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { useQuerySetterNotReload } from 'hooks/pageInteraction/useQuerySetter';
import { DiningCategory } from '../../index';
import { DiningSearchRequest } from 'dining/types/request/DiningSearchRequest';
import {
  Dining,
  DiningSearchResponse,
} from 'dining/types/response/SearchResponse';
import React, { useState, ReactNode, useEffect } from 'react';
import useQuery from 'hooks/pageInteraction/useQuery';
import DiningFilterFormDesktop from './DiningFilterFormDesktop';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import classnames from 'classnames';
import MapView from './MapView/MapView';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { DiningClientSearcher } from 'dining/core/search/DiningClientSearcher';
import EmptyState from 'components/global/EmptyState/EmptyState';
import { useTranslation } from 'react-i18next';
import DiningSecondarySearchOptions from './DiningSecondarySearchOptions';
import DiningItemPriceInfo from './DiningItemPriceInfo';
import { DropdownRadio } from 'components/global/DropdownRadio';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from 'components/global/AltRadioButton/AltRadioButton';

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

type sortByFilters = 'Best Match' | 'Rating' | 'Review Count' | 'Distance';

const DiningResultsDisplay = () => {
  const [loaded, setLoaded] = useState(false);
  const [t, i18next] = useTranslation('dining');
  const restaurantsFoundLabel = t('restaurantsFoundLabel');
  const noResultsLabel = t('noResultsSearch');
  const sortByBestMatch = t('sortByBestMatch', 'Best Match');
  const sortByRating = t('sortByRating', 'Rating');
  const sortByReviewCount = t('sortByReviewCount', 'Review Count');
  const sortByDistance = t('sortByDistance', 'Distance');
  const setQueryParams = useQuerySetter();
  // const setQueryParamsNoReload = useQuerySetterNotReload();

  const {
    lang,
    covers,
    startDate,
    endDate,
    latitude,
    longitude,
    price,
    sort_by,
    slug,
  } = useQuery();
  const [sortByVal, setSortByVal] = useState(sortByBestMatch);
  const [restaurants, setRestaurants] = useState<Dining[]>([]);

  const setSortState = (value: unknown) => {
    switch (value) {
      case 'best_match':
        setSortByVal('Best Match');
        break;
      case 'rating':
        setSortByVal('Rating');
        break;
      case 'review_count':
        setSortByVal('Review Count');
        break;
      case 'distance':
        setSortByVal('Distance');
        break;
      default:
        setSortByVal('Best Match');
        break;
    }
  };

  useEffect(() => {
    const hasEmptyValues = checkIfAnyNull([startDate, latitude, longitude]);

    if (hasEmptyValues) return;

    const geolocation = `${latitude},${longitude}`;
    setSortState(sort_by);
    const params: DiningSearchRequest = {
      covers: '2',
      start_date: formatAsSearchDate(startDate as unknown as string),
      end_date: formatAsSearchDate(endDate as unknown as string),
      dst_geolocation: geolocation as unknown as StringGeolocation,
      rsp_fields_set: 'basic',
      limit: 20,
      sort_by: sort_by as sortByFilters,
      price: price as string,
      cancellation_type: '',
      supplier_ids: '',
    };

    setLoaded(false);
    const ClientSearcher = new DiningClientSearcher(DiningCategory);
    ClientSearcher?.request(params, i18next)
      .then(({ items: searchedRestaurants }: DiningSearchResponse) =>
        setRestaurants(searchedRestaurants),
      )
      .catch((error) => console.error(error))
      .then(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [covers, endDate, lang, latitude, longitude, startDate, sort_by]);

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';

  const handleViewTypeChange = (value: string) =>
    setQueryParams({ view: value });

  const urlDetail = (dining: Dining) => {
    const { id } = dining;
    return `/detail/${slug}/${id}?covers=2&startDate=${startDate}&geolocation=${latitude},${longitude}`;
  };

  const onChangeSortBy = (value: string) => {
    setSortByVal(value);
    const typedValue: sortByFilters = value as sortByFilters;
    switch (typedValue) {
      case 'Best Match':
        setQueryParams({ sort_by: 'best_match' });
        break;
      case 'Rating':
        setQueryParams({ sort_by: 'rating' });
        break;
      case 'Review Count':
        setQueryParams({ sort_by: 'review_count' });
        break;
      case 'Distance':
        setQueryParams({ sort_by: 'distance' });
        break;
      default:
        break;
    }
  };

  const DiningData = () => (
    <ul role="list" className="space-y-4">
      {restaurants.map((dining, index) => {
        const {
          id,
          name,
          location: { address },
          review_count,
          rating,
          phone,
          image,
          categories,
        } = dining;

        const itemKey = id + index;
        const formattedAddress = `${phone} | ${address}`;
        const url = urlDetail(dining);

        return (
          <HorizontalItemCard
            key={itemKey}
            icon={DiningCategory.icon}
            categoryName={'dining'}
            categoryTags={categories}
            item={dining}
            title={name}
            image={image}
            address={formattedAddress}
            className="flex-0-0-auto"
            rating={rating}
            url={url}
            price={<DiningItemPriceInfo />}
            ratingCount={review_count}
            priceDisplay={<PriceDisplay price={t('free')} />}
          />
        );
      })}
    </ul>
  );

  const ViewButton = ({ children, viewParam }: ViewButtonProps) => {
    const active = viewParam === 'list' ? isListView : !isListView;
    const onClick = () => {
      setQueryParams({
        view: viewParam,
      });
    };
    return (
      <button
        onClick={onClick}
        className={classnames(
          'h-[2.75rem] w-[2.75rem] grid place-content-center',
          {
            'bg-white text-primary-1000': !active,
            'bg-primary-1000 text-white': active,
          },
        )}
      >
        {children}
      </button>
    );
  };

  const ViewActions = () => {
    return (
      <section className="flex rounded-4 overflow-hidden w-[5.5rem] border border-primary-1000">
        <ViewButton viewParam="list">
          <ListIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
        <ViewButton viewParam="map">
          <MapIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
      </section>
    );
  };

  const viewTypeFilterItems: RadioItemType[] = [
    {
      value: 'list',
      label: <ListIcon />,
    },
    {
      value: 'map',
      label: <MapIcon />,
    },
  ];

  const hasNoRestaurants = restaurants.length === 0;

  return (
    <>
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <DiningFilterFormDesktop />
        </section>
        <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-0">
          {loaded && hasNoRestaurants ? (
            <EmptyState
              text={noResultsLabel}
              image={<EmptyStateIcon className="mx-auto" />}
            />
          ) : (
            <>
              <section
                className={classnames(
                  'flex justify-between items-center lg:mb-0 bg-white relative z-[9]',
                  {
                    'mb-0 px-5 lg:px-0 w-[100%]': isListView,
                    'lg:absolute lg:m-4 lg:rounded] px-5 lg:px-4 w-[100%] lg:w-[96%]':
                      !isListView,
                  },
                )}
              >
                <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                  {loaded ? (
                    <span>
                      {restaurants.length}{' '}
                      <span className="lg:hidden">{t('results')}</span>
                      <span className="hidden lg:inline"> {t('results')}</span>
                    </span>
                  ) : (
                    <div className="w-40 h-8 rounded bg-dark-200 animate-pulse"></div>
                  )}
                </section>
                <section className="relative flex gap-1 bg-primary-100 lg:bg-transparent py-1 px-3 lg:px-0 rounded lg:mr-0">
                  <section className="flex gap-4 items-center">
                    {isListView && (
                      <DropdownRadio
                        translation="dining"
                        sortByVal={sortByVal}
                        showFilter={false}
                        setSortByVal={setSortByVal}
                        onClickOption={onChangeSortBy}
                        options={[
                          sortByBestMatch,
                          sortByRating,
                          sortByReviewCount,
                          sortByDistance,
                        ]}
                      />
                    )}
                    <section
                      style={{ width: 110, height: 32 }}
                      className="hidden lg:block w-auto flex justify-start items-center"
                    >
                      <AltRadioButtonGroup
                        items={viewTypeFilterItems}
                        value={view as string}
                        onChange={handleViewTypeChange}
                        name="viewType"
                      />
                    </section>
                    <DiningSecondarySearchOptions />
                  </section>
                </section>
              </section>
              {isListView && (
                <section className="w-full h-full px-5 pb-6 lg:px-0">
                  {loaded ? <DiningData /> : <HorizontalSkeletonList />}
                </section>
              )}
              {!isListView && (
                <section className="relative w-full h-full">
                  <MapView items={restaurants} createUrl={urlDetail} />
                </section>
              )}
            </>
          )}
        </section>
      </section>
      <SearchViewSelectorFixed />
    </>
  );
};

export default DiningResultsDisplay;
