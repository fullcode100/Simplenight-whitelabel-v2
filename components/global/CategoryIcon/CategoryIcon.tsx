import { useCategoryIcon } from 'hooks/category/useCategoryIcon';
import { injectProps } from '../../../helpers/reactUtils';

interface CategoryIconProps {
  categoryName: string;
  className?: string;
}
const CategoryIcon = ({ categoryName, className }: CategoryIconProps) => {
  const icon = useCategoryIcon(categoryName);
  const iconAndClass = injectProps(icon, { className: className });
  return iconAndClass;
};

export default CategoryIcon;
