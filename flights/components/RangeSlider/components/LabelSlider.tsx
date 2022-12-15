import Star from 'public/icons/assets/star-filter.svg';

interface LabelProps {
  type: 'price' | 'star' | 'number';
  value: number;
  isMaxLabel?: boolean;
}

const LabelSlider = ({ type, value, isMaxLabel = false }: LabelProps) => {
  return (
    <>
      {type == 'price' ? (
        <span>
          ${value}
          {isMaxLabel && '+'}
        </span>
      ) : (
        ''
      )}
      {type == 'star' ? (
        <span className="flex items-center gap-1">
          {value}
          {isMaxLabel && '+'} <Star />
        </span>
      ) : (
        ''
      )}
      {type == 'number' ? (
        <span className="flex items-center gap-1">
          {value}
          {isMaxLabel && '+'}
        </span>
      ) : (
        ''
      )}
    </>
  );
};

export default LabelSlider;
