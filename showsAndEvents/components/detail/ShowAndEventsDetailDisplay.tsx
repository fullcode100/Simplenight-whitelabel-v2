import useQuery from 'hooks/pageInteraction/useQuery';
import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import dayjs from 'dayjs';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import InformationIcon from 'public/icons/assets/information.svg';
import PoliciesIcon from 'public/icons/assets/policies.svg';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import useCookies from 'hooks/localStorage/useCookies';
import Script from 'next/script';
import LocationPin from 'public/icons/assets/location-pin.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import { icons } from 'antd/lib/image/PreviewGroup';
import LocationMap from 'components/global/LocationMap/LocationMap';
import FilterFormDesktop from './Filters/FilterFormDesktop';
import ResultsOptionsBar from '../ResultsOptionsBar/ResultsOptionsBar';
import FilterFormMobile from './Filters/FilterFormMobile';
import CollapseElement from 'components/global/CollapseElement/CollapseElement';
import showsAndEventsMock from './utils/initialState';
import ThingsCancellable from '../search/ShowsCancellable/ShowsCancellable';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import ResultCard from '../search/ResultCard/ResultCard';
import { ThingsCategory } from 'thingsToDo';
import { ShowsSearchResponse as iShowAndEventsResult } from '../../types/response/ShowsSearchResponse';
import Carousel from 'react-multi-carousel';
import CustomArrow from 'components/global/CarouselNew/components/CustomArrow';
import CustomDot from 'components/global/CarouselNew/components/CustomDot';
import Chevron from 'public/icons/assets/chevron-down.svg';
import SearchInput from 'components/global/Input/SearchInput';
import SearchIcon from 'public/icons/assets/Search.svg';
import Sort from 'public/icons/assets/sort.svg';
import TicketTabs from '../TicketTabs';
import TicketCard from './TicketCard';
import { sectors } from '../../mocks/showsAndEventsMock';
import Image from 'next/image';
import { SORT_SECTOR_BY_OPTIONS } from 'showsAndEvents/constants/sortByOptions';
import SelectedSeatsBar from './SelectedSeatsBar';
import classnames from 'classnames';

type ShowAndEventsDetailDisplayProps = CategoryPageComponentProps;

declare let window: CustomWindow;

interface SectorInfoProp {
  title: string;
  isActive: boolean;
}
interface selectedSeatsProp {
  title: string;
  quantity: number;
  basePrice: number;
  discountPercent: number;
  taxes: number;
  cancellationPolicy: string;
  currency: string;
}
interface iTicketCard {
  title: string;
  availableTime: string;
  seatTogether: boolean;
  availableSeats: number;
  price: number;
  currency: string;
  sectorTitle: string;
}

