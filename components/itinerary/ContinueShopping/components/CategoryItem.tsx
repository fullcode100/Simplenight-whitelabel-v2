import { ReactNode } from 'react';
import Link from 'next/link';
import Arrow from 'public/icons/assets/arrow.svg';

interface CategoryItemProps {
  text: string;
  icon: ReactNode;
  url: string;
}

const CategoryItem = ({ text, icon, url }: CategoryItemProps) => {
  return (
    <section className="py-4">
      <Link href={`/search/${url}`}>
        <a className="text-gray-500 flex items-center gap-2">
          <section className="text-primary-1000">{icon}</section>
          <section className="flex justify-between items-center w-full text-dark-1000">
            <p className="text-sm font-semibold">{text}</p>
            <Arrow />
          </section>
        </a>
      </Link>
    </section>
  );
};

export default CategoryItem;
