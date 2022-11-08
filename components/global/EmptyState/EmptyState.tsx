import { createRef, useEffect, useState, ReactNode } from 'react';

interface EmptyStateProps {
  text: string;
  image: ReactNode;
}

const EmptyState = ({ text, image }: EmptyStateProps) => {
  const [height, setHeight] = useState(0);

  const sectionRef = createRef<HTMLElement>();
  useEffect(() => {
    setHeight(window.innerHeight - (sectionRef.current?.offsetTop ?? 0));
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center p-10 mx-auto gap-11"
      style={{
        height: height,
      }}
      ref={sectionRef}
    >
      {image}
      <p className="mt-10 text-center text-dark-800 font-semibold text-[20px] leading-[24px]">
        {text}
      </p>
    </section>
  );
};

export default EmptyState;
