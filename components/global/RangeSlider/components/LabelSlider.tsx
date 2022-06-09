import Star from 'public/icons/assets/star-filter.svg';

interface LabelProps {
  type: 'price' | 'star';
  value: number;
}

const LabelSlider = ({ type, value }: LabelProps) => {
  return (
    <>
      {type == 'price' ? (
        <span>${value}</span>
      ) : (
        <span className="flex items-center gap-1">
          {value} <Star />
        </span>
      )}
    </>
  );
};

export default LabelSlider;
