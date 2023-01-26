import classnames from 'classnames';
import useCategories, { CategoryInfo } from 'hooks/category/useCategories';
import { useRouter } from 'next/router';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useCategorySlug } from 'hooks/category/useCategory';
import useLocalStorage from 'hooks/localStorage/useLocalStorage';

const CategorySelect = () => {
  const router = useRouter();
  const [storedValue] = useLocalStorage('lastSearch', '/');
  const storedParams = new URLSearchParams(storedValue.toString());
  const roomsData = storedParams.get('roomsData') || '[]';
  const totalAdults = JSON.parse(roomsData).reduce(
    (acc: unknown, obj: { adults: any }) => acc + obj.adults,
    0,
  );

  const totalchildren = JSON.parse(roomsData).reduce(
    (acc: unknown, obj: { children: any }) => acc + obj.children,
    0,
  );

  const { slug, startDate, endDate, latitude, longitude, address } = useQuery();

  const categories = useCategories();
  const currentCategory = useCategorySlug(slug as string) || categories?.[0];

  const handleSelectCategory = (category: CategoryInfo) => {
    const startDateSearch = startDate || storedParams.get('startDate');
    const endDateSearch = endDate || storedParams.get('endDate');
    const latitudeSearch = latitude || storedParams.get('latitude');
    const longitudeSearch = longitude || storedParams.get('longitude');
    const addressSearch = address || storedParams.get('address');

    const roomDataasString = storedParams.get('roomsData') || '[]';
    const roomsDataArray = JSON.parse(roomDataasString);

    const route = `/search/${
      category.slug || slug
    }?adults=${totalAdults}&children=${totalchildren}&startDate=${startDateSearch}&endDate=${endDateSearch}&latitude=${latitudeSearch}&longitude=${longitudeSearch}&address=${addressSearch}&rooms=${
      roomsDataArray?.length
    }&roomsData=${roomDataasString}`;

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
