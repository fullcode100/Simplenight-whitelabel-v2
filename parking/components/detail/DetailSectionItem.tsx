import { FC, PropsWithChildren, ReactNode } from 'react';

interface DetailSectionProps {
  icon: ReactNode;
  title: string;
  append?: ReactNode;
}

export const DetailSectionItem: FC<PropsWithChildren<DetailSectionProps>> = ({
  icon,
  title,
  children,
  append,
}) => {
  return (
    <section className="w-[100%] flex flex-col gap-6 py-6">
      <header className="flex gap-3 items-center">
        <section>
          <div className="w-12 h-12 text-white bg-primary-1000 flex justify-center items-center rounded-full">
            {icon}
          </div>
        </section>
        <section className="grow">
          <h4>{title}</h4>
        </section>
        {append}
      </header>
      <section>{children}</section>
    </section>
  );
};
