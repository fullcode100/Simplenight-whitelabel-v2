import Star from 'public/icons/assets/star-filter.svg';
import { RangeTypes } from 'types/global/Filters';

interface LabelProps {
  type: RangeTypes;
  value: number;
  isMaxLabel?: boolean;
}

const LabelSlider = ({ type, value, isMaxLabel = false }: LabelProps) => {
  const renderSwitch = (param: string) => {
    switch (param) {
      case 'priceRange':
        return <span>{'$'.repeat(value)}</span>;
      case 'price':
        return (
          <span>
            ${value}
            {isMaxLabel && '+'}
          </span>
        );
      case 'distance':
        return <span>{value} mi</span>;
      case 'star':
        return (
          <span className="flex items-center gap-1">
            {value}
            {isMaxLabel && '+'} <Star />
          </span>
        );
      default:
        return (
          <span>
            {value}
            {isMaxLabel && '+'}
          </span>
        );
    }
  };

  return renderSwitch(type);
};

export default LabelSlider;
