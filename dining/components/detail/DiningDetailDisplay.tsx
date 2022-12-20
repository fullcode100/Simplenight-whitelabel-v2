import dayjs from 'dayjs';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import DatePicker from '../../../components/global/Calendar/Calendar';
import React, { useEffect, useRef, useState } from 'react';
import useQuery from 'hooks/pageInteraction/useQuery';
import IconInput from 'components/global/Input/IconInput';
import Calendar from 'public/icons/assets/calendar.svg';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import ClockIcon from 'public/icons/assets/clock.svg';
import Rating from 'components/global/Rating/Rating';
import LocationMap from '../../../components/global/LocationMap/LocationMap';
import i18next from 'i18next';
import { Tab } from 'components/global/Tabs/types';
import BlockDivider from 'components/global/Divider/BlockDivider';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Select from 'components/global/Select/Select';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DiningDetailPreRequest } from 'dining/types/request/DiningDetailRequest';
import {
  DiningSearchResponse,
  Restaurant,
  Hour,
} from 'dining/types/response/SearchResponse';
import Loader from 'components/global/Loader/Loader';
import EmptyState from 'components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import ImageCarouselLargeScreen from 'components/global/CarouselNew/ImageCarouselLargeScreen';
import { useTranslation } from 'react-i18next';
import DiningItineraryDetail from './DiningItineraryDetail';
import DiningItineraryActions from './DiningItineraryActions';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import {
  transformTo12hours,
  transformTo12hoursLowercase,
} from 'dining/helpers/time';

const HighlightedText = ({ label }: { label: string }) => {
  return (
    <div className="px-1 mr-3 bg-primary-100 text-primary-1000 rounded-4">
      {label}
    </div>
  );
};

const TimesDetail = ({
  className,
  isOpen,
  hours,
}: {
  className?: string;
  isOpen?: boolean;
  hours?: string[];
}) => {
  return (
    <div className={`flex ${className}`}>
      <div className="flex items-center bg-green-100 rounded-4 w-[67px] justify-center text-green-1000">
        <ClockIcon />
        <span className="pl-2">{isOpen ? 'Open' : 'Closed'}</span>
      </div>
      {hours && hours?.length > 0 ? (
        <div>
          <span className="pl-3 text-sm text-dark-700">
            {transformTo12hoursLowercase(hours?.[0])} -{' '}
            {transformTo12hoursLowercase(hours?.[hours?.length - 1])}
          </span>
        </div>
      ) : null}
    </div>
  );
};

const CategoriesDetail = ({
  className,
  categories,
}: {
  className?: string;
  categories: string[];
}) => {
  return (
    <div className={`flex ${className}`}>
      {categories.map((category) => (
        <HighlightedText key={category} label={category} />
      ))}
    </div>
  );
};

const AboutSummaryDetail = ({
  categories,
  isOpen,
  hours,
}: {
  categories: string[];
  isOpen?: boolean;
  hours?: string[];
}) => {
  return (
    <div className="flex">
      <div className="flex">
        <TimesDetail isOpen={isOpen} hours={hours} />
        <CategoriesDetail className="ml-10" categories={categories} />
      </div>
    </div>
  );
};

const RatingSection = ({
  rating,
  reviewsLength,
}: {
  rating: number;
  reviewsLength: number;
}) => {
  const [t] = useTranslation('dining');
  return (
    <div className="flex">
      <Rating sizeClass="text-lg" value={rating} />
      <p className="px-2 text-xs font-normal text-dark-800">
        {reviewsLength} {t('reviews')}
      </p>
    </div>
  );
};

const PhoneAndEMail = ({
  className,
  urlSite,
  phone,
}: {
  className?: string;
  urlSite?: string;
  phone?: string;
}) => {
  return (
    <div className={className}>
      {urlSite ? (
        <a href="www.crakerball.com" className="mx-2 text-primary-1000">
          {urlSite}
        </a>
      ) : null}
      {urlSite && phone ? (
        <span className="text-xs font-normal text-dark-800">|</span>
      ) : null}
      {phone ? <span className="pl-2 text-dark-1000">{phone}</span> : null}
    </div>
  );
};

const SummaryDetail = ({
  className,
  name,
  rating,
  images,
  reviewsLength,
  phone,
  categories,
  isOpen,
  hours,
}: {
  className?: string;
  name: string;
  rating: number;
  images: string[];
  reviewsLength: number;
  phone: string;
  categories: string[];
  isOpen: boolean;
  hours?: string[];
}) => {
  return (
    <section className={`flex justify-center ${className}`}>
      <section className="max-w-[904px] w-full pt-9 pb-4 mx-auto">
        <h1 className="text-3xl">{name}</h1>
        <div className="flex mt-3">
          <RatingSection rating={rating} reviewsLength={reviewsLength} />
          <p>|</p>
          <PhoneAndEMail phone={phone} />
        </div>
      </section>
      {images && (
        <section className="hidden w-full pt-8 lg:block bg-dark-100">
          <ImageCarouselLargeScreen images={images} title="" />
        </section>
      )}
      <section className="max-w-[904px] w-full pt-6 pb-6 mx-auto">
        <AboutSummaryDetail
          categories={categories}
          isOpen={isOpen}
          hours={hours}
        />
      </section>
    </section>
  );
};

