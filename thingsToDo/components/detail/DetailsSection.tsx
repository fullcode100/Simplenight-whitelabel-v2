/* eslint-disable react/no-unescaped-entities */
import Divider from 'components/global/Divider/Divider';
import InlineFeature from 'components/global/InlineFeature/InlineFeature';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import ClockIcon from 'public/icons/assets/clock.svg';
import FeatureIcon from 'public/icons/assets/image-placeholder.svg';
import CheckIcon from 'public/icons/assets/check.svg';
import CloseIcon from 'public/icons/assets/close.svg';
import LanguageIcon from 'public/icons/assets/language.svg';
import DeviceMobileIcon from 'public/icons/assets/device-mobile.svg';
import TransportIcon from 'public/icons/assets/transport.svg';
import SectionSubtitle from 'components/global/SectionSubtitle/SectionSubtitle';
import { useTranslation } from 'react-i18next';
import { ThingsDetailItem } from 'thingsToDo/types/response/ThingsDetailResponse';
import DurationLabel from '../DurationLabel/DurationLabel';

interface DetailsSectionProps {
  thingsItem: ThingsDetailItem;
}

const DetailsSection = ({ thingsItem }: DetailsSectionProps) => {
  const [t] = useTranslation('global');
  const descriptionText = t('description', 'Description');
  const includedText = t('included', 'Included');
  const notIncludedText = t('notIncluded', 'Not Included');
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
    <section className="flex flex-wrap justify-between w-full mt-4 lg:justify-start">
      <InlineFeature
        icon={<ClockIcon />}
        text={
          <DurationLabel
            duration={rangeDuration ? rangeDuration : fixedDuration}
          />
        }
      />
      <InlineFeature icon={<DeviceMobileIcon />} text={presentations} />
      <InlineFeature icon={<TransportIcon />} text="Hotel Pickup" />
      <InlineFeature icon={<LanguageIcon />} text={`Offered in ${languages}`} />
    </section>
  );

  const DescriptionSection = () => (
    <>
      <SectionSubtitle>{descriptionText}</SectionSubtitle>
      <p className="pt-3 text-base text-dark-1000">
        {thingsItem?.extra_data?.description}
      </p>
    </>
  );

  const IncludedSection = () => (
    <>
      <SectionSubtitle>{includedText}</SectionSubtitle>
      <section className="flex flex-col flex-wrap mt-2 mb-3 lg:flex-row gap-3">
        {includedItems?.map((item, idx) => {
          return (
            <InlineFeature
              key={idx}
              icon={<CheckIcon className="text-green-1000" />}
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
      <section className="flex flex-col flex-wrap mt-2 lg:flex-row gap-3">
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
    <section className="px-5 py-6 lg:px-0 lg:pr-12 lg:py-12">
      <SectionTitle title={descriptionText} />
      <Features />
      <Divider className="py-4 lg:py-8" />
      <DescriptionSection />
      <Divider className="py-4 lg:py-8" />
      <IncludedSection />
      <NotIncludedSection />
    </section>
  );
};

export default DetailsSection;
