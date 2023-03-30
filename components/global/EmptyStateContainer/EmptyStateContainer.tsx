import { Heading } from '@simplenight/ui';
import React, {
  ComponentType,
  createRef,
  SVGProps,
  useEffect,
  useState,
} from 'react';
import useMediaViewport from 'hooks/media/useMediaViewport';

interface Props {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  desktopWidth?: number;
  width?: number;
  forcedHeight?: number;
}
const EmptyStateContainer = ({
  Icon,
  text,
  desktopWidth = 225,
  width = 110,
  forcedHeight,
}: Props) => {
  const { isDesktop } = useMediaViewport();
  const [height, setHeight] = useState(0);
  const sectionRef = createRef<HTMLElement>();
  useEffect(() => {
    setHeight(
      forcedHeight ?? window.innerHeight - (sectionRef.current?.offsetTop ?? 0),
    );
  }, [forcedHeight]);
  return (
    <section
      className="w-full flex items-center justify-center flex-col gap-6"
      style={{
        height: height,
      }}
      ref={sectionRef}
    >
      <Icon width={isDesktop ? desktopWidth : width} />
      <Heading
        tag="h4"
        textColor="text-dark-800"
        className="capitalize text-center"
      >
        {text}
      </Heading>
    </section>
  );
};

export default EmptyStateContainer;
