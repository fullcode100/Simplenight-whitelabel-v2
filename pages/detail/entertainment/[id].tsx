import { useCategory } from 'hooks/categoryInjection/useCategory';
import { THINGS_CATEGORY } from 'thingsToDo';
import { NextPage } from 'next';

const HotelDetailPage: NextPage = () => {
  const category = useCategory(THINGS_CATEGORY);

  return category?.detailDisplay ?? null;
};

export default HotelDetailPage;
