import useQuery from 'hooks/pageInteraction/useQuery';
import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import Loader from '../../../components/global/Loader/Loader';
import LocationPin from 'public/icons/assets/location-pin.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import LocationMap from 'components/global/LocationMap/LocationMap';
import FilterFormDesktop from './Filters/FilterFormDesktop';
import ResultsOptionsBar from '../ResultsOptionsBar/ResultsOptionsBar';
import FilterFormMobile from './Filters/FilterFormMobile';
import CollapseElement from 'components/global/CollapseElement/CollapseElement';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import ResultCard from '../search/ResultCard/ResultCard';
import { ThingsCategory } from 'thingsToDo';
import { ShowsSearchResponse as iShowAndEventsResult } from '../../types/response/ShowsSearchResponse';
import Carousel from 'react-multi-carousel';
import CustomArrow from 'components/global/CarouselNew/components/CustomArrow';
import SearchIcon from 'public/icons/assets/Search.svg';
import TicketTabs from '../TicketTabs';
import TicketCard from './TicketCard';
import Image from 'next/image';
import { SORT_SECTOR_BY_OPTIONS } from 'showsAndEvents/constants/sortByOptions';
import SelectedSeatsBar from './SelectedSeatsBar';
import classnames from 'classnames';
import { DetailRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';
import { useCategorySlug } from 'hooks/category/useCategory';
import {
  CancelationPolicy,
  Sector,
  Rate,
  Row,
} from 'showsAndEvents/types/response/ShowsDetailResponse';
import {
  formatAsDisplayDatetime,
  formatAsSearchDate,
} from 'helpers/dajjsUtils';
import IconInput from 'components/global/Input/IconInput';
import { SearchRequest } from 'types/search/SearchRequest';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { filters } from './Filters/types';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';

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
  bookingCodeSupplier: string;
}
interface iTicketCard {
  row: string;
  availableSeats: number;
  rate: Rate;
  currency: string;
  sectorTitle: string;
  booking_code_supplier: string;
  cancellation_policy: CancelationPolicy;
  quantity: number;
}

