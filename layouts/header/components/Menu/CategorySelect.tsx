import classnames from 'classnames';
import useCategories, { CategoryInfo } from 'hooks/category/useCategories';
import { useRouter } from 'next/router';
import { getCurrenDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useCategorySlug } from 'hooks/category/useCategory';

const DEFAULT_LATITUDE = '40.7127753';
const DEFAULT_LONGITUDE = '-74.0059728';
const DEFAULT_ADDRESS = 'Nueva York, EE. UU.';

const CategorySelect = () => {
  const router = useRouter();
  const { slug, startDate, endDate, latitude, longitude, address } = useQuery();

  const categories = useCategories();
  const currentCategory = useCategorySlug(slug as string) || categories?.[0];

  const handleSelectCategory = (category: CategoryInfo) => {
    const currentDate = getCurrenDate();

    const startDateSearch = startDate || currentDate;
    const endDateSearch = endDate || currentDate;
    const latitudeSearch = latitude || DEFAULT_LATITUDE;
    const longitudeSearch = longitude || DEFAULT_LONGITUDE;
    const addressSearch = address || DEFAULT_ADDRESS;

    const route = `/search/${
      category.slug || slug
    }?startDate=${startDateSearch}&endDate=${endDateSearch}&latitude=${latitudeSearch}&longitude=${longitudeSearch}&address=${addressSearch}`;

    router.push(route);
  };

  if (categories?.length <= 1) return <></>;

  return (
    <section className="mt-2 text-dark-1000">
      {categories.map((category, i) => {
        const isActive = currentCategory.slug === category.slug;
        const className = classnames(
          'px-4 py-3 text-base cursor-pointer flex items-center gap-2',
          {
            'bg-primary-100 text-primary-1000': isActive,
          },
        );
        return (
          <section
            key={i}
            className={className}
            onClick={() => handleSelectCategory(category)}
          >
            <div className="flex items-center justify-center w-6 h-6">
              {category.icon}
            </div>
            <p className="capitalize">{category.name}</p>
          </section>
        );
      })}
    </section>
  );
};

export default CategorySelect;
