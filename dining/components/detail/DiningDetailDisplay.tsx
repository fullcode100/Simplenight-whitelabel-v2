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
import Arrows from 'public/icons/assets/arrows.svg';
import LocationMap from '../../../components/global/LocationMap/LocationMap';
import i18next, { t } from 'i18next';
import { Tab } from 'components/global/Tabs/types';
import BlockDivider from 'components/global/Divider/BlockDivider';
import HorizontalTabs from 'components/global/Tabs/HorizontalTabs';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Select from 'components/global/Select/Select';
import Image from 'next/image';
import { useSearchQueries } from 'hotels/hooks/useSearchQueries';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { useSelector } from 'react-redux';
import { DiningDetailPreRequest } from 'dining/types/request/DiningDetailRequest';
import {
  DiningSearchResponse,
  Restaurant,
  Hour,
} from 'dining/types/response/SearchResponse';
import Loader from 'components/global/Loader/Loader';
import EmptyState from 'components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import Dining from 'public/icons/categories/Category-Dining.svg';
import Button from 'components/global/Button/Button';
import BreakdownTotal from 'components/checkout/BreakdownTotal/BreakdownTotal';

const HighlightedText = ({ label }: { label: string }) => {
  return (
    <div className="px-1 mr-3 bg-teal-100 text-teal-1000 rounded-4">
      {label}
    </div>
  );
};

const TimesDetail = ({
  className,
  isOpen,
}: {
  className?: string;
  isOpen?: boolean;
}) => {
  return (
    <div className={`flex ${className}`}>
      <div className="flex items-center bg-green-100 rounded-4 w-[67px] justify-center text-green-1000">
        <ClockIcon />
        <span className="pl-2">{isOpen ? 'Open' : 'Closed'}</span>
      </div>
      <div>
        <span className="pl-3 text-sm text-dark-700">9am - 5pm</span>
      </div>
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
}: {
  categories: string[];
  isOpen?: boolean;
}) => {
  return (
    <div className="flex">
      <div className="flex">
        <TimesDetail />
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
  return (
    <div className="flex">
      <Rating sizeClass="text-lg" value={rating} />
      <p className="px-2 text-xs font-normal text-dark-800">
        {reviewsLength} Reviews
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
        <a href="www.crakerball.com" className="mx-2 text-teal-1000">
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
}: {
  className?: string;
  name: string;
  rating: number;
  images: string[];
  reviewsLength: number;
  phone: string;
  categories: string[];
  isOpen: boolean;
}) => {
  const [openImages, setOpenImages] = useState(false);
  return (
    <section className={`flex justify-center ${className}`}>
      <section className="max-w-[904px] w-full pt-9 pb-6 mx-auto">
        <h1 className="text-3xl">{name}</h1>
        <div className="flex mt-3">
          <RatingSection rating={rating} reviewsLength={reviewsLength} />
          <p>|</p>
          <PhoneAndEMail phone={phone} />
        </div>
        <div className="py-4">
          <div className="flex">
            <Image
              width={536}
              height={276}
              className="max-w-[536px] max-h-[276px] w-full"
              src={images[0]}
              alt="Dining image"
            />
            <div className="ml-2">
              <Image
                width={357}
                height={225}
                className="max-w-[357px] max-h-[225px] w-full"
                src={images[1]}
                alt="Dining image"
              />
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => setOpenImages(true)}
                  className="flex items-center justify-center w-[40px] h-[40px] rounded-[50%] border-teal-1000 border-2"
                >
                  <Arrows />
                </button>
              </div>
            </div>
          </div>
        </div>
        <AboutSummaryDetail categories={categories} isOpen={isOpen} />
      </section>
      {openImages && (
        <section
          onClick={() => setOpenImages(false)}
          className="fixed top-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-25"
        >
          <div
            className="max-w-[757px] w-full h-full max-h-[444px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ImageCarousel images={images} title="" />
          </div>
        </section>
      )}
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
    selected: 'border-teal-1000 bg-teal-100 text-teal-1000',
    disabled: 'bg-dark-300 text-dark-700',
    enabled: 'border-dark-300 text-dark-700',
  };

  return (
    <button
      onClick={() => onSelect(label)}
      className={`w-full h-7 rounded-4 mb-4 border-[1px] ${availableStatus[status]}`}
    >
      {label}
    </button>
  );
};

