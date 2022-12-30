import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import i18next from 'i18next';
import { Tab } from 'components/global/Tabs/types';
import BlockDivider from 'components/global/Divider/BlockDivider';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DiningDetailPreRequest } from 'dining/types/request/DiningDetailRequest';
import {
  DiningSearchResponse,
  Restaurant,
  WeekDaysAvailability,
} from 'dining/types/response/SearchResponse';
import Loader from 'components/global/Loader/Loader';
import EmptyState from 'components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { useTranslation } from 'react-i18next';
import DiningItineraryDetail from './DiningItineraryDetail';
import DiningDetailActions from './DiningDetailActions';
import {
  addToCart,
  removeFromCart,
} from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import DiningCustomerReviews from './DiningCustomerReviews';
import DiningRatingDetail from './DiningRatingDetail';
import DiningLocationDetail from './DiningLocationDetail';
import DiningAboutDetail from './DiningAboutDetail';
import DiningSummaryDetail from './DiningSummaryDetail';
import { notification } from 'components/global/Notification/Notification';
import { Item } from 'types/cart/CartType';
import { createCart, updateCart } from 'store/actions/cartActions';

type DiningDetailDisplayProps = CategoryPageComponentProps;

const DiningDetailDisplay = ({ Category }: DiningDetailDisplayProps) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const cartId = (state as any)?.cartStore?.cart ?? null;
  const { language } = i18next;
  const params = useQuery();
  const { startDate, endDate } = useSearchQueries();
  const { id, time: defaultTime, covers: defaultCovers } = params;
  const storeCurrency = useSelector((state: any) => state.core.currency);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [currency, setCurrency] = useState<string>(storeCurrency);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(startDate);
  const [time, setTime] = useState<string>(
    typeof defaultTime === 'string' ? defaultTime : '',
  );
  const [covers, setCovers] = useState<number>(
    defaultCovers ? Number(defaultCovers) : 1,
  );
  const router = useRouter();
  const data = restaurant;
  const [t, i18n] = useTranslation('dining');
  const overviewLabel = t('overview');
  const locationLabel = t('location');
  const reviewsLabel = t('reviews');
  const noResultsLabel = t('noResultsSearch');
  const diningImages = data?.images;
  const overviewRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const selectedDay = new Date(selectedDate).getDay();

  const available = data?.hours?.[0]?.open;
  const availableHours: string[] | undefined = available?.reduce(
    (acum, { start, end, day }) => {
      if (selectedDay === day) {
        const startNumber = parseInt(start);
        const endNumber = parseInt(end);

        let currentValue = startNumber;
        while (currentValue <= endNumber) {
          const firstTime = (currentValue / 100).toFixed();
          if (currentValue % 100 === 0) {
            acum.push(`${firstTime}:00`);
            currentValue += 30;
          } else {
            acum.push(`${firstTime}:30`);
            currentValue += 70;
          }
        }
      }

      return acum;
    },
    [] as string[],
  );

  const availableHoursByDay = available?.reduce((acum, { start, end, day }) => {
    if (!acum[day]) {
      acum[day] = [];
    }
    acum[day].push({ start, end });

    return acum;
  }, [] as WeekDaysAvailability);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeCurrency]);

  useEffect(() => {
    const params: DiningDetailPreRequest = {
      id: (id as unknown as string) ?? '',
      start_date: startDate,
      end_date: endDate,
    };

    Category.core.ClientDetailer?.request(params, i18next, params.id)
      .then(({ items }: DiningSearchResponse) => {
        setRestaurant(items[0]);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, language]);

  const onSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const scrollToOverview = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocation = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReviews = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAction = async (url: string) => {
    if (!time || !selectedDate) {
      return;
    }

    const inventoryId = `817e6010:${id}`;
    const itemToBook = {
      category: 'DINING',
      booking_data: {
        inventory_id: inventoryId,
        date: formatAsSearchDate(selectedDate),
        time,
        covers: covers.toString(),
      },
    };

    const result = await addToCart(itemToBook, i18next, store, true);
    let addedItem;
    if (result?.cart) {
      addedItem = result?.cart?.items.find(
        (item) => item.booking_data?.inventory_id === inventoryId,
      );
    } else {
      addedItem = result;
    }

    const item = addedItem as Item;

    if (item?.status === 'active') {
      if (result?.cart && item?.cart_id) {
        dispatch(createCart(item?.cart_id));
      } else {
        dispatch(updateCart());
      }
      router.replace(url);
    } else {
      notification(
        t('unavailableTimeError'),
        t('unavailableTimeErrorDesc'),
        'error',
      );
      const itemToRemove = {
        cartId: item?.cart_id,
        itemId: item?.cart_item_id,
      };

      removeFromCart(i18n, itemToRemove, dispatch);
    }
  };

  const GeneralInformationSection = ({
    name,
    rating,
    reviewsLength,
  }: {
    name: string;
    rating: number;
    reviewsLength: number;
  }) => {
    const tabs: Tab[] = [
      { name: overviewLabel, type: overviewLabel },
      { name: locationLabel, type: locationLabel },
      { name: reviewsLabel, type: reviewsLabel },
    ];

    const scrollFunctions: { [key: string]: () => void } = {
      [overviewLabel]: scrollToOverview,
      [locationLabel]: scrollToLocation,
      [reviewsLabel]: scrollToReviews,
    };

    const scrollTo = (tab: string) => {
      const scrollFunction = scrollFunctions[tab];

      if (scrollFunction) scrollFunction();
    };

    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    const handleTabClick = (tab: Tab) => {
      setActiveTab(tab);
      scrollTo(tab.name);
    };

    return (
      <section className="w-screen pt-4 text-dark-1000 bg-dark-100 rounded-t-12 lg:hidden">
        <section className="px-4 ">
          <p className="pb-3 h4">{name}</p>
          <DiningRatingDetail rating={rating} reviewsLength={reviewsLength} />
        </section>
        <BlockDivider className="mt-5" />
        <section className="px-4">
          <HorizontalTabs
            tabs={tabs}
            activeTab={activeTab}
            onClick={handleTabClick}
            hideMore
          />
        </section>
      </section>
    );
  };

  const onChangeTime = (newTime: string) => {
    if (newTime === time) {
      setTime('');
    } else {
      setTime(newTime);
    }
  };

  if (loading) {
    return (
      <section className="lg:pt-14">
        <Loader />
      </section>
    );
  }

  if (!data) {
    return (
      <EmptyState
        text={noResultsLabel}
        image={<EmptyStateIcon className="mx-auto" />}
      />
    );
  }

  return (
    <div
      className={classnames('relative grid', {
        'lg:grid-cols-4 grid-cols-3': time,
        'grid-cols-3': !time,
      })}
    >
      <main className="h-full col-span-3">
        <DiningSummaryDetail
          className="hidden w-full lg:block"
          name={data.name}
          rating={data.rating}
          images={data.images}
          reviewsLength={data.review_count}
          phone={data.display_phone}
          categories={data.categories}
          isOpen={!data.is_closed}
          hours={availableHours}
        />
        {diningImages && (
          <section className="lg:hidden">
            <ImageCarousel images={data.images} title="" />
          </section>
        )}
        <section>
          <GeneralInformationSection
            name={data.name}
            rating={data.rating}
            reviewsLength={data.review_count}
          />
        </section>
        <section
          ref={overviewRef}
          className="flex justify-center border-dark-300 border-y-2"
        >
          <section className="lg:max-w-[904px] lg:px-0 px-4 w-full py-8 relative">
            <DiningAboutDetail
              phone={data.display_phone}
              categories={data.categories}
              hours={availableHours}
              onSelectDate={onSelectDate}
              isOpen={!data.is_closed}
              onChange={onChangeTime}
              defaultTime={time}
              onChangeCovers={(newCovers) => setCovers(newCovers)}
              defaultCovers={covers}
              hoursByDay={availableHoursByDay}
            />
          </section>
        </section>
        <section
          ref={locationRef}
          className="flex justify-center border-b-2 border-dark-300"
        >
          <section className="max-w-[904px] w-full flex lg:px-0 px-4">
            <DiningLocationDetail
              lat={data.location.latitude}
              long={data.location.longitude}
            />
          </section>
        </section>
        <section ref={reviewsRef} className="flex justify-center mt-12">
          <section className="max-w-[904px] w-full lg:px-0 px-4">
            <DiningCustomerReviews
              rating={data.rating}
              reviews={data.reviews}
            />
          </section>
        </section>
      </main>
      {!!time && (
        <DiningItineraryDetail name={data.name} handleAction={handleAction} />
      )}
      {!!time && (
        <div className="fixed bottom-0 w-full px-3 py-5 bg-white lg:hidden drop-shadow">
          <DiningDetailActions handleAction={handleAction} />
        </div>
      )}
    </div>
  );
};

export default DiningDetailDisplay;
