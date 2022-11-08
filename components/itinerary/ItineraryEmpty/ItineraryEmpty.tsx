import { createRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const BorderTops = () => (
    <>
      <section className="w-[26px] h-[17px] rotate-[50deg] top-[-3px] right-[-9.5px] bg-primary-200 absolute  border-b-2 border-b-primary-600" />
      <section className="w-[26px] h-[17px] rotate-[-50deg] top-[-3px] left-[-9.5px] bg-primary-200 absolute  border-b-2 border-b-primary-600" />
    </>
  );
  const Hole = () => (
    <section className="w-[15.72px] h-[15.72px] bg-primary-200 border-2 border-primary-600 rounded-1000 absolute top-4 left-5" />
  );

  const RectangleBottom = () => (
    <section className="w-[75px] h-[18.8px] bg-primary-100 border-2 border-primary-600 absolute bottom-0 left-0" />
  );

  const CircleLayout = ({ children }: ChildrenProp) => (
    <section className="w-[157px] h-[157px] bg-primary-200 rounded-1000 grid place-content-center relative">
      {children}
    </section>
  );

  const RectangleLayout = ({ children }: ChildrenProp) => (
    <section className="relative">
      <section className="w-[75px] h-[111px] bg-gradient-to-t from-primary-300 to-white border-2 border-primary-600" />
      {children}
    </section>
  );

  const Circle = ({ className }: CustomClassProp) => (
    <section className={`rounded-1000 bg-primary-500 absolute ${className}`} />
  );

  const X = ({ className }: CustomClassProp) => (
    <section className={`absolute ${className}`}>
      <section className="w-[50%] h-[100%] bg-primary-300 rotate-45" />
      <section className="w-[50%] h-[100%] bg-primary-300 rotate-[-45deg] absolute top-0 left-0" />
    </section>
  );

  const RightRope = ({ className }: CustomClassProp) => (
    <svg
      width="35"
      height="43"
      viewBox="0 0 35 43"
      fill="none"
      className={`absolute text-primary-600 ${className}`}
    >
      <path
        d="M32.2032 0.514488C30.6831 6.01132 27.2279 14.9367 21.9119 23.043C16.5809 31.172 9.48891 38.3111 0.753471 40.5309L1.24604 42.4693C10.7021 40.0664 18.1509 32.4251 23.5843 24.1398C29.0327 15.8317 32.5653 6.70891 34.1308 1.04754L32.2032 0.514488Z"
        fill="currentColor"
      />
    </svg>
  );

  const LeftRope = ({ className }: CustomClassProp) => (
    <svg
      width="90"
      height="65"
      viewBox="0 0 90 65"
      fill="none"
      className={`absolute text-primary-600 ${className}`}
    >
      <path
        d="M2.3818 64.2429C4.61747 56.1581 9.40523 43.0957 16.9201 31.2345C24.4494 19.3504 34.6102 8.83719 47.5329 5.55336L47.0403 3.61497C33.3827 7.08555 22.8635 18.1165 15.2306 30.1641C7.58334 42.2344 2.72692 55.4909 0.454141 63.7098L2.3818 64.2429ZM47.5329 5.55336C60.7064 2.20582 70.3537 2.31918 76.9777 3.65035C83.6467 4.99055 87.1691 7.54316 88.2389 8.96912L89.8388 7.76887C88.3603 5.79822 84.2968 3.08121 77.3718 1.68955C70.4018 0.288859 60.4472 0.208114 47.0403 3.61497L47.5329 5.55336Z"
        fill="currentColor"
      />
    </svg>
  );

  const Drawing = () => (
    <CircleLayout>
      <RectangleLayout>
        <RectangleBottom />
        <Hole />
        <BorderTops />
      </RectangleLayout>
      <RightRope className="bottom-[65px] right-[7.2px] " />
      <LeftRope className="top-[44px] left-[-15px] " />
      <Circle className={'w-[8.5px] h-[8.5px] top-[-4px] left-[65px]'} />
      <Circle className={'w-[5px] h-[5px] top-[-5px] left-[25px]'} />
      <Circle className={'w-[4px] h-[4px] top-[1px] right-[30px]'} />
      <Circle className={'w-[4px] h-[4px] top-[32px] right-[39px]'} />
      <Circle className={'w-[4px] h-[4px] top-[52px] right-[10px]'} />
      <X className="w-[4px] h-[7px] top-[-15px] right-[50px] " />
      <X className="w-[2px] h-[4px] top-[30px] right-[7px] " />
      <X className="w-[3px] h-[6px] top-[5px] left-[41px] " />
    </CircleLayout>
  );

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
        <Drawing />
      </section>
      <p className="text-lg leading-[24px] font-semibold text-center text-dark-800">
        {text}
      </p>
    </section>
  );
};

export default ItineraryEmpty;