const TimeSelector = ({
  label,
  status = 'enabled',
  onSelect,
}: {
  label: string;
  status?: 'selected' | 'disabled' | 'enabled';
  onSelect: (key: string) => void;
}) => {
  const availableStatus = {
    selected: 'border-primary-1000 bg-primary-100 text-primary-1000',
    disabled: 'bg-dark-300 text-dark-700',
    enabled: 'border-dark-300 text-dark-700',
  };

  return (
    <button
      onClick={() => onSelect(label)}
      className={`w-full h-7 rounded-4 mb-4 border-[1px] ${availableStatus[status]}`}
    >
      {transformTo12hours(label)}
    </button>
  );
};

const DateSection = ({
  onDateChange,
}: {
  onDateChange: (value: string) => void;
}) => {
  const [t] = useTranslation('dining');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const params = useQuery();
  const handleEndDateChange = () => {
    // TODO: Do nothing
  };

  const [startDate, setStartDate] = useState<string>(
    params.startDate
      ? params.startDate.toString()
      : formatAsSearchDate(dayjs()),
  );

  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(1, 'day')),
  );

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    onDateChange(value);
  };

  return (
    <div>
      <DatePicker
        showDatePicker={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        startDateLabel={t('startDate')}
        endDateLabel={t('endDate')}
        initialStartDate={startDate}
        initialEndDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        openOnStart={false}
        isRange={false}
      />
      <section className="flex gap-4 lg:mt-0 lg:w-full">
        <IconInput
          label={t('startDate')}
          name="Check-in"
          placeholder="Placeholder"
          className="lg:mt-0"
          orientation="left"
          icon={<Calendar className="w-5 h-5 text-dark-700" />}
          value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
          onChange={(event) => handleStartDateChange(event.target.value)}
          onClick={() => setShowDatePicker(true)}
          disabled
        />
      </section>
    </div>
  );
};

const PersonSelect = ({
  onChange,
  defaultCovers = 1,
}: {
  onChange?: (covers: number) => void;
  defaultCovers?: number;
}) => {
  const [t] = useTranslation('dining');
  const people = [
    `1 ${t('person')}`,
    `2 ${t('people')}`,
    `3 ${t('people')}`,
    `4 ${t('people')}`,
    `5 ${t('people')}`,
    `6 ${t('people')}`,
    `7 ${t('people')}`,
    `8 ${t('people')}`,
    `9 ${t('people')}`,
    `10 ${t('people')}`,
  ];

  const onSelect = (value: string) => {
    const covers = people.findIndex((p) => p === value);
    if (onChange) {
      onChange(covers + 1);
    }
  };

  return (
    <Select
      label={t('tableFor')}
      options={people}
      onChange={onSelect}
      defaultValue={people[defaultCovers - 1]}
    />
  );
};

const AboutDetails = ({
  phone,
  categories,
  hours,
  onSelectDate,
  isOpen,
  onChange,
  defaultTime,
  onChangeCovers,
  defaultCovers,
}: {
  phone?: string;
  categories: string[];
  hours?: string[];
  onSelectDate: (date: string) => void;
  isOpen: boolean;
  onChange: (time: string) => void;
  defaultTime?: string;
  onChangeCovers?: (covers: number) => void;
  defaultCovers?: number;
}) => {
  const [t] = useTranslation('dining');

  const onSelect = (value: string) => {
    onChange(value);
  };

  return (
    <>
      <PhoneAndEMail className="py-1 lg:hidden" phone={phone} />
      <TimesDetail className="py-1 lg:hidden" isOpen={isOpen} />
      <CategoriesDetail
        className="py-1 pb-4 lg:hidden"
        categories={categories}
      />
      <SectionTitle title={t('about')} />
      <h5 className="mt-10 text-lg text-dark-800">{t('reservation')}</h5>
      <div className="relative grid grid-cols-1 mt-6 gap-x-3 md:grid-cols-2">
        <div className="w-full lg:w-[446px] mr-3">
          <DateSection onDateChange={onSelectDate} />
        </div>
        <div className="w-full lg:w-[446px] mt-6 md:mt-0">
          <PersonSelect
            onChange={onChangeCovers}
            defaultCovers={defaultCovers}
          />
        </div>
      </div>
      <h6 className="mt-6 text-sm text-dark-800 lg:hidden">{t('timeSlots')}</h6>
      <div className="grid grid-cols-4 mt-6 lg:grid-cols-6 gap-x-3">
        {hours && hours.length > 0 ? (
          hours?.map((value) => (
            <TimeSelector
              key={value}
              label={value}
              onSelect={onSelect}
              status={defaultTime === value ? 'selected' : 'enabled'}
            />
          ))
        ) : (
          <div>{t('closedDate')}</div>
        )}
      </div>
    </>
  );
};

