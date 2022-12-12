import { useCategory } from 'hooks/categoryInjection/useCategory';
import { NextPage } from 'next';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useCategorySlug } from 'hooks/category/useCategory';

const DetailPage: NextPage = () => {
  const { slug } = useQuery();
  const type = useCategorySlug(slug as string)?.type;
  const category = useCategory(type as string);

  return category?.detailDisplay ?? null;
};

export default DetailPage;
