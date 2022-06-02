import { ReactNode } from 'react';

interface EmptyStateProps {
  text: string;
  image: ReactNode;
}

const EmptyState = ({ text, image }: EmptyStateProps) => {
  return (
    <section className="mx-auto p-10">
      {image}
      <p className="mt-10 text-center text-dark-800 font-semibold text-[20px] leading-[24px]">
        {text}
      </p>
    </section>
  );
};

export default EmptyState;
