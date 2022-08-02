import { ReactNode } from 'react';
import Link from 'next/link';

interface CategoryItemProps {
  text: string;
  icon: ReactNode;
  url: string;
}

const CategoryItem = ({ text, icon, url }: CategoryItemProps) => {
  const [t] = useTranslation('global');
  const categoryLabel = t(url, '');

  return (
    <section className="h-[120px] w-[120px] lg:h-40 lg:w-40 bg-white rounded-4 flex items-center justify-center shadow-container">
      <Link href={'/'}>
        <a className="text-gray-500 space-y-3">
          <section className="text-primary-1000 h-8 w-8 lg:h-[60px] lg:w-[60px] mx-auto flex justify-center items-center">
            {icon}
          </section>
          <p className="text-sm font-semibold text-center w-full text-dark-1000">
            {text}
          </p>
        </a>
      </Link>
    </section>
  );
};

export default CategoryItem;
