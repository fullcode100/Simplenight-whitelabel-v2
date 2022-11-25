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
import { categorySectorUUID } from 'thingsToDo';

type ThingsDetailDisplayProps = CategoryPageComponentProps;

const ThingsDetailDisplay = ({ Category }: ThingsDetailDisplayProps) => {
  const { ClientDetailer: Detailer, ClientAvailability: Availability } =
    Category.core;

  const [t, i18next] = useTranslation('things');
  const [tg] = useTranslation('global');
  const cancellationLabel = t('cancellation', 'Cancellation');
  const additionalInformationLabel = t(
    'additionalInformation',
    'Additional Information',
  );
  const policiesLabel = tg('policies', 'Policies');
  const reviewsLabel = tg('reviews', 'Reviews');
  const loadMoreText = tg('loadMore', 'Load More');
  const noResultsLabel = tg('noResultsSearch', 'No Results Match Your Search.');
  const checkAvailabilityForYourSearchLabel = tg(
    'checkAvailabilityForYourSearch',
    'Check Availability For Your Selected Guests And Dates.',
  );

  const { isDesktop } = useMediaViewport();
  const [thingsItem, setThingsItem] = useState<ThingsDetailItem>();
  const [isLoadMoreTickets, setIsLoadMoreTickets] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [emptyState, setEmptyState] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Location | undefined>(
    undefined,
  );
  const [selectedPickup, setSelectedPickup] = useState<Location | undefined>(
    undefined,
  );
  const [selectedTicket, setSelectedTicket] = useState<number>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const currentCurrency = getCurrency();

  const extraData: ExtraData = thingsItem?.extra_data as ExtraData;
  const images = extraData?.images;
  const pricing = extraData?.pricing;
  const isAdultRequired = extraData?.is_adult_required;
  const activityMaxTravelers = extraData?.max_travelers;
  const loadMoreTickets = () => {
    setIsLoadMoreTickets(true);
  };
  const { id, startDate, endDate } = useQuery();

  useEffect(() => {
    const params: ThingsDetailRequest = {
      start_date: formatAsSearchDate(startDate as string),
      end_date: formatAsSearchDate(endDate as string),
      rsp_fields_set: 'extended',
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

  const handleAvailability = (date: string, ticketTypes: any[]) => {
    setIsCheckingAvailability(true);
    const params: ThingsAvailabilityRequest = {
      start_date: formatAsSearchDate(date as string),
      inventory_id: id as string,
      lang: i18next.language,
      currency: currentCurrency,
      ticket_types: ticketTypes,
    };
    if (id) {
      Availability?.request?.(params, i18next, categorySectorUUID)
        .then(({ tickets }: any) => {
          setTickets(tickets);
        })
        .catch((e: any) => {
          console.error(e);
        });
    }
  };

  interface ListProps {
    list: string[];
    limit?: number;
  }

  const List = ({ list, limit }: ListProps) => {
    const lineHeight = 27;
    const displaySeeMore = true;
    if (limit && list.length > limit)
      return (
        <SeeMore
          textOpened="See less"
          textClosed="See more"
          heightInPixels={lineHeight * limit}
          displayButton={displaySeeMore}
        >
          <ul className="px-5 text-base list-disc list-inside text-dark-1000">
            {list.map((listItem, idx) => (
              <li key={idx}>{listItem}</li>
            ))}
          </ul>
        </SeeMore>
      );
    return (
      <ul className="px-5 text-base list-disc list-inside text-dark-1000">
        {list.map((listItem, idx) => (
          <li key={idx}>{listItem}</li>
        ))}
      </ul>
    );
  };

  interface Policy {
    title?: string;
    list?: string[];
    paragraph?: string;
  }
  interface PolicyCardProps {
    policy: Policy;
  }
  const PolicyCard = ({ policy }: PolicyCardProps) => {
    const { title, list, paragraph } = policy;
    return (
      <>
        <h5 className="h5">{title}</h5>
        {list && <List list={list} />}
        <p className="text-base text-dark-1000">{paragraph}</p>
      </>
    );
  };

  const PoliciesSection = () => {
    const {
      additional_information: {
        paragraph: additionalDescription,
        list: additionalList,
      },
      policies,
      cancellation_policy: {
        cancellation_type: cancellationType,
        description: cancelationDescription,
        flags: cancellationFlags,
      },
    } = thingToDoDetail;

    const BAD_WEATHER_FLAG_INDEX = cancellationFlags.findIndex(
      (flag) => flag.flag_id === 'CANCEL_IF_BAD_WEATHER',
    );
    const INSUFFICIENT_TRAVELERS_FLAG_INDEX = cancellationFlags.findIndex(
      (flag) => flag.flag_id === 'CANCEL_IF_INSUFFICIENT_TRAVELERS',
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
      <div className="flex flex-col gap-3 px-5 py-6 lg:px-0 lg:pl-12">
        <SectionTitle title={policiesLabel} icon={<PoliciesIcon />} />
        <h5 className="mt-6 h5 lg:mt-8">{cancellationLabel}</h5>
        <IconAndText
          icon={cancellable || partialRefund ? <Check /> : <Close />}
          text={cancelationDescription}
          colorScheme={cancellable ? 'success' : 'grey'}
          additionalText="Cut-off times are based on the experience’s local time."
        />
        {cancellationFlags[BAD_WEATHER_FLAG_INDEX].value && (
          <IconAndText
            icon={<Sunset />}
            text={
              'This experience requires good weather. If it’s canceled due to poor weather, you’ll be offered a different date or a full refund'
            }
          />
        )}
        {cancellationFlags[INSUFFICIENT_TRAVELERS_FLAG_INDEX].value && (
          <IconAndText
            icon={<ApproveUser />}
            text={
              'This experience requires a minimum number of travelers. If it’s canceled because the minimum isn’t met, you’ll be offered a different date or a full refund'
            }
          />
        )}

        <Divider />
        <h5 className="h5">{additionalInformationLabel}</h5>
        <List list={additionalList} limit={8} />
        <p className="text-base text-dark-1000">{additionalDescription}</p>
        <Divider />
        {policies?.map((policy, idx) => (
          <Fragment key={idx}>
            <PolicyCard policy={policy} />
            {idx < policies.length - 1 && <Divider />}
          </Fragment>
        ))}
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

  const DetailDisplay = () => {
    const startTicketsNumber = isDesktop ? 3 : 2;
    const displayTickets = isLoadMoreTickets
      ? tickets
      : tickets?.slice(0, startTicketsNumber);

    const meetingPoints = thingsItem?.extra_data.start_locations;
    const pickupPoints = thingsItem?.extra_data.pickup;

    const firstCategoryId = thingsItem?.categories[0].id ?? '';

    return (
      <>
        {emptyState ? (
          <section className="flex items-center justify-center h-screen text-xl font-bold text-primary-1000">
            (!) empty state
          </section>
        ) : (
          thingsItem && (
            <>
              <HeaderSection />
              {/* <TabsSection /> */}
              <section className="px-5 mx-auto mt-5 max-w-7xl lg:px-0">
                <SectionTitle icon={<TicketIcon />} title="Tickets" />
                <section className="p-4 mt-4 rounded bg-dark-100">
                  <section>
                    <CheckThingsAvailability
                      isAdultRequired={isAdultRequired}
                      pricing={pricing}
                      onApply={handleAvailability}
                      activityMaxTravelers={activityMaxTravelers}
                    />
                  </section>
                </section>
                <section
                  className={`items-start ${
                    tickets.length == 0 ? 'flex justify-center' : 'grid'
                  } gap-4 mt-4 lg:grid-cols-3`}
                >
                  {tickets.length > 0 ? (
                    displayTickets?.map((ticket, index) => (
                      <button
                        key={`ticket${index}`}
                        onClick={() => setSelectedTicket(index)}
                        className="text-left"
                      >
                        <TicketCard
                          id={thingsItem.id}
                          category={firstCategoryId}
                          ticket={ticket}
                          pickup={selectedPickup}
                          meeting={selectedMeeting}
                          selected={selectedTicket === index}
                          pricing={pricing}
                        />
                      </button>
                    ))
                  ) : (
                    <EmptyTickets />
                  )}
                </section>
                {!isLoadMoreTickets && tickets.length > 0 && (
                  <section className="flex justify-center mt-4">
                    <Button width="w-full lg:w-auto" onClick={loadMoreTickets}>
                      <section className="px-4">{loadMoreText}</section>
                    </Button>
                  </section>
                )}
              </section>
              <Divider className="mt-6" />
              <section className="mx-auto lg:gap-12 lg:grid lg:grid-cols-2 max-w-7xl">
                <DetailsSection thingsItem={thingsItem} />
                <Divider className="lg:hidden" />
                <PoliciesSection />
              </section>
              <Divider />
              <LocationSection
                meetingPoints={meetingPoints}
                selectedMeeting={selectedMeeting}
                setSelectedMeeting={setSelectedMeeting}
                pickupPoints={pickupPoints}
                selectedPickup={selectedPickup}
                setSelectedPickup={setSelectedPickup}
              />
            </>
          )
        )}
      </>
    );
  };

  return <section>{loaded ? <DetailDisplay /> : <Loader />}</section>;
};

export default ThingsDetailDisplay;
