/* eslint-disable no-unsafe-optional-chaining */
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// components
import Rating from 'components/global/Rating/Rating';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import DetailsSection from './DetailsSection';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import Divider from 'components/global/Divider/Divider';
import LocationSection from './LocationSection';
import Loader from 'components/global/Loader/Loader';
import TicketCard from '../TicketCard/TicketCard';
import SeeMore from 'components/global/ReadMore/SeeMore';
import useMediaViewport from 'hooks/media/useMediaViewport';
import Button from 'components/global/ButtonNew/Button';
// icons
import ApproveUser from 'public/icons/assets/approve-user.svg';
import Sunset from 'public/icons/assets/sunset.svg';
import Check from 'public/icons/assets/check-ok.svg';
import Close from 'public/icons/assets/close.svg';
import PoliciesIcon from '../../../public/icons/assets/policies.svg';
import TicketIcon from 'public/icons/categories/ticket.svg';

// types
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { ReactElement } from 'react';
// mock
import { thingToDoDetail } from '../../mocks/thingToDoDetailMock';
// utilities
import { injectProps } from '../../../helpers/reactUtils';
import {
  ExtraData,
  Location,
  ThingsDetailItem,
} from 'thingsToDo/types/response/ThingsDetailResponse';

import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { ThingsDetailRequest } from 'thingsToDo/types/request/ThingsDetailRequest';
import { ThingsAvailabilityRequest } from 'thingsToDo/types/request/ThingsAvailabilityRequest';
import { getCurrency } from 'store/selectors/core';
import { Ticket } from '../../types/response/ThingsDetailResponse';
import EmptyCheckAvailability from 'public/icons/assets/empty-check-availability.svg';
import EmptyNoAvailability from 'public/icons/assets/empty-no-availability.svg';
import CheckThingsAvailability from '../CheckAvailability/CheckAvailability';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useQuerySetterNotReload } from 'hooks/pageInteraction/useQuerySetter';
import { ThingsAvailabilityScheduleRequest } from 'thingsToDo/types/request/ThingsAvailabilityScheduleRequest';
import {
  ThingsAvailabilityScheduleResponse,
  ThingsScheduleDetail,
} from 'thingsToDo/types/response/ThingsAvailabilityScheduleResponse';
import dayjs from 'dayjs';
import { MEETING_POINT_ID, PICKUP_POINT_ID } from 'helpers/bookingQuestions';

type ThingsDetailDisplayProps = CategoryPageComponentProps;

const AVAILABLE = 'AVAILABLE';

