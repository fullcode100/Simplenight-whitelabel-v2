import Star from 'public/icons/assets/star-filter.svg';

interface LabelProps {
  type: 'hour';
  value: number;
  isMaxLabel?: boolean;
}

const LabelSlider = ({ type, value, isMaxLabel = false }: LabelProps) => {
  return (
    <>
      {type == 'hour' && (
        <span>
          {value < 10 ? '0' + value : value}:00
        </span>
      )}
    </>
  );
};

export default LabelSlider;
