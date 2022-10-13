import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import Link from 'next/link';

interface CategoryItemProps {
  text: string;
  type: string;
  url: string;
}

const CategoryItem = ({ text, type, url }: CategoryItemProps) => {
  return (
    <section className="h-[120px] w-[120px] lg:h-40 lg:w-40 bg-white rounded-4 flex items-center justify-center shadow-containe mx-auto">
      <Link href={'/'}>
        <a className="text-gray-500 space-y-3">
          <section className="text-primary-1000 h-8 w-8 lg:h-[60px] lg:w-[60px] mx-auto flex justify-center items-center">
            <CategoryIcon categoryName={type} className={'h-5 w-5'} />
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
