import Star from 'public/icons/assets/star-filter.svg';

interface LabelProps {
  type: 'number';
  value: number;
  isMaxLabel?: boolean;
}

const LabelSlider = ({ type, value, isMaxLabel = false }: LabelProps) => {
  return (
    <>{type === 'number' && <span>{value < 6 ? value : `${value}+`}</span>}</>
  );
};

export default LabelSlider;
