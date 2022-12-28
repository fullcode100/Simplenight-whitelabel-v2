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
import FilterFormDesktop, { filters } from './Filters/FilterFormDesktop';
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
import {
  DetailRequest,
  SimilarEventRequest,
} from 'showsAndEvents/types/request/ShowsSearchRequest';
import { useCategorySlug } from 'hooks/category/useCategory';
import {
  CancelationPolicy,
  Sector,
  ShowDetailItem,
  Rate,
} from 'showsAndEvents/types/response/ShowsDetailResponse';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import IconInput from 'components/global/Input/IconInput';
import { SearchRequest } from 'types/search/SearchRequest';

type ShowAndEventsDetailDisplayProps = CategoryPageComponentProps;

interface SectorInfoProp {
  title: string;
  isActive: boolean;
}

interface selectedSeatsProp {
  sector: string;
  row: string;
  title: string;
  quantity: any;
  basePrice: number;
  discountPercent: string;
  discountAmount: number;
  taxes: number;
  cancellationPolicy: CancelationPolicy;
  currency: string;
  deliveryMethods: string[];
  bookingCodeSupplier: string;
}
interface iTicketCard {
  row: string;
  availableSeats: number;
  rate: Rate;
  currency: string;
  sectorTitle: string;
  delivery_methods: string[];
  booking_code_supplier: string;
  cancellation_policy: CancelationPolicy;
  quantity: number;
}

