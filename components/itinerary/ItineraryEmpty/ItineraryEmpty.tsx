import { createRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Itinerary as ItineraryIllustration } from '@simplenight/ui';

interface ChildrenProp {
  children: React.ReactNode;
}

interface CustomClassProp {
  className?: string;
}

const ItineraryEmpty = ({
  continueHeight = 0,
}: {
  continueHeight?: number;
}) => {
  const { t } = useTranslation();
  const text = t('itineraryEmpty', 'Add Something To Your Itinerary!');

  const [height, setHeight] = useState(0);

  const sectionRef = createRef<HTMLElement>();
  useEffect(() => {
    setHeight(
      window.innerHeight -
        (sectionRef.current?.offsetTop ?? 0) -
        continueHeight,
    );
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center w-full"
      style={{
        height: height,
      }}
      ref={sectionRef}
    >
      <section className="grid py-6 place-content-center">
        <ItineraryIllustration className="w-full" />
      </section>
      <p className="text-lg leading-[24px] font-semibold text-center text-dark-800">
        {text}
      </p>
    </section>
  );
};

export default ItineraryEmpty;
