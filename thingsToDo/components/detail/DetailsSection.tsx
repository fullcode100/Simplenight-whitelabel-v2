/* eslint-disable react/no-unescaped-entities */
import Divider from 'components/global/Divider/Divider';
import InlineFeature from 'components/global/InlineFeature/InlineFeature';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import ClockIcon from 'public/icons/assets/clock.svg';
import CheckIcon from 'public/icons/assets/check.svg';
import CloseIcon from 'public/icons/assets/close.svg';
import LanguageIcon from 'public/icons/assets/language.svg';
import DeviceMobileIcon from 'public/icons/assets/device-mobile.svg';
import SectionSubtitle from 'components/global/SectionSubtitle/SectionSubtitle';
import { useTranslation } from 'react-i18next';
import { ThingsDetailItem } from 'thingsToDo/types/response/ThingsDetailResponse';
import DurationLabel from '../DurationLabel/DurationLabel';
import { Paragraph } from '@simplenight/ui';

interface DetailsSectionProps {
  thingsItem: ThingsDetailItem;
}

const DetailsSection = ({ thingsItem }: DetailsSectionProps) => {
  const [t] = useTranslation('global');
  const descriptionText = t('description', 'Description');
  const includedText = t('included', 'Included');
  const notIncludedText = t('notIncluded', 'Not Included');
  const offeredIn = t('offeredIn', 'Offered In');
  const details = t('details', 'Details');

  const {
    extra_data: {
      duration,
      min_duration: minDuration,
      max_duration: maxDuration,
    },
  } = thingsItem;

  const rangeDuration = minDuration &&
    maxDuration && { minDuration, maxDuration };
  const fixedDuration = duration ? duration : 0;
  const languages = thingsItem.extra_data.lang_guides
    .map((lan) => lan.language)
    .join(', ');
  const presentations = thingsItem.extra_data.presentation
    .map((p) => p.label)
    .join(', ');

  const includedItems = thingsItem.extra_data.includes;
  const excludedItems = thingsItem.extra_data.excludes;

  const Features = () => (
    <section className="flex flex-wrap justify-between w-full mt-4">
      {duration !== undefined && duration > 0 && (
        <InlineFeature
          icon={<ClockIcon />}
          text={
            <DurationLabel
              duration={rangeDuration ? rangeDuration : fixedDuration}
            />
          }
        />
      )}
      <InlineFeature icon={<DeviceMobileIcon />} text={presentations} />
      <InlineFeature
        icon={<LanguageIcon />}
        text={`${offeredIn} ${languages}`}
      />
    </section>
  );

  const DescriptionSection = () => (
    <>
      <SectionSubtitle>{descriptionText}</SectionSubtitle>
      <Paragraph size="medium" className="pt-3">
        {thingsItem?.extra_data?.description}
      </Paragraph>
    </>
  );

  const IncludedSection = () => (
    <>
      <SectionSubtitle>{includedText}</SectionSubtitle>
      <section className="flex flex-col flex-wrap gap-3 mt-2 mb-3 lg:flex-row">
        {includedItems?.map((item, idx) => {
          return (
            <InlineFeature
              key={idx}
              icon={<CheckIcon className="w-3 h-3 text-green-1000" />}
              text={item.description}
              textClassName="text-green-1000"
            />
          );
        })}
      </section>
    </>
  );

  const NotIncludedSection = () => (
    <>
      <SectionSubtitle>{notIncludedText}</SectionSubtitle>
      <section className="flex flex-col flex-wrap gap-3 mt-2 lg:flex-row">
        {excludedItems?.map((item, edx) => {
          return (
            <InlineFeature
              key={edx}
              icon={<CloseIcon className="text-dark-600" />}
              text={item.description}
              textClassName="text-dark-600"
            />
          );
        })}
      </section>
    </>
  );

  return (
    <section className="px-5 py-6 lg:py-12 lg:px-0 lg:pr-12">
      <SectionTitle title={details} />
      <Features />
      <Divider className="py-4 lg:py-7" />
      <DescriptionSection />
      <Divider className="py-4 lg:py-8" />
      <IncludedSection />
      <NotIncludedSection />
    </section>
  );
};

export default DetailsSection;