const LearnMore = ({
  label,
  className,
  onClick,
  href,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={`text-primary-1000 hover:text-primary-1000 visited:text-primary-1000 text-base border-b-2 border-primary-1000 inline-block ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      className={`text-primary-1000 text-base border-b-2 border-primary-1000 m-auto flex ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const LocationDetail = ({ lat, long }: { lat: number; long: number }) => {
  const [t] = useTranslation('dining');
  return (
    <section className="flex-1 py-12 text-center">
      <SectionTitle className="pb-4" title={t('location')} />
      <LocationMap
        center={{
          latitude: lat,
          longitude: long,
        }}
        coords={[
          {
            latitude: lat,
            longitude: long,
          },
        ]}
        height={334}
      />
      <LearnMore
        className="mt-4"
        label={t('howToGetThere')}
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
      />
    </section>
  );
};

const Comment = ({
  comment,
  userName,
  rating,
  date,
}: {
  comment: string;
  userName: string;
  rating: number;
  date: string;
}) => {
  const dateString = dayjs(date).format('MM/DD/YYYY');
  return (
    <div className="mt-6 mb-2">
      <p className="pb-2 text-base text-dark-1000">{userName}</p>
      <div className="flex justify-between mb-2">
        <Rating value={rating} />
        <span className="block">{dateString}</span>
      </div>
      <p className="text-sm font-normal text-dark-800">{comment}</p>
    </div>
  );
};

const CustomerReviewsDetail = ({
  reviews,
  rating,
}: {
  reviews: {
    rating: number;
    text: string;
    timestamp: string;
    user: {
      name: string;
      image: string;
    };
  }[];
  rating: number;
}) => {
  const [t] = useTranslation('dining');
  return (
    <>
      <SectionTitle title={t('customerReview')} />
      <div className="flex items-center my-6">
        <span className="pr-5 text-base text-dark-1000">
          {t('overallRating')}
        </span>
        <Rating value={rating} />
        <span className="text-dark-800 text-[12px] pl-2">
          {reviews.length} {t('reviews')}
        </span>
      </div>
      <div>
        {reviews.map((review) => (
          <Comment
            key={review.text}
            comment={review.text}
            rating={review.rating}
            userName={review.user.name}
            date={review.timestamp}
          />
        ))}
      </div>
    </>
  );
};

type DiningDetailDisplayProps = CategoryPageComponentProps;

const DiningDetailDisplay = ({ Category }: DiningDetailDisplayProps) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
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
  const [t] = useTranslation('dining');
  const overviewLabel = t('overview');
  const locationLabel = t('location');
  const reviewsLabel = t('reviews');
  const noResultsLabel = t('noResultsSearch');
  const diningImages = data?.images;
  const overviewRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const daySelected = new Date(selectedDate).getDay() + 1;

  const available = data?.hours?.[0]?.open;
  const availableHours: string[] | undefined = available?.reduce(
    (acum, { start, end, day }) => {
      if (daySelected === day) {
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

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
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

    const itemToBook = {
      category: 'DINING',
      booking_data: {
        inventory_id: `817e6010:${id}`,
        date: formatAsSearchDate(selectedDate),
        time,
        covers,
      },
    };
    await addToCart(itemToBook, i18next, store);
    router.replace(url);
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
          <RatingSection rating={rating} reviewsLength={reviewsLength} />
        </section>
        <BlockDivider className="mt-5" />
        <section className="px-4">
          <HorizontalTabs
            tabs={tabs}
            activeTab={activeTab}
            onClick={handleTabClick}
          />
        </section>
      </section>
    );
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
    <div className="flex">
      <main className="relative flex-1 h-full max-h-[calc(100vh-129px)] overflow-y-scroll">
        <SummaryDetail
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
            <AboutDetails
              phone={data.display_phone}
              categories={data.categories}
              hours={availableHours}
              onSelectDate={onSelectDate}
              isOpen={!data.is_closed}
              onChange={(newTime) => setTime(newTime)}
              defaultTime={time}
              onChangeCovers={(newCovers) => setCovers(newCovers)}
              defaultCovers={covers}
            />
          </section>
        </section>
        <section
          ref={locationRef}
          className="flex justify-center border-b-2 border-dark-300"
        >
          <section className="max-w-[904px] w-full flex lg:px-0 px-4">
            <LocationDetail
              lat={data.location.latitude}
              long={data.location.longitude}
            />
          </section>
        </section>
        <section ref={reviewsRef} className="flex justify-center mt-12">
          <section className="max-w-[904px] w-full lg:px-0 px-4">
            <CustomerReviewsDetail
              rating={data.rating}
              reviews={data.reviews}
            />
          </section>
        </section>
      </main>
      <DiningItineraryDetail name={data.name} handleAction={handleAction} />
      <div className="fixed bottom-0 w-full px-3 py-5 bg-white lg:hidden drop-shadow">
        <DiningItineraryActions handleAction={handleAction} />
      </div>
    </div>
  );
};

export default DiningDetailDisplay;
