import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
// components
import Rating from 'components/global/Rating/Rating';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import DetailsSection from './DetailsSection';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import PoliciesIcon from '../../../public/icons/assets/policies.svg';
import Divider from 'components/global/Divider/Divider';
import TabsSection from './TabSection';
import SeeMore from 'components/global/ReadMore/SeeMore';
// icons
import ApproveUser from 'public/icons/assets/approve-user.svg';
import Sunset from 'public/icons/assets/sunset.svg';
import Check from 'public/icons/assets/check-ok.svg';
import Close from 'public/icons/assets/close.svg';

// types
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import { ReactElement } from 'react';
// mock
import { thingToDoDetail } from '../../mocks/thingToDoDetailMock';
// utilities
import { injectProps } from '../../../helpers/reactUtils';

type ThingsDetailDisplayProps = CategoryPageComponentProps;

const ThingsDetailDisplay = ({ Category }: ThingsDetailDisplayProps) => {
  const { images } = thingToDoDetail;

  const [tg] = useTranslation('global');
  const [t, i18next] = useTranslation('things');
  const { language } = i18next;
  const reviewsLabel = t('reviews', 'Reviews');
  const cancellationLabel = t('cancellation', 'Cancellation');
  const additionalInformationLabel = t(
    'additionalInformation',
    'Additional Information',
  );
  const policiesLabel = tg('policies', 'Policies');

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
          <ul className="list-disc list-inside px-5 text-base text-dark-1000">
            {list.map((listItem, idx) => (
              <li key={idx}>{listItem}</li>
            ))}
          </ul>
        </SeeMore>
      );
    return (
      <ul className="list-disc list-inside px-5 text-base text-dark-1000">
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
          <div className="text-base w-full">
            <p>{text}</p>
            {additionalText && (
              <p className="text-xs text-dark-700">{additionalText}</p>
            )}
          </div>
        </section>
      );
    };

    return (
      <div className="px-5 py-6 flex flex-col gap-3">
        <SectionTitle title={policiesLabel} icon={<PoliciesIcon />} />
        <h5 className="h5">{cancellationLabel}</h5>
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
    const {
      name,
      reviews: {
        reviews_amount: reviewsAmount,
        activity_score: activityScore,
        total_score: totalScore,
      },
    } = thingToDoDetail;
    return (
      <section className="border border-dark-300 ">
        {images && (
          <ImageCarousel images={images} title={name} showDots={false} />
        )}
        <div className="bg-dark-100 px-5 py-4 flex flex-col gap-2">
          <h1 className="h3">{name}</h1>
          <div className="flex items-center gap-2">
            {activityScore && (
              <Rating
                value={activityScore}
                count={Math.floor(activityScore)}
                sizeClass={'h-4 w-4'}
              />
            )}
            <span className="text-dark-700 text-xs">
              {activityScore}/{totalScore} ({reviewsAmount} {reviewsLabel})
            </span>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section>
      <HeaderSection />
      {/* {<TabsSection />} */}
      <section className="px-5 mt-5">
        <SectionTitle title="Tickets" />
      </section>
      <DetailsSection />
      <Divider />
      <PoliciesSection />
      <Divider />
    </section>
  );
};

export default ThingsDetailDisplay;