const ShowAndEventsDetailDisplay = ({
  Category,
}: ShowAndEventsDetailDisplayProps) => {
  const {
    ClientDetailer: Detailer,
    ClientAvailability: Availability,
    ClientSearcher: Searcher,
  } = Category.core;

  const params = useQuery();
  const { id, fromDate, toDate, slug } = params;
  const [selectedTab, setSelectedTab] = useState<ReactNode>('All sectors');

  const [showEventItem, setShowEventItem] = useState<ShowDetailItem>();
  const [similarShowEventItems, setSimilarShowEventItems] =
    useState<ShowDetailItem[]>();

  const [loaded, setLoaded] = useState(false);
  const [similarEventsLoaded, setSimilarEventsLoaded] = useState(false);
  const [showMobileFilters, setShowMobileFilter] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>();

  const [currentCancellation, setCurrentCancellation] = useState<string>('');

  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [extraDataSeats, setExtraDataSeats] = useState<any>();
  const [maxSectorPrice, setMaxSectorPrice] = useState(0);
  const [showSelectedSeatsBar, setShowSelectedSeatsBar] =
    useState<boolean>(false);
  const [addresObject, setAddressObject] = useState({
    address1: '',
    country_code: '',
    city: '',
    country: '',
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
    relation_id: '',
  });
  const [t, i18next] = useTranslation('events');
  const sectorLabel = t('sector', 'Sector');
  const [tg] = useTranslation('global');
  const sortLabel = tg('sort', 'Sort');
  const thingsToDoLabel = t('shows', 'Shows');
  const { language } = i18next;
  const {
    address1,
    country_code: countryCode,
    city,
    country,
    postal_code: postalCode,
    coordinates,
  } = addresObject;
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  useEffect(() => {
    if (id) {
      setLoaded(true);
    }
  }, [id]);

  const groupBySectors = (sectorSeats: any) => {
    const groupToValues = sectorSeats.reduce(function (
      obj: { [x: string]: any[] },
      item: { section: string | number },
    ) {
      obj[item.section] = obj[item.section] || [];
      obj[item.section].push(item);
      return obj;
    },
    {});
    const groups = Object.keys(groupToValues).map(function (key) {
      return { title: key, rows: groupToValues[key] };
    });
    return groups;
  };

  const getMaxSectorPrice = (sectorSeats: any) => {
    let maxSectorPrice = 0;
    sectorSeats.forEach((item: any) => {
      const amount = item.rate.total.net.amount;
      if (amount > maxSectorPrice) {
        maxSectorPrice = amount;
      }
    });
    return maxSectorPrice;
  };

  useEffect(() => {
    if (extraDataObject?.relation_id) {
      const {
        coordinates: { latitude, longitude },
      } = addresObject;
      const params: SearchRequest = {
        start_date: formatAsSearchDate(fromDate as string),
        end_date: formatAsSearchDate(toDate as string),
        rsp_fields_set: 'basic',
        relation_id: extraDataObject.relation_id,
        dst_geolocation: `${latitude},${longitude}`,
        apiUrl,
      };
      Searcher?.request?.(params as SearchRequest, i18next)
        .then(({ items }) => {
          setSimilarShowEventItems(items);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [extraDataObject]);

  useEffect(() => {
    const params: DetailRequest = {
      start_date: formatAsSearchDate(fromDate as string),
      end_date: formatAsSearchDate(toDate as string),
      rsp_fields_set: 'extended',
      seats: '1' as string,
      apiUrl,
    };
    setLoaded(false);
    if (id) {
      Detailer?.request?.(params, i18next, id)
        .then(({ items }) => {
          setShowEventItem(items[0]);
          setAddressObject(items[0].address);
          setCurrentCancellation(
            items[0].cancellation_policy.cancellation_type,
          );

          setExtraDataObject(items[0].extra_data);
          setExtraDataSeats(items[0].extra_data.seats);

          setLoaded(true);
        })
        .catch((e) => {
          console.error(e);
          setLoaded(true);
          // setEmptyState(true);
        });
    }
  }, [id, fromDate, toDate]);

  const filterSectors = (filter: filters) => {
    if (extraDataSeats) {
      const finalData = extraDataSeats.filter((item: any) => {
        return (
          item.purchasable_quantities.includes(+filter.seats) &&
          item.rate.total.net.amount >= filter.minPrice &&
          item.rate.total.net.amount <= filter.maxPrice
        );
      });
      setSectors(groupBySectors(finalData));
    }
  };

  useEffect(() => {
    if (extraDataSeats) {
      setSectors(groupBySectors(extraDataSeats));
      setMaxSectorPrice(getMaxSectorPrice(extraDataSeats));
    }
  }, [extraDataSeats]);

  const { description } = extraDataObject;
  const showAndEventsList = () => {
    if (!similarShowEventItems) {
      return;
    }
    const urlDetail = (thingToDo: iShowAndEventsResult) => {
      const { id } = thingToDo;

      return `/detail/${slug}/${id}?fromDate=${fromDate}&toDate=${toDate}`;
    };
    const responsive = {
      '3xl': {
        breakpoint: { max: 4000, min: 2350 },
        items: 5,
        partialVisibilityGutter: 80,
      },
      '2xl': {
        breakpoint: { max: 2350, min: 1820 },
        items: 4,
        partialVisibilityGutter: 80,
      },
      xl: {
        breakpoint: { max: 1820, min: 1380 },
        items: 3,
        partialVisibilityGutter: 80,
      },
      lg: {
        breakpoint: { max: 1380, min: 1024 },
        items: 3,
        partialVisibilityGutter: 10,
      },
      md: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        partialVisibilityGutter: 30,
      },
      sm: {
        breakpoint: { max: 768, min: 670 },
        items: 1,
        partialVisibilityGutter: 250,
      },
      xs: {
        breakpoint: { max: 670, min: 0 },
        items: 1,
        partialVisibilityGutter: 0,
      },
    };

    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        <div className="px-0 lg:px-6">
          {getSectionTitle('You May Also Like', undefined, undefined)}
        </div>
        <Carousel
          className="pl-0 lg:pl-6"
          partialVisible
          responsive={responsive}
          infinite={false}
          showDots
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
          {similarShowEventItems?.map((thingToDo: any) => {
            const url = urlDetail(thingToDo);
            const {
              id,
              name,
              address,
              phone_number: phoneNumber,
              tags,
              images,
              fromDate,
              toDate,
              cancellation_policy: cancellationPolicy,
              rate,
              thumbnail,
            } = thingToDo;
            const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

            return (
              <div key={id} className="w-full mb-8 pr-[10px]">
                <ResultCard
                  url={url}
                  icon={ThingsCategory.icon}
                  categoryName={thingsToDoLabel}
                  item={thingToDo}
                  title={name}
                  images={images}
                  address={formattedLocation}
                  className=" flex-0-0-auto"
                  fromDate={fromDate}
                  toDate={toDate}
                  phoneNumber={phoneNumber}
                  tags={tags}
                  isHorizontal
                  thumbnail={thumbnail}
                  cancellable={
                    <ThingsCancellable
                      cancellationPolicy={cancellationPolicy}
                    />
                  }
                  priceDisplay={
                    <PriceDisplay
                      rate={rate}
                      totalLabel={`${rate?.total?.net.formatted}`}
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

  const getSectorsInfo: SectorInfoProp[] =
    sectors! &&
    sectors.map(({ title }) => {
      return { title, isActive: false };
    });

  const addSelectedSeastsInfo = ({
    row,
    currency,
    sectorTitle,
    rate,
    delivery_methods: deliveryMethods,
    availableSeats,
    booking_code_supplier: bookingCodeSupplier,
    quantity,
    cancellation_policy: cancellationPolicy,
  }: iTicketCard) => {
    const newSelectedSeat: selectedSeatsProp = {
      title: `${sectorTitle} ${row}`,
      sector: sectorTitle,
      row: row,
      basePrice: rate.total.net.amount,
      cancellationPolicy: cancellationPolicy,
      currency,
      discountPercent: rate.discounts.percentage_to_apply,
      discountAmount: rate.discounts.amount_to_apply.amount,
      taxes: rate.taxes.full.amount || 0,
      quantity: quantity,
      deliveryMethods,
      bookingCodeSupplier,
    };

    const currentSelectedSeats = [...selectedSeats];
    const currentSeat = currentSelectedSeats.find(
      (item) =>
        item.bookingCodeSupplier === newSelectedSeat.bookingCodeSupplier,
    );

    if (!currentSeat) {
      setSelectedSeats([...currentSelectedSeats, newSelectedSeat]);
    } else {
      setSelectedSeats(
        currentSelectedSeats.map((item) => {
          if (item.bookingCodeSupplier === currentSeat.bookingCodeSupplier) {
            item.quantity = newSelectedSeat.quantity;
          }
          return item;
        }),
      );
    }
    setShowSelectedSeatsBar(true);
  };

  const removeSelectedSeastsInfo = (bookingCodeSupplier: string) => {
    const currentSelectedSeats = [...selectedSeats];
    const currentSeatIndex = currentSelectedSeats.findIndex(
      (item) => item.bookingCodeSupplier === bookingCodeSupplier,
    );

    if (currentSeatIndex < 0) return;

    currentSelectedSeats.splice(currentSeatIndex, 1);
    setSelectedSeats(currentSelectedSeats);
    if (currentSelectedSeats.length === 0) {
      setShowSelectedSeatsBar(false);
    }
  };

  const filterSectorsSearch = (e: any) => {
    const { value } = e.target;
    if (value) {
      const searchSectors = groupBySectors(extraDataSeats)?.filter(
        ({ title }) => title.toLowerCase().includes(value.toLowerCase()),
      );
      setSectors(searchSectors);
    } else {
      setSectors(groupBySectors(extraDataSeats));
    }
  };

  const setSector = () => {
    return (
      <section className="lg:pb-6 lg:mb-6">
        <label className="align-bottom flex">Sector</label>
        <IconInput
          icon={<SearchIcon className="h-5 w-5 text-dark-700 " />}
          name="search"
          placeholder="Search Sector"
          autoFocus
          onChange={(e) => {
            filterSectorsSearch(e);
          }}
        />
        {sectors && (
          <TicketTabs
            sectorsInfo={getSectorsInfo}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
        {sectors && (
          <ResultsOptionsBar
            results={sectors
              .filter(
                ({ title }) =>
                  selectedTab === 'All sectors' || selectedTab === title,
              )
              .reduce((count: any, { rows }: any) => {
                return count + rows.length;
              }, 0)}
            sortByOptions={SORT_SECTOR_BY_OPTIONS}
            onClickFilter={() => setShowMobileFilter(!showMobileFilters)}
          />
        )}
        <CollapseElement show={showMobileFilters}>
          <FilterFormMobile
            onChange={filterSectors}
            max={`${maxSectorPrice}`}
          />
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
        {sectors &&
          sectors
            .filter(
              ({ title }) =>
                selectedTab === 'All sectors' || selectedTab === title,
            )
            .map(({ title, rows }, id) => {
              return (
                <div key={id} className="mt-4">
                  <p className="text-lg leading-5 lg:text-[18px] lg:leading-[22px] font-semibold">
                    {`${sectorLabel} ${title}`}
                  </p>
                  {rows.map((row, idx) => {
                    return (
                      <TicketCard
                        key={idx}
                        {...row}
                        add={(value) => {
                          addSelectedSeastsInfo({
                            ...row,
                            currency: row.rate.total.net.currency,
                            availableSeats: row.available_seats,
                            sectorTitle: title,
                            quantity: value,
                          } as iTicketCard);
                        }}
                        remove={(value) => {
                          if (value === 0) {
                            removeSelectedSeastsInfo(row.booking_code_supplier);
                          } else {
                            addSelectedSeastsInfo({
                              ...row,
                              currency: row.rate.total.net.currency,
                              availableSeats: row.available_seats,
                              sectorTitle: title,
                              quantity: value,
                            } as iTicketCard);
                          }
                        }}
                        section={title}
                        selectedSeats={
                          selectedSeats.find(
                            (item) =>
                              item.bookingCodeSupplier ===
                              row.booking_code_supplier,
                          )?.quantity || 0
                        }
                      />
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
            {[city, countryCode, postalCode].filter((item) => item).join(', ')}
          </span>
        </>
      );
    };
    return (
      <section className="pb-6">
        {getSectionTitle('Location', LocationPin, RightElement)}
        <div className="pt-2">
          <LocationMap
            center={coordinates}
            coords={[
              {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              },
            ]}
          />
        </div>
      </section>
    );
  };

  const getHeader = () => {
    return (
      <section className="pb-6 border-b-2 mb-6">
        {getSectionTitle(showEventItem?.name || '', undefined, undefined)}
        <label className="align-middle flex mb-2">
          <Calendar className="text-primary-1000 h-4 w-4 mr-2.5" />
          {dayjs(showEventItem?.extra_data.starts_at as string).format(
            'MMM D, YYYY HH:mm',
          )}
        </label>
        <label className="align-bottom flex">
          <LocationPin className="text-primary-1000 h-4 w-4 mr-2.5" />
          {[city, countryCode, postalCode].filter((item) => item).join(', ')}
        </label>
      </section>
    );
  };

  const getSeatsMap = () => {
    // We wll use the script value from the BE to build the seatsMap
    return (
      <Image
        alt="seats-map"
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
          <section
            className={classnames('grid', {
              'grid-cols-4': showSelectedSeatsBar,
              'grid-cols-3': !showSelectedSeatsBar,
            })}
          >
            <section
              className={classnames('col-span-4 lg:col-span-3', {
                'col-span-4': !showSelectedSeatsBar,
                'lg:col-span-3': showSelectedSeatsBar,
              })}
            >
              <section
                className={classnames('lg:px-0 px-4 pt-6 lg:pb-6', {
                  'xl:pl-28 xl:pr-5 lg:pl-14 lg:pr-2': showSelectedSeatsBar,
                  'xl:px-20 lg:px-10': !showSelectedSeatsBar,
                })}
              >
                <section className="grid grid-cols-1 lg:grid-cols-5 w-full mx-auto max-w-7xl">
                  <section className="xl:mr-24 lg:pr-6 pr-1 lg:py-6 lg:h-[800px] lg:overflow-y-auto col-span-3">
                    <section className="flex lg:hidden content-center justify-center">
                      {getSeatsMap()}
                    </section>
                    {getHeader()}
                    {setSector()}
                  </section>
                  <section className="col-span-2 lg:pr-6">
                    <section className="hidden lg:flex content-center justify-center px-6 py-6">
                      {getSeatsMap()}
                    </section>
                    <section className="hidden lg:block">
                      <FilterFormDesktop
                        onChange={filterSectors}
                        max={`${maxSectorPrice}`}
                      />
                    </section>
                  </section>
                </section>
              </section>
              <section
                className={classnames('lg:border-t-2', {
                  'xl:pl-28 xl:pr-20 lg:pl-14 lg:pr-10': showSelectedSeatsBar,
                  'xl:px-20 lg:px-10': !showSelectedSeatsBar,
                })}
              >
                <section className="grid grid-cols-1 lg:grid-cols-2 w-full mx-auto max-w-7xl">
                  <section className="hidden lg:block pr-6 py-12 lg:border-r-2">
                    {getDescription()}
                  </section>
                  <section className="pl-6 pr-6 lg:pr-0 py-12">
                    {getLocation()}
                  </section>
                </section>
              </section>
            </section>
            {showSelectedSeatsBar && (
              <section className="w-full col-span-3 border-l-0 lg:border-l-2 lg:sticky fixed bottom-0 pt-0 lg:top-32 lg:h-[82vh] h-[30vh] lg:col-span-1 bg-white col z-10 shadow-up lg:shadow-container rounded-t-lg lg:rounded-none overflow-hidden">
                <section className="w-full bg-white h-full">
                  <SelectedSeatsBar
                    id={id as string}
                    startDate={fromDate as string}
                    endDate={toDate as string}
                    category={showEventItem?.main_category || ''}
                    name={showEventItem?.name || ''}
                    selectedSeats={selectedSeats}
                    removeItem={removeSelectedSeastsInfo}
                    deliveryMethods={[]}
                  />
                </section>
              </section>
            )}
          </section>
          <section className={'grid-cols-3'}>
            <section className={'col-span-3'}>
              <section className="grid grid-cols-1 lg:pl-20 lg:pr-0 px-4 py-6 border-t-2 bg-dark-100">
                {showAndEventsList()}
              </section>
            </section>
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