const DateSection = ({
  onDateChange,
}: {
  onDateChange: (value: string) => void;
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const params = useQuery();
  const handleEndDateChange = () => {
    console.log('test');
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
        startDateLabel="Date"
        initialStartDate={startDate}
        initialEndDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        openOnStart={false}
        endDateLabel={'Date'}
      />
      <section className="flex gap-4 lg:mt-0 lg:w-full">
        <IconInput
          label="Date"
          name="Check-in"
          placeholder="Placeholder"
          className="lg:mt-0"
          orientation="left"
          icon={<Calendar className="w-5 h-5 text-dark-700" />}
          value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
          onChange={(event) => handleStartDateChange(event.target.value)}
          onClick={() => {
            setClickOnStart(true);
            setShowDatePicker(true);
          }}
          disabled
        />
      </section>
    </div>
  );
};

const people = [
  '1 Person',
  '2 people',
  '3 people',
  '4 people',
  '5 people',
  '6 people',
  '7 people',
  '8 people',
  '9 people',
  '10 people',
];

const PersonSelect = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return <Select label="Table For" options={people} />;
};

const AboutDetails = ({
  phone,
  categories,
  hours,
  daySelected,
  onSelectDate,
  isOpen,
}: {
  phone?: string;
  categories: string[];
  hours: Hour[];
  daySelected: number;
  onSelectDate: (date: string) => void;
  isOpen: boolean;
}) => {
  const available = hours?.[0]?.open;
  const [selected, setSelected] = useState<string>('');

  const onSelect = (value: string) => {
    setSelected(value);
  };

  const acum: string[] = available?.reduce((acum, { start, end, day }) => {
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
  }, [] as string[]);

  return (
    <>
      <PhoneAndEMail className="py-1 lg:hidden" phone={phone} />
      <TimesDetail className="py-1 lg:hidden" isOpen={isOpen} />
      <CategoriesDetail
        className="py-1 pb-4 lg:hidden"
        categories={categories}
      />
      <SectionTitle title="About" />
      {/* <h5 className="pb-3 mt-10 text-dark-800">Description</h5>
      <p className="text-dark-1000">
        The prestigious AAA Five Diamond award-winning Waldorf Astoria Chicago
        offers Parisian-inspired elegance in downtowns Gold Coast neighborhood.
        An urban sanctuary, the hotel offers easy access to all the city has to
        offer. Lorem ipsum sit dolor amet quiscam hic nihil mori dator
      </p> */}
      <h5 className="mt-10 text-lg text-dark-800">Reservation</h5>
      <div className="relative grid grid-cols-1 mt-6 gap-x-3 md:grid-cols-2">
        <div className="w-full lg:w-[446px] mr-3">
          <DateSection onDateChange={onSelectDate} />
        </div>
        <div className="w-full lg:w-[446px] mt-6 md:mt-0">
          <PersonSelect />
        </div>
      </div>
      <h6 className="mt-6 text-sm text-dark-800 lg:hidden">
        Time slots available
      </h6>
      <div className="grid grid-cols-4 mt-6 lg:grid-cols-6 gap-x-3">
        {acum.length > 0 ? (
          acum?.map((value) => (
            <TimeSelector
              key={value}
              label={value}
              onSelect={onSelect}
              status={selected === value ? 'selected' : 'enabled'}
            />
          ))
        ) : (
          <div>Closed on this date</div>
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
        className={`text-teal-1000 hover:text-teal-1000 visited:text-teal-1000 text-base border-b-2 border-teal-1000 inline-block ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      className={`text-teal-1000 text-base border-b-2 border-teal-1000 m-auto flex ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const DishDetail = () => {
  return (
    <div className="flex p-3 mb-2 border-2 rounded-4">
      <div className="h-[84px] min-w-[68px] pr-3">
        <img src="https://dummyimage.com/68x84/46d499/fff" />
      </div>
      <div>
        <h5 className="text-lg text-dark-1000">Hakata Tonkotsu</h5>
        <p className="text-xs text-dark-800">
          Velit officia consequat duis enim velit mollit. Exercitation veniam
          consequat sunt nostrud amet.
        </p>
      </div>
    </div>
  );
};

const PopularDishesDetail = () => {
  return (
    <section className="flex-1 py-12 pr-12">
      <SectionTitle className="pb-6" title="Popular Dishes" />
      <DishDetail />
      <DishDetail />
      <LearnMore
        label="See Full Menu"
        onClick={() => {
          // TODO
        }}
      />
    </section>
  );
};

const LocationDetail = ({ lat, long }: { lat: number; long: number }) => {
  return (
    <section className="flex-1 py-12 text-center">
      <SectionTitle className="pb-4" title="Location" />
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
        zoom={17}
        height={334}
      />
      <LearnMore
        className="mt-4"
        label="How To Get There?"
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
      />
    </section>
  );
};

const FilterOption = ({
  label,
  status = 'unSelected',
}: {
  label: string;
  status?: 'unSelected' | 'selected';
}) => {
  const availableStatus = {
    selected: 'border-teal-300 bg-teal-100 text-teal-1000',
    unSelected: 'text-dark-800 border-dark-300',
  };

  return (
    <div
      className={`border-2 rounded-4 px-3 py-2 text-xs mr-2 whitespace-nowrap ${availableStatus[status]}`}
    >
      {label}
    </div>
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
      {/* <p className="pt-4 pb-2 text-sm font-semibold text-dark-800">
        Good Things
      </p> */}
      <p className="text-sm font-normal text-dark-800">{comment}</p>
      {/* <p className="pt-4 pb-2 text-sm text-dark-800">Bad Things</p>
      <p className="pb-6 text-sm font-normal text-dark-800">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet.
      </p> */}
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
  return (
    <>
      <SectionTitle title="Customer Reviews" />
      <div className="flex items-center my-6">
        <span className="pr-5 text-base text-dark-1000">Overall rating</span>
        <Rating value={rating} />
        <span className="text-dark-800 text-[12px] pl-2">
          {reviews.length} reviews
        </span>
      </div>
      {/* <div className="flex mb-6 overflow-x-auto">
        <FilterOption label="Show All" status="selected" />
        <FilterOption label="Revelant" />
        <FilterOption label="Recommended" />
        <FilterOption label="Good" />
        <FilterOption label="Bad" />
      </div> */}
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

const DiningIconCircle = () => {
  return (
    <section className="rounded-full grid place-content-center min-h-[40px] min-w-[40px] bg-teal-1000 text-white">
      <div className="w-[25px] h-[25px]">
        <Dining />
      </div>
    </section>
  );
};

const ItemItinerary = ({ label }: { label: string }) => {
  return (
    <div className="flex justify-between py-1 text-xs">
      <p>
        <span className="pr-3 text-lg leading-3 text-teal-1000">+</span>
        {label}
      </p>
      <p>US$0.00</p>
    </div>
  );
};

const TotalItinerary = ({ label }: { label: string }) => {
  return (
    <div className="flex justify-between text-xs">
      <p>{label}</p>
      <p className="text-lg">US$0.00</p>
    </div>
  );
};

const ItineraryBottom = () => {
  return (
    <div>
      <BreakdownTotal total="Free" />
      <Button
        className="mt-3"
        value="Add To Itinerary"
        type="outlined"
        size="full"
      />
      <Button className="mt-3" value="Book Now" size="full" />
    </div>
  );
};

const ItineraryDining = ({ name }: { name: string }) => {
  return (
    <div className="lg:block hidden w-full max-w-[376px] border-[1px] flex flex-col max-h-[calc(100vh-129px)]">
      <div className="flex items-center px-5 py-6 text-xs border-b-[1px]">
        <DiningIconCircle />
        <h4 className="pl-3">{name}</h4>
      </div>
      <div className="flex flex-col content-between flex-1 p-6">
        <div className="flex-1">
          <ItemItinerary label="Base Price" />
          <ItemItinerary label="Taxes" />
          <BlockDivider className="my-3" />
          <TotalItinerary label="Pay Now" />
          <a
            href="https://google.com"
            className="border-b-[1px] border-teal-1000 text-teal-1000 hover:text-teal-1000"
          >
            Terms Of Service
          </a>
        </div>
        <ItineraryBottom />
      </div>
    </div>
  );
};

type DiningDetailDisplayProps = CategoryPageComponentProps;

const DiningDetailDisplay = ({ Category }: DiningDetailDisplayProps) => {
  const { language } = i18next;
  const params = useQuery();
  const { startDate, endDate } = useSearchQueries();
  const { id } = params;
  const storeCurrency = useSelector((state: any) => state.core.currency);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [currency, setCurrency] = useState<string>(storeCurrency);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(startDate);
  const data = restaurant;
  const overviewLabel = t('overview', 'Overview');
  const locationLabel = t('location', 'Location');
  const reviewsLabel = t('reviews', 'Reviews');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');

  const overviewRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const daySelected = new Date(selectedDate).getDay() + 1;

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
        />
        <section className="w-full lg:hidden">
          <ImageCarousel images={data.images} title="" />
        </section>
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
              hours={data.hours}
              daySelected={daySelected}
              onSelectDate={onSelectDate}
              isOpen={!data.is_closed}
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
      <ItineraryDining name={data.name} />
      <div className="fixed bottom-0 w-full px-3 py-5 bg-white lg:hidden drop-shadow">
        <ItineraryBottom />
      </div>
    </div>
  );
};

export default DiningDetailDisplay;