const ThingsDetailDisplay = ({ Category }: ThingsDetailDisplayProps) => {
  const {
    ClientDetailer: Detailer,
    ClientAvailability: Availability,
    ClientAvailabilitySchedule: Schedule,
  } = Category.core;

  const [t, i18next] = useTranslation('things');
  const [tg] = useTranslation('global');
  const cancellationLabel = t('cancellation', 'Cancellation');
  const additionalInformationLabel = t(
    'additionalInformation',
    'Additional Information',
  );
  const policiesLabel = tg('policies', 'Policies');
  const reviewsLabel = tg('reviews', 'Reviews');
  const loadMoreText = t('loadMore', 'Load More');
  const noResultsLabel = tg('noResultsSearch', 'No Results Match Your Search.');
  const checkAvailabilityForYourSearchLabel = tg(
    'checkAvailabilityForYourSearch',
    'Check Availability For Your Selected Guests And Dates.',
  );
  const seeLess = tg('seeLess', 'See Less');
  const seeMore = tg('seeMore', 'See More');

  const { isDesktop } = useMediaViewport();
  const [thingsItem, setThingsItem] = useState<ThingsDetailItem>();
  const [isLoadMoreTickets, setIsLoadMoreTickets] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduleLoaded, setScheduleLoaded] = useState(false);
  const [emptyState, setEmptyState] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Location | undefined>(
    undefined,
  );
  const [selectedPickup, setSelectedPickup] = useState<Location | undefined>(
    undefined,
  );
  const [selectedTicket, setSelectedTicket] = useState<number>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [schedule, setSchedule] = useState<ThingsScheduleDetail[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const currentCurrency = getCurrency();
  const setQueryParam = useQuerySetterNotReload();

  const extraData: ExtraData = thingsItem?.extra_data as ExtraData;
  const images = extraData?.images;
  const pricing = extraData?.pricing;
  const isAdultRequired = extraData?.is_adult_required;
  const activityMaxTravelers = extraData?.max_travelers;
  const loadMoreTickets = () => {
    setIsLoadMoreTickets(true);
  };
  const { id, startDate, endDate, slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  useEffect(() => {
    const params: ThingsDetailRequest = {
      start_date: formatAsSearchDate(startDate as string),
      end_date: formatAsSearchDate(endDate as string),
      rsp_fields_set: 'extended',
      apiUrl,
    };
    if (id) {
      Detailer?.request?.(params, i18next, id)
        .then(({ items }) => {
          const item: ThingsDetailItem = items[0];
          setThingsItem(item);
          setLoaded(true);
        })
        .catch((e) => {
          console.error(e);
          setLoaded(true);
          setEmptyState(true);
        });
    }
  }, [id]);

  useEffect(() => {
    const url = '/categories/' + thingsItem?.main_category ?? '';
    const startDate = formatAsSearchDate(dayjs());
    const endDate = formatAsSearchDate(dayjs().add(1, 'years'));

    const params: ThingsAvailabilityScheduleRequest = {
      inventory_id: id as string,
      start_date: startDate,
      end_date: endDate,
      apiUrl: url,
    };

    if (thingsItem) {
      Schedule.request(params, i18next, id)
        .then(({ tickets }: ThingsAvailabilityScheduleResponse) => {
          setSchedule(tickets);
          setScheduleLoaded(true);
        })
        .catch((e: any) => {
          console.error(e);
          setScheduleLoaded(true);
        });
    }
  }, [thingsItem]);

  const handleAvailability = (date: string, ticketTypes: any[]) => {
    const queryParams: any = {
      startDate: formatAsSearchDate(date as string),
    };
    ticketTypes?.forEach((ticketType) => {
      queryParams[ticketType.ticket_type_id] = ticketType.quantity.toString();
    });
    setQueryParam(queryParams);
    setIsCheckingAvailability(true);
    const url = '/categories/' + thingsItem?.categories[0].id ?? '';
    const params: ThingsAvailabilityRequest = {
      start_date: formatAsSearchDate(date as string),
      inventory_id: id as string,
      lang: i18next.language,
      currency: currentCurrency,
      ticket_types: ticketTypes,
      apiUrl: url,
    };
    if (id) {
      setLoading((prev) => !prev);
      Availability?.request?.(params, i18next, id)
        .then(({ tickets }: any) => {
          setTickets(tickets);
          setLoading((prev) => !prev);
        })
        .catch((e: any) => {
          setLoading((prev) => !prev);
          console.error(e);
        });
    }
  };

  interface ListProps {
    list?: string[];
    limit?: number;
  }

  const List = ({ list, limit }: ListProps) => {
    const lineHeight = 27;
    const displaySeeMore = true;
    const additionalAmount = list ? list.length : 0;
    if (limit && additionalAmount > limit)
      return (
        <SeeMore
          textOpened={seeLess}
          textClosed={seeMore}
          heightInPixels={lineHeight * limit}
          displayButton={displaySeeMore}
        >
          <ul className="px-5 text-base list-disc list-inside text-dark-1000">
            {list?.map((listItem, idx) => (
              <li key={idx}>{listItem}</li>
            ))}
          </ul>
        </SeeMore>
      );
    return (
      <ul className="px-5 text-base list-disc list-inside text-dark-1000">
        {list?.map((listItem, idx) => (
          <li key={idx}>{listItem}</li>
        ))}
      </ul>
    );
  };

  const PoliciesSection = () => {
    const { cancellation_policy: cancellationPolicy } = extraData;
    const {
      cancellation_type: cancellationType,
      description,
      flags,
    } = cancellationPolicy;

    const BAD_WEATHER_FLAG_INDEX = flags.findIndex(
      (flag) => flag.flag_id === 'CANCEL_IF_BAD_WEATHER',
    );
    const INSUFFICIENT_TRAVELERS_FLAG_INDEX = flags.findIndex(
      (flag) => flag.flag_id === 'CANCEL_IF_INSUFFICIENT_TRAVELERS',
    );
    const CUT_OFF_TIMES_FLAG_INDEX = flags.findIndex(
      (flag) => flag.flag_id === 'CUT_OFF_TIMES_LOCAL_BASED',
    );

    interface IconAndTextProps {
      icon?: ReactElement;
      text: string;
      colorScheme?: 'success' | 'default' | 'grey';
      additionalText?: string;
    }

    const cancellable = cancellationType === 'FREE_CANCELLATION';
    const nonRefundable = cancellationType === 'NON_REFUNDABLE';
    const partialRefund = cancellationType === 'PARTIAL_REFUND';

    const IconAndText = ({
      icon,
      text,
      colorScheme = 'default',
      additionalText,
    }: IconAndTextProps) => {
      let styledIcon;
      const DEFAULT_STYLE = colorScheme === 'default';
      const SUCCESS_STYLE = colorScheme === 'success';
      const style = `h-6 w-6 ${DEFAULT_STYLE && 'text-primary-1000'}`;
      if (icon) {
        styledIcon = injectProps(icon as any, {
          className: style,
        });
      }

      return (
        <section
          className={`flex justify-end gap-2 ${
            SUCCESS_STYLE && 'text-green-1000'
          }`}
        >
          {styledIcon}
          <div className="w-full text-base">
            <p>{text}</p>
            {additionalText && (
              <p className="text-xs text-dark-700">{additionalText}</p>
            )}
          </div>
        </section>
      );
    };

    return (
      <div className="flex flex-col gap-3 px-5 py-6 lg:px-0 lg:pl-12 lg:py-12">
        <SectionTitle title={policiesLabel} icon={<PoliciesIcon />} />
        <h5 className="mt-3 h5 lg:mt-5">{cancellationLabel}</h5>
        <IconAndText
          icon={cancellable || partialRefund ? <Check /> : <Close />}
          text={description}
          colorScheme={cancellable ? 'success' : 'grey'}
          additionalText={flags[CUT_OFF_TIMES_FLAG_INDEX]?.description}
        />
        {flags[BAD_WEATHER_FLAG_INDEX]?.value && (
          <IconAndText
            icon={<Sunset />}
            text={flags[BAD_WEATHER_FLAG_INDEX].description}
          />
        )}
        {flags[INSUFFICIENT_TRAVELERS_FLAG_INDEX]?.value && (
          <IconAndText
            icon={<ApproveUser />}
            text={flags[INSUFFICIENT_TRAVELERS_FLAG_INDEX].description}
          />
        )}

        <Divider className="py-3 lg:py-5" />
        <h5 className="h5">{additionalInformationLabel}</h5>
        <List list={extraData.amenities} limit={8} />
      </div>
    );
  };

  const HeaderSection = () => {
    const images = thingsItem?.extra_data?.images;
    const name = thingsItem?.name;
    const reviewsAmount = thingsItem?.extra_data?.review_amount;
    const activityScore = thingsItem?.extra_data?.avg_rating;
    const totalScore = '5';
    return (
      <section className="border border-dark-300 bg-dark-100">
        <div className="mx-auto max-w-7xl">
          {images && name && (
            <ImageCarousel images={images} title={name} showDots={false} />
          )}
          <div className="flex flex-col gap-2 px-5 py-4 lg:px-0">
            <h1 className="h3">{name}</h1>
            <div className="flex items-center gap-2">
              {activityScore && (
                <Rating
                  value={activityScore}
                  count={Math.floor(activityScore)}
                  sizeClass={'h-4 w-4'}
                />
              )}
              <span className="text-xs text-dark-700">
                {activityScore?.toFixed(1)}/{totalScore} ({reviewsAmount}{' '}
                {reviewsLabel})
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const EmptyTickets = () => {
    if (loading) {
      return <Loader />;
    }

    return (
      <section className="w-full mx-auto">
        <section className="flex justify-center w-[143px] h-[143px]">
          {isCheckingAvailability ? (
            <EmptyNoAvailability />
          ) : (
            <EmptyCheckAvailability />
          )}
        </section>
        <section className="mt-10">
          <p className="text-center text-dark-800 font-semibold text-[20px] leading-[24px]">
            {isCheckingAvailability
              ? noResultsLabel
              : checkAvailabilityForYourSearchLabel}
          </p>
        </section>
      </section>
    );
  };

  const TicketsList = () => {
    const startTicketsNumber = isDesktop ? 3 : 2;
    const displayTickets = isLoadMoreTickets
      ? tickets
      : tickets?.slice(0, startTicketsNumber);
    const mainCategoryId = thingsItem?.main_category as string;
    return (
      <>
        {displayTickets?.map((ticket, index) => (
          <button
            key={`ticket${index}`}
            onClick={() => setSelectedTicket(index)}
            className="text-left"
          >
            <TicketCard
              id={thingsItem?.id as string}
              category={mainCategoryId}
              ticket={ticket}
              pickup={selectedPickup}
              meeting={selectedMeeting}
              selected={selectedTicket === index}
            />
          </button>
        ))}
      </>
    );
  };

  const TicketsSection = () => {
    if (!scheduleLoaded) {
      return <Loader />;
    }

    const disabledDays = schedule
      .filter((day) => day.status === AVAILABLE)
      .map((day) => {
        return day.date;
      });

    return (
      <>
        <section className="px-5 mx-auto mt-5 max-w-7xl lg:px-0 lg:py-12">
          <SectionTitle icon={<TicketIcon />} title="Tickets" />
          <section className="p-4 mt-4 rounded bg-dark-100 lg:mt-8 lg:mb-8">
            <section>
              <CheckThingsAvailability
                isAdultRequired={isAdultRequired}
                pricing={pricing}
                onApply={handleAvailability}
                activityMaxTravelers={activityMaxTravelers}
                disabledDays={disabledDays}
              />
            </section>
          </section>
          <section
            className={`items-start ${
              tickets.length == 0 ? 'flex justify-center' : 'grid'
            } gap-4 mt-4 lg:grid-cols-3`}
          >
            {tickets.length > 0 ? <TicketsList /> : <EmptyTickets />}
          </section>
          {!isLoadMoreTickets && tickets.length > 0 && (
            <section className="flex justify-center mt-4">
              <Button width="w-full lg:w-auto" onClick={loadMoreTickets}>
                <section className="px-4">{loadMoreText}</section>
              </Button>
            </section>
          )}
        </section>
      </>
    );
  };

  const DetailDisplay = () => {
    const bookingQuestions = thingsItem?.extra_data?.booking_questions;
    const hasMeeting = bookingQuestions?.find(
      (question) => question.id === MEETING_POINT_ID,
    );
    const hasPickup = bookingQuestions?.find(
      (question) => question.id === PICKUP_POINT_ID,
    );
    const meetingPoints = hasMeeting && thingsItem?.extra_data.start_locations;
    const pickupPoints = hasPickup && thingsItem?.extra_data.pickup;
    const hasPoints = meetingPoints || pickupPoints;

    return (
      <>
        {emptyState ? (
          <section className="flex items-center justify-center h-screen text-xl font-bold text-primary-1000">
            empty state
          </section>
        ) : (
          thingsItem && (
            <>
              <HeaderSection />
              {/* <TabsSection /> */}
              <TicketsSection />
              <Divider className="mt-6" />
              <section className="mx-auto lg:gap-12 lg:grid lg:grid-cols-2 lg:divide-y-2 max-w-7xl">
                <DetailsSection thingsItem={thingsItem} />
                <Divider className="lg:hidden" />
                <PoliciesSection />
              </section>
              <Divider />
              {hasPoints && (
                <LocationSection
                  meetingPoints={meetingPoints}
                  selectedMeeting={selectedMeeting}
                  setSelectedMeeting={setSelectedMeeting}
                  pickupPoints={pickupPoints}
                  selectedPickup={selectedPickup}
                  setSelectedPickup={setSelectedPickup}
                />
              )}
            </>
          )
        )}
      </>
    );
  };

  return <section>{loaded ? <DetailDisplay /> : <Loader />}</section>;
};

export default ThingsDetailDisplay;
