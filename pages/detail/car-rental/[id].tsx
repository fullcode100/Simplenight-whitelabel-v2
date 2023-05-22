import { useCategory } from 'hooks/categoryInjection/useCategory';
import { CAR_CATEGORY } from 'cars';
import { NextPage } from 'next';

const CarDetailPage: NextPage = () => {
  const category = useCategory(CAR_CATEGORY);

  return category?.detailDisplay ?? null;
};

export default CarDetailPage;
