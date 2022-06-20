import { useCategory } from 'hooks/categoryInjection/useCategory';
import { HOTEL_CATEGORY } from 'hotels';
import { NextPage } from 'next';

const HotelDetailPage: NextPage = () => {
  const category = useCategory(HOTEL_CATEGORY);

  return category?.detailDisplay ?? null;
};

export default HotelDetailPage;
