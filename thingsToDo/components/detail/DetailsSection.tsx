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

const DetailsSection = () => {
  const [t] = useTranslation('global');
  const descriptionText = t('description', 'Description');
  const includedText = t('included', 'Included');
  const notIncludedText = t('notIncluded', 'Not Included');
  const Features = () => (
    <section className="mt-4 flex flex-wrap justify-between w-full">
      <InlineFeature icon={<ClockIcon />} text="12hs Duration" />
      <InlineFeature icon={<DeviceMobileIcon />} text="Mobile Ticket" />
      <InlineFeature icon={<TransportIcon />} text="Hotel Pickup" />
      <InlineFeature icon={<FeatureIcon />} text="{feature}" />
      <InlineFeature
        icon={<LanguageIcon />}
        text="Offered in English, Spanish, German"
      />
    </section>
  );

  const DescriptionSection = () => (
    <>
      <SectionSubtitle>{descriptionText}</SectionSubtitle>
      <p className="text-base text-dark-1000 mt-3">
        The prestigious AAA Five Diamond award-winning Waldorf Astoria Chicago
        offers Parisian-inspired elegance in downtown's Gold Coast neighborhood.
        An urban sanctuary, the hotel offers easy access to all the city has to
        offer. Lorem ipsum sit dolor amet quiscam hic nihil mori dator. Et neque
        nibh malesuada sit. Urna, hac nunc, penatibus tellus dignissim cras
        libero integer nam. Hendrerit ullamcorper sed blandit scelerisque.
        Pharetra mauris, mollis dolor sagittis, aliquam sit magnis ac. Posuere
        amet, pellentesque eu velit.
      </p>
    </>
  );

  const IncludedSection = () => (
    <>
      <SectionSubtitle>{includedText}</SectionSubtitle>
      <section className="flex flex-wrap mt-2 mb-3">
        <InlineFeature
          icon={<CheckIcon className="text-green-1000" />}
          text="{included feature}"
          textClassName="text-green-1000"
        />
        <InlineFeature
          icon={<CheckIcon className="text-green-1000" />}
          text="{included feature}"
          textClassName="text-green-1000"
        />
        <InlineFeature
          icon={<CheckIcon className="text-green-1000" />}
          text="{included feature}"
          textClassName="text-green-1000"
        />
        <InlineFeature
          icon={<CheckIcon className="text-green-1000" />}
          text="{included feature}"
          textClassName="text-green-1000"
        />
      </section>
    </>
  );

  const NotIncludedSection = () => (
    <>
      <SectionSubtitle>{notIncludedText}</SectionSubtitle>
      <section className="flex flex-wrap mt-2">
        <InlineFeature
          icon={<CloseIcon className="text-dark-600" />}
          text="{included feature}"
          textClassName="text-dark-600"
        />
        <InlineFeature
          icon={<CloseIcon className="text-dark-600" />}
          text="{included feature}"
          textClassName="text-dark-600"
        />
        <InlineFeature
          icon={<CloseIcon className="text-dark-6000" />}
          text="{included feature}"
          textClassName="text-dark-600"
        />
        <InlineFeature
          icon={<CloseIcon className="text-dark-600" />}
          text="{included feature}"
          textClassName="text-dark-600"
        />
      </section>
    </>
  );

  return (
    <section className="px-5 py-3">
      <SectionTitle title="Details" />
      <Features />
      <Divider className="py-4" />
      <DescriptionSection />
      <Divider className="py-4" />
      <IncludedSection />
      <NotIncludedSection />
    </section>
  );
};

export default DetailsSection;
