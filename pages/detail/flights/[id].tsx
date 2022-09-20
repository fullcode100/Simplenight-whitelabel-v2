import { useCategory } from 'hooks/categoryInjection/useCategory';
import { FLIGHT_CATEGORY } from 'flights';
import { NextPage } from 'next';

const FlightDetailPage: NextPage = () => {
  const category = useCategory(FLIGHT_CATEGORY);

  return category?.detailDisplay ?? null;
};

export default FlightDetailPage;
