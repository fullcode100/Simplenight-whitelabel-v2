import { useState, useEffect, useRef, ChangeEvent } from 'react';
import LabelSlider from './components/LabelSlider';

interface RangeSliderProps {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  minDifference: number;
  type: 'price' | 'star';
}

const RangeSlider = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  minDifference,
  type,
}: RangeSliderProps) => {
  const progressRef: any = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e: ChangeEvent<any>) => {
    if (maxValue - minValue >= minDifference && maxValue <= max) {
      if (parseInt(e.target.value) < maxValue) {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e: ChangeEvent<any>) => {
    if (maxValue - minValue >= minDifference && maxValue <= max) {
      if (parseInt(e.target.value) > minValue) {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + '%';
    progressRef.current.style.right = step - (maxValue / max) * step + '%';
  }, [minValue, maxValue, max, step]);

  return (
    <div className="px-4">
      <div className="my-4">
        <div className="relative h-1 rounded-md bg-gray-300">
          <div
            className="absolute h-1 bg-primary-1000 rounded "
            ref={progressRef}
          ></div>
        </div>

        <div className="relative">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            id="minValue"
            name="minValue"
            className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
          <label htmlFor="minValue" className="absolute top-6">
            <LabelSlider value={minValue} type={type} />
          </label>

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            id="maxValue"
            name="maxValue"
            className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
          <label htmlFor="maxValue" className="absolute top-6 right-0">
            <LabelSlider value={maxValue} type={type} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