const ShowAndEventsDetailDisplay = ({
  Category,
}: ShowAndEventsDetailDisplayProps) => {
  const { ClientDetailer: Detailer, ClientSearcher: Searcher } = Category.core;

  const params = useQuery();
  const { id, fromDate, toDate, slug } = params;
  const [selectedTab, setSelectedTab] = useState<ReactNode>('All sectors');

  const [showMobileFilters, setShowMobileFilter] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>();
  const [sortedSectors, setSortedSectors] = useState<Sector[]>();

  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [maxSectorPrice, setMaxSectorPrice] = useState(0);
  const [maxAvailableSeats, setMaxAvailableSeats] = useState(0);
  const [showSelectedSeatsBar, setShowSelectedSeatsBar] =
    useState<boolean>(false);
  const [t, i18next] = useTranslation('events');
  const sectorLabel = t('sector', 'Sector');
  const thingsToDoLabel = t('shows', 'Shows');
  const resultsLabel = t('results', 'Results');
  const rowLabel = t('row', 'Row');
  const searchSectorLabel = t('searchSector', 'Search Sector');

  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  useEffect(() => {
    if (sectors) {
      const newSortedSectors = [...sectors];
      newSortedSectors.forEach(({ rows }) =>
        rows.sort(
          (rowA, rowB) =>
            rowA.rate.total.full.amount - rowB.rate.total.full.amount,
        ),
      );
      newSortedSectors.sort(
        (sectorA, sectorB) =>
          sectorA.rows[0]?.rate.total.full.amount -
          sectorB.rows[0]?.rate.total.full.amount,
      );
      setSortedSectors(newSortedSectors);
    }
  }, [sectors]);

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

  const getMaxSectorValues = (sectorSeats: any) => {
    let maxSectorPrice = 0;
    let maxAvailableSeats = 0;
    sectorSeats.forEach((item: any) => {
      const amount = item.rate.total.net.amount;
      const seats = item.available_seats;
      if (seats > maxAvailableSeats) {
        maxAvailableSeats = seats;
      }
      if (amount > maxSectorPrice) {
        maxSectorPrice = amount;
      }
    });
    return { maxSectorPrice, maxAvailableSeats };
  };

  const paramsDetail: DetailRequest = {
    start_date: formatAsSearchDate(fromDate as string),
    end_date: formatAsSearchDate(toDate as string),
    rsp_fields_set: 'extended',
    seats: '1' as string,
    apiUrl,
  };

  const fetchDetailShowsAndEvents = async () => {
    try {
      return await Detailer?.request?.(paramsDetail, i18next, id);
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['showsandevents-detail', id, paramsDetail],
    fetchDetailShowsAndEvents,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (data) {
      setSectors(groupBySectors(data.seats));

      const maxSectorValues = getMaxSectorValues(data.seats);
      setMaxSectorPrice(maxSectorValues.maxSectorPrice);
      setMaxAvailableSeats(maxSectorValues.maxAvailableSeats);
    }
  }, [data]);

  const {
    address1,
    country_code: countryCode,
    city,
    postal_code: postalCode,
    coordinates,
    state,
  } = data?.address || {};

  const { latitude, longitude } = coordinates || { latitude: 0, longitude: 0 };
  const paramsSimilar: SearchRequest = {
    start_date: formatAsSearchDate(fromDate as string),
    end_date: formatAsSearchDate(toDate as string),
    rsp_fields_set: 'basic',
    relation_id: data?.relationId,
    dst_geolocation: `${latitude},${longitude}`,
    apiUrl,
  };

  const fetchSimilarShowsAndEvents = async () => {
    try {
      return await Searcher?.request?.(paramsSimilar, i18next);
    } catch (e) {
      console.error(e);
    }
  };

  const { data: similarShowEventItems } = useReactQuery(
    ['showsandevents-similar', id, paramsSimilar],
    fetchSimilarShowsAndEvents,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  const filterSectors = (filter: filters) => {
    if (data?.seats) {
      const finalData = data?.seats.filter((item: any) => {
        const minSeats = +filter.minSeats;
        const maxSeats = +filter.maxSeats;
        let isValid = false;
        if (minSeats === maxSeats && minSeats !== 6) {
          isValid = item.purchasable_quantities.includes(minSeats);
        } else if (minSeats === maxSeats && minSeats === 6) {
          isValid = item.purchasable_quantities.some(
            (quantity: number) => quantity >= minSeats,
          );
        } else {
          isValid = item.purchasable_quantities.some((quantity: number) => {
            return (
              Number(quantity) >= Number(filter.minSeats) &&
              Number(quantity) <=
                (Number(filter.maxSeats) < 6
                  ? Number(filter.maxSeats)
                  : Number(maxAvailableSeats))
            );
          });
        }
        return (
          isValid &&
          Number(item.rate.total.net.amount) >= Number(filter.minPrice) &&
          Number(item.rate.total.net.amount) <= Number(filter.maxPrice)
        );
      });
      setSectors(groupBySectors(finalData));
    }
  };

  const showAndEventsList = () => {
    if (!similarShowEventItems) {
      return;
    }
    const urlDetail = (showEvent: iShowAndEventsResult) => {
      const { id } = showEvent;

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
          {similarShowEventItems?.map((showEvent: any, i: number) => {
            const url = urlDetail(showEvent);
            const {
              id,
              name,
              address,
              fromDate,
              cancellationType,
              rate,
              thumbnail,
            } = showEvent;
            const {
              address1,
              city,
              state,
              country_code: countryCode,
            } = address ?? {};
            const formattedLocation = `${[address1, city]
              .filter((item) => item)
              .join(' - ')}${
              [state, countryCode].some((item) => item) ? ',' : ''
            } ${[state, countryCode].filter((item) => item).join(', ')}`;

            return (
              <div key={i} className="w-full mb-8 pr-[10px]">
                <ResultCard
                  url={url}
                  icon={ThingsCategory.icon}
                  categoryName={thingsToDoLabel}
                  item={showEvent}
                  title={name}
                  address={formattedLocation}
                  fromDate={fromDate}
                  isHorizontal
                  thumbnail={thumbnail}
                  cancellationType={cancellationType}
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
      <div className="flex justify-between mb-4 align-middle">
        <div>
          {Icon && (
            <IconRoundedContainer className="inline-flex mr-2 bg-primary-1000">
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
    sortedSectors! &&
    sortedSectors.map(({ title }) => {
      return { title, isActive: false };
    });

  const addSelectedSeastsInfo = ({
    row,
    currency,
    sectorTitle,
    rate,
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
      const searchSectors = data?.seats.filter((seat: Row) => {
        const section = seat.section;
        const row = seat.row;
        const titleLine = `${rowLabel} ${row} ${sectorLabel} ${section}`;
        return titleLine.toLowerCase().includes(value.toLowerCase());
      });
      setSectors(groupBySectors(searchSectors));
    } else {
      setSectors(groupBySectors(data?.seats));
    }
  };

  const getResultsQuatity = () => {
    return sortedSectors
      ?.filter(
        ({ title }) => selectedTab === 'All sectors' || selectedTab === title,
      )
      .reduce((count: any, { rows }: any) => {
        return count + rows.length;
      }, 0);
  };

  const setSector = () => {
    return (
      <section className="lg:pb-6 lg:mb-6">
        <label className="flex align-bottom">Sector</label>
        {sortedSectors && (
          <>
            <section className="flex flex-col md:flex-row">
              <div className="w-full md:w-[20%] sm:w-full mr-5">
                <IconInput
                  icon={<SearchIcon className="w-5 h-5 text-dark-700 " />}
                  name="search"
                  placeholder={searchSectorLabel}
                  autoFocus
                  onChange={(e) => {
                    filterSectorsSearch(e);
                  }}
                />
              </div>
              <div className="w-full md:w-[80%] ">
                <TicketTabs
                  sectorsInfo={getSectorsInfo}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </div>
            </section>

            <section className="relative w-full">
              <section className="flex items-center justify-between pt-3 pb-3 lg:mt-1 lg:pb-0">
                <p className="text-sm leading-5 lg:text-[20px] lg:leading-[24px] font-semibold">
                  {getResultsQuatity() || 0} {resultsLabel}
                </p>
              </section>
            </section>
          </>
        )}
        <CollapseElement show={showMobileFilters}>
          <FilterFormMobile
            onChange={filterSectors}
            maxPrice={`${maxSectorPrice}`}
          />
        </CollapseElement>
        {sortedSectors &&
          sortedSectors
            .filter(
              ({ title }) =>
                selectedTab === 'All sectors' || selectedTab === title,
            )
            .map(({ title, rows }) => {
              return (
                <CollapseUnbordered
                  title={
                    <p className="text-lg leading-5 lg:text-[18px] lg:leading-[22px] font-semibold">
                      {`${sectorLabel} ${title}`}
                    </p>
                  }
                  body={
                    <div key={`${sectorLabel}-${title}`} className="mt-4">
                      {rows.map((row, i: number) => {
                        return (
                          <TicketCard
                            key={i}
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
                                removeSelectedSeastsInfo(
                                  row.booking_code_supplier,
                                );
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
                  }
                />
              );
            })}
      </section>
    );
  };

  const getDescription = () => {
    return (
      <section className="pb-6">
        {getSectionTitle('Details', InfoCircle, undefined)}
        <label className="flex mb-2 text-xl align-middle">Description</label>
        <span className="flex text-xl">{data?.description}</span>
      </section>
    );
  };

  const getLocation = () => {
    const RightElement = () => {
      return (
        <>
          <span className="block text-right">{address1}</span>
          <span className="block text-right">
            {[city, state, countryCode, postalCode]
              .filter((item) => item)
              .join(', ')}
          </span>
        </>
      );
    };
    return (
      <section className="pb-6">
        {getSectionTitle('Location', LocationPin, RightElement)}
        <div className="pt-2">
          <LocationMap
            locations={[
              {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              },
            ]}
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
    const formattedLocation = `${[address1, city]
      .filter((item) => item)
      .join(' - ')}${[state, countryCode].some((item) => item) ? ',' : ''} ${[
      state,
      countryCode,
      postalCode,
    ]
      .filter((item) => item)
      .join(', ')}`;
    const formattedCheckoutDateTime = formatAsDisplayDatetime(
      data?.startsAt as string,
    );
    return (
      <section className="pb-6 mb-6 border-b-2">
        {getSectionTitle(data?.name || '', undefined, undefined)}
        <label className="flex mb-2 align-middle">
          <Calendar className="text-primary-1000 h-4 w-4 mr-2.5" />
          {fromLowerCaseToCapitilize(formattedCheckoutDateTime)}
        </label>
        <label className="flex align-bottom">
          <LocationPin className="text-primary-1000 h-4 w-4 mr-2.5" />
          {formattedLocation}
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
        width={700}
        height={700}
      />
    );
  };

  return (
    <>
      {!isLoading && (
        <main className="relative w-full">
          <section className="grid grid-cols-4 p-12">
            <section
              className={classnames(
                'col-span-4 lg:col-span-3 lg:overflow-y-auto scrollbar-hide',
                {
                  'col-span-4': !showSelectedSeatsBar,
                  'lg:col-span-3': showSelectedSeatsBar,
                },
              )}
            >
              <section className="lg:px-0 px-4 pt-6 lg:pb-6">
                <section className="grid w-full grid-cols-1 mx-auto lg:grid-cols-5 max-w-7xl">
                  <section className="lg:py-6 lg:h-[600px] col-span-2">
                    <section className="flex content-center justify-center lg:hidden">
                      {getSeatsMap()}
                    </section>
                    {getHeader()}
                    <section className="hidden lg:block">
                      <FilterFormDesktop
                        onChange={filterSectors}
                        maxPrice={`${maxSectorPrice}`}
                      />
                    </section>
                  </section>
                  <section className="col-span-3">
                    <section className="content-center justify-center hidden px-6 py-6 lg:flex">
                      {getSeatsMap()}
                    </section>
                  </section>
                  <section className="col-span-12 lg:pr-6">
                    {setSector()}
                  </section>
                </section>
              </section>
              <section
                className={classnames('lg:border-t-2', {
                  'xl:pl-28 xl:pr-20 lg:pl-14 lg:pr-10': showSelectedSeatsBar,
                  'xl:px-20 lg:px-10': !showSelectedSeatsBar,
                })}
              >
                <section className="grid w-full grid-cols-1 mx-auto lg:grid-cols-1 max-w-7xl">
                  <section className="hidden py-12 pr-6 lg:block">
                    {getDescription()}
                  </section>
                  <section className="py-12 pr-6 lg:pr-0">
                    {getLocation()}
                  </section>
                </section>
              </section>
            </section>

            <section
              className={classnames(
                'w-full col-span-3 border-l-0 lg:border-l-2 lg:sticky fixed bottom-0 pt-0 lg:top-20 lg:h-[89vh] h-[30vh] lg:col-span-1 bg-white col z-10 shadow-up lg:shadow-container rounded-t-lg lg:rounded-none overflow-hidden md:block',
                {
                  'sm:block:': selectedSeats.length,
                  'hidden sm:hidden:': !selectedSeats.length,
                },
              )}
            >
              <section className="w-full h-full bg-white">
                <SelectedSeatsBar
                  id={id as string}
                  startDate={fromDate as string}
                  endDate={toDate as string}
                  category={data?.category || ''}
                  name={data?.name || ''}
                  selectedSeats={selectedSeats}
                  removeItem={removeSelectedSeastsInfo}
                />
              </section>
            </section>
          </section>
          <section className={'grid-cols-3'}>
            <section className={'col-span-3'}>
              <section className="grid grid-cols-1 px-4 py-6 border-t-2 lg:pl-20 lg:pr-0 bg-dark-100">
                {showAndEventsList()}
              </section>
            </section>
          </section>
        </main>
      )}
      {isLoading && (
        <section className="lg:pt-14">
          <Loader />
        </section>
      )}
    </>
  );
};

export default ShowAndEventsDetailDisplay;