const ShowAndEventsDetailDisplay = ({
  Category,
}: ShowAndEventsDetailDisplayProps) => {
  const params = useQuery();
  const {
    id,
    name,
    fromDate,
    addres,
    extra_data: extraData,
    slug,
    cancellation_policy: cancellationPolicy,
  } = params;
  const referralParam = params.referral as string;
  const { setCookie } = useCookies();
  const [selectedTab, setSelectedTab] = useState<ReactNode>('All sectors');

  const [loaded, setLoaded] = useState(false);
  const [showMobileFilters, setShowMobileFilter] = useState(false);
  const [formatDate, setFormatDate] = useState('');
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [selectedSeats, setSelectedSeats] = useState<selectedSeatsProp>({
    title: 'test Title',
    quantity: 2,
    basePrice: 9,
    discountPercent: 10,
    taxes: 10,
    cancellationPolicy: 'test',
    currency: 'test',
  });
  const [showSelectedSeatsBar, setShowSelectedSeatsBar] =
    useState<boolean>(false);
  const [addresObject, setAddressObject] = useState({
    address1: '',
    city: '',
    country_code: '',
    postal_code: '',
    coordinates: { latitude: 0, longitude: 0 },
  });
  const [extraDataObject, setExtraDataObject] = useState({
    venue_name: '',
    seats: null,
    starts_at: '',
    description: '',
    seat_map: null,
    images: [],
  });
  const [t, i18next] = useTranslation('things');
  const [tg] = useTranslation('global');
  const sortLabel = tg('sort', 'Sort');
  const thingsToDoLabel = t('shows', 'Shows');
  const { language } = i18next;
  const {
    address1,
    city,
    country_code: countryCode,
    postal_code: postalCode,
    coordinates,
  } = addresObject;

  const { description } = extraDataObject;

  useEffect(() => {
    if (id) {
      setLoaded(true);
    }
  }, [id]);

  useEffect(() => {
    if (fromDate) {
      const newFormatDate = dayjs(fromDate as string).format(
        'MMM D, YYYY HH:mm',
      );
      setFormatDate(newFormatDate);
    }
  }, [fromDate]);

  useEffect(() => {
    if (addres) {
      let newAddressObject;
      try {
        newAddressObject = JSON.parse(addres as string);
        setAddressObject(newAddressObject);
      } catch (error) {
        console.error(error);
      }
    }
  }, [addres]);

  useEffect(() => {
    if (extraData) {
      let newExtraDataObject;
      try {
        newExtraDataObject = JSON.parse(extraData as string);
        setExtraDataObject(newExtraDataObject);
      } catch (error) {
        console.error(error);
      }
    }
  }, [extraData]);

  const showAndEventsList = () => {
    const urlDetail = (thingToDo: iShowAndEventsResult) => {
      const {
        id,
        name,
        address,
        reviews,
        phone_number: phoneNumber,
        tags,
        images,
        fromDate,
        toDate,
        cancellation_policy: cancellationPolicy,
        rate,
        extra_data: extraData,
      } = thingToDo;

      let stringAddresObject = '';
      let stringExtraDataObject = '';
      try {
        stringAddresObject = JSON.stringify(address);
        stringExtraDataObject = JSON.stringify(extraData);
      } catch (error) {
        console.error(error);
      }
      return `/detail/${slug}/${id}?name=${name}&addres=${stringAddresObject}&reviews=${reviews}&extra_data=${stringExtraDataObject}&phone_number=${phoneNumber}
        &tags=${tags}&images=${images}&fromDate=${fromDate}&toDate=${toDate}&cancellation_policy=${cancellationPolicy}&rates=${rate}`;
    };
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
        partialVisibilityGutter: 40,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1450 },
        items: 3,
        partialVisibilityGutter: 30,
      },
      tablet: {
        breakpoint: { max: 1450, min: 870 },
        items: 2,
        partialVisibilityGutter: 30,
      },
      mobile: {
        breakpoint: { max: 870, min: 0 },
        items: 1,
        partialVisibilityGutter: 20,
      },
    };

    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        <div className="px-6">
          {getSectionTitle('You May Also Like', undefined, undefined)}
        </div>
        <Carousel
          partialVisible
          responsive={responsive}
          infinite
          showDots
          autoPlay
          shouldResetAutoplay
          customLeftArrow={
            <CustomArrow
              className="z-[5] absolute left-0 -translate-y-7"
              position="left"
            />
          }
          customRightArrow={
            <CustomArrow
              className="z-[5] absolute right-0 -translate-y-7"
              position="right"
            />
          }
        >
          {showsAndEventsMock.map((thingToDo: any) => {
            const url = urlDetail(thingToDo);
            const {
              id,
              name,
              address,
              reviews: { rating, amount: reviewsAmount },
              phone_number: phoneNumber,
              tags,
              images,
              fromDate,
              toDate,
              cancellation_policy: cancellationPolicy,
              rate,
            } = thingToDo;
            const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

            return (
              <div
                key={id}
                className=""
                style={{ minWidth: '391px', minHeight: '200px' }}
              >
                <ResultCard
                  url={url}
                  icon={ThingsCategory.icon}
                  categoryName={thingsToDoLabel}
                  item={thingToDo}
                  title={name}
                  images={images}
                  address={formattedLocation}
                  className=" flex-0-0-auto"
                  rating={rating}
                  fromDate={fromDate}
                  toDate={toDate}
                  reviewsAmount={reviewsAmount}
                  phoneNumber={phoneNumber}
                  tags={tags}
                  isHorizontal
                  cancellable={
                    <ThingsCancellable
                      cancellationPolicy={cancellationPolicy}
                    />
                  }
                  priceDisplay={
                    <PriceDisplay
                      rate={rate}
                      totalLabel={`USD ${rate?.total?.formatted}`}
                    />
                  }
                />
              </div>
            );
          })}
        </Carousel>
      </>
    );
  };

  const getSectionTitle = (
    text: string,
    Icon: React.ElementType | undefined,
    RightElement: React.ElementType | undefined,
  ) => {
    return (
      <div className="align-middle flex mb-4 justify-between">
        <div>
          {Icon && (
            <IconRoundedContainer className="bg-primary-1000 inline-flex mr-2">
              <Icon className="text-white h-5 w-5 lg:h-[30px] lg:w-[30px]" />
            </IconRoundedContainer>
          )}
          <h3 className={`inline-flex ${!Icon ? '' : 'pl-3'}`}>{text}</h3>
        </div>
        {RightElement && (
          <div>
            <RightElement />
          </div>
        )}
      </div>
    );
  };

  const getSectorsInfo: SectorInfoProp[] = sectors.map(({ title }) => {
    return { title, isActive: false };
  });

  const buildSelectedSeastsInfo = ({
    title,
    currency,
    price,
    sectorTitle,
  }: iTicketCard) => {
    const newSelectedSeat: selectedSeatsProp = {
      title: `${sectorTitle} ${title}`,
      basePrice: price,
      cancellationPolicy: 'cancellationPolicy as string',
      currency,
      // review source
      discountPercent: 10,
      // review source
      quantity: 10,
      // review source
      taxes: 10,
    };

    setSelectedSeats(newSelectedSeat);
    setShowSelectedSeatsBar(true);
  };

  const setSector = () => {
    return (
      <section className="pb-6 mb-6">
        <label className="align-bottom flex">Sector</label>
        <SearchInput
          icon={<SearchIcon className="h-5 w-5 text-dark-700 lg:w-full" />}
          name="search"
          placeholder={'Search Sector'}
          routeParams={['type']}
        />
        <TicketTabs
          sectorsInfo={getSectorsInfo}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <ResultsOptionsBar
          results={sectors
            .filter(
              ({ title }) =>
                selectedTab === 'All sectors' || selectedTab === title,
            )
            .reduce((count, { rows }) => {
              return count + rows.length;
            }, 0)}
          sortByOptions={SORT_SECTOR_BY_OPTIONS}
          onClickFilter={() => setShowMobileFilter(!showMobileFilters)}
        />
        <CollapseElement show={showMobileFilters}>
          <FilterFormMobile />
        </CollapseElement>
        {/* <section className="flex items-center justify-between  pt-3 pb-3 lg:mt-4 lg:pb-0">
          <section
            className={`absolute z-10 border border-dark-300 rounded shadow-container top-100 bg-white w-[335px]  transition-all duration-500 text-dark-1000 ${
              !showSortModal && 'opacity-0 invisible'
            }`}
          >
          </section>
          <p className="text-md leading-5 lg:text-[18px] lg:leading-[18px] font-semibold">
            {sectors
              .filter(
                ({ title }) =>
                  selectedTab === 'All sectors' || selectedTab === title,
              )
              .reduce((count, { rows }) => {
                return count + rows.length;
              }, 0)}{' '}
            Results
          </p>
        </section> */}
        {sectors
          .filter(
            ({ title }) =>
              selectedTab === 'All sectors' || selectedTab === title,
          )
          .map(({ title, rows }, id) => {
            return (
              <div key={id} className="mt-4">
                <p className="text-lg leading-5 lg:text-[22px] lg:leading-[24px] font-semibold">
                  {title}
                </p>
                {rows.map((row, id) => {
                  return (
                    <a
                      key={id}
                      className="hover:text-inherit"
                      onClick={() =>
                        buildSelectedSeastsInfo({
                          ...row,
                          sectorTitle: title,
                        } as iTicketCard)
                      }
                    >
                      <TicketCard {...row} sectorTitle={title} />
                    </a>
                  );
                })}
              </div>
            );
          })}
      </section>
    );
  };

  const getDescription = () => {
    return (
      <section className="pb-6">
        {getSectionTitle('Details', InfoCircle, undefined)}
        <label className="align-middle flex mb-2 text-xl">Description</label>
        <span className="flex text-xl">{description}</span>
      </section>
    );
  };

  const getLocation = () => {
    const RightElement = () => {
      return (
        <>
          <span className="block text-right">{address1}</span>
          <span className="block text-right">
            {`${city}, ${countryCode}, ${postalCode}`}
          </span>
        </>
      );
    };
    return (
      <section className="pb-6">
        {getSectionTitle('Location', LocationPin, RightElement)}
        <div className="pt-2">
          <LocationMap center={coordinates} />
        </div>
      </section>
    );
  };

  const getHeader = () => {
    return (
      <section className="pb-6 border-b-2 mb-6">
        {getSectionTitle(name as string, undefined, undefined)}
        <label className="align-middle flex mb-2">
          <Calendar className="text-primary-1000 h-4 w-4 mr-2.5" />
          {formatDate}
        </label>
        <label className="align-bottom flex">
          <LocationPin className="text-primary-1000 h-4 w-4 mr-2.5" />
          {address1}
        </label>
      </section>
    );
  };

  const getSeatsMap = () => {
    // We wll use the script value from the BE to build the seatsMap
    return (
      <Image
        src={require('../../mocks/images/seatsMap.png')}
        width={500}
        height={500}
      />
    );
  };

  return (
    <>
      {loaded && (
        <main className="relative w-full">
          <section className="grid grid-cols-3">
            <section
              className={classnames({
                'col-span-2': showSelectedSeatsBar,
                'col-span-3': !showSelectedSeatsBar,
              })}
            >
              <section
                className={classnames('grid grid-cols-1 lg:grid-cols-5 py-6', {
                  'xl:px-0': showSelectedSeatsBar,
                  'xl:px-20': !showSelectedSeatsBar,
                })}
              >
                <section className="xl:mr-16 px-6 py-6 lg:h-[800px] lg:overflow-y-auto col-span-3">
                  <section className="flex lg:hidden content-center justify-center">
                    {getSeatsMap()}
                  </section>
                  {getHeader()}
                  {setSector()}
                </section>
                <section className="px-6 py-6 col-span-2">
                  <section className="hidden lg:flex content-center justify-center">
                    {getSeatsMap()}
                  </section>
                  <section className="hidden lg:block">
                    <FilterFormDesktop />
                  </section>
                </section>
              </section>
              <section
                className={classnames(
                  'grid grid-cols-1 lg:grid-cols-2 border-t-2',
                  {
                    'xl:px-0': showSelectedSeatsBar,
                    'xl:px-20': !showSelectedSeatsBar,
                  },
                )}
              >
                <section className="px-6 py-12 lg:border-r-2">
                  {getDescription()}
                </section>
                <section className="px-6 py-12">{getLocation()}</section>
              </section>
              <section className="grid grid-cols-1 lg:pl-20 lg:pr-0 px-4 py-6 border-t-2 bg-dark-100">
                {showAndEventsList()}
              </section>
            </section>
            {showSelectedSeatsBar && (
              <section className="col-span-1 border-l-2 sticky top-32 h-[45%]">
                <section className="sticky w-full">
                  <SelectedSeatsBar
                    selectedSeats={selectedSeats}
                    hideBar={() => setShowSelectedSeatsBar(false)}
                  />
                </section>
              </section>
            )}
          </section>
        </main>
      )}
      {!loaded && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};

export default ShowAndEventsDetailDisplay;
