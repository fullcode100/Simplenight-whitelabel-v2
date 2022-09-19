import { useCategory } from 'hooks/categoryInjection/useCategory';
import { HOTEL_CATEGORY } from 'flights';
import { NextPage } from 'next';

const FlightDetailPage: NextPage = () => {
  const category = useCategory(HOTEL_CATEGORY);

  return category?.detailDisplay ?? null;
};

export default FlightDetailPage;
