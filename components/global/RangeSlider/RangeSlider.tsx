import { useEffect, useRef, ChangeEvent } from 'react';
import classnames from 'classnames';
import LabelSlider from './components/LabelSlider';

interface RangeSliderProps {
  initialMin?: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  minDifference: number;
  marks?: boolean;
  type: 'price' | 'star' | 'number' | 'distance';
  setMinState?: (value: string) => void;
  setMaxState: (value: string) => void;
  minValue: number;
  maxValue: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
}

const RangeSlider = ({
  min,
  max,
  minValue,
  maxValue,
  step,
  minDifference,
  marks = false,
  type,
  setMinState,
  setMaxState,
  setMinValue,
  setMaxValue,
}: RangeSliderProps) => {
  const progressRef: any = useRef(null);
  const [minValue, setMinValue] = useState(initialMin ?? min);
  const [maxValue, setMaxValue] = useState(initialMax);

  const setMin = (value: number) => {
    setMinValue(value);
  };

  const setMax = (value: number) => {
    setMaxValue(value);
  };

  const handleMin = (e: ChangeEvent<any>) => {
    if (maxValue - minValue >= minDifference && minValue >= min) {
      if (parseInt(e.target.value) <= maxValue) {
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
      if (parseInt(e.target.value) >= minValue) {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  const Marks = () => {
    const isActive = (val: number) => {
      if (!setMinState) return maxValue < val;

      return minValue > val || maxValue < val;
    };
    return (
      <>
        <div
          className={`h-2 w-2 bg-dark-200 rounded-full absolute -top-[3px] ${
            setMinState !== undefined ? 'bg-dark-200' : 'bg-primary-600'
          }`}
        ></div>
        {[...Array(max - 2)].map((e, i) => {
          const marksCount = max - 1;
          const itemNumber = i + 1;
          const width = 100;
          return (
            <div
              key={i}
              style={{
                left: `${(width / marksCount) * itemNumber}%`,
                marginLeft: '-4px',
              }}
              className={`h-2 w-2 rounded-full absolute -top-[3px] ${
                isActive(i + 2) ? 'bg-dark-200' : 'bg-primary-600'
              }`}
            ></div>
          );
        })}
        <div className="h-2 w-2 bg-dark-200 rounded-full absolute -top-[3px] right-0"></div>
      </>
    );
  };

  useEffect(() => {
    progressRef.current.style.left =
      ((minValue - min) / (max - min)) * 100 + '%';
    progressRef.current.style.right =
      100 - ((maxValue - min) / (max - min)) * 100 + '%';
  }, [minValue, maxValue, max, min]);

  return (
    <div className="mb-4">
      <div className="my-4">
        <div className="relative h-0.5 rounded-md bg-dark-200">
          <div
            className="absolute h-0.5 bg-primary-1000 rounded "
            ref={progressRef}
          ></div>
          {marks && <Marks />}
        </div>

        <div className="relative">
          {setMinState && (
            <input
              onChange={handleMin}
              onMouseUp={() => setMinState(minValue.toString())}
              onTouchEnd={() => setMinState(minValue.toString())}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              id="minValue"
              name="minValue"
              className={classnames(
                'absolute w-full h-1 bg-transparent appearance-none pointer-events-none -top-1',
                { ['z-10']: minValue === max },
              )}
            />
          )}
          <label htmlFor="minValue" className="absolute top-6">
            <LabelSlider value={minValue} type={type} />
          </label>

          <input
            onChange={handleMax}
            onMouseUp={() => setMaxState(maxValue.toString())}
            onTouchEnd={() => setMaxState(maxValue.toString())}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            id="maxValue"
            name="maxValue"
            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none -top-1"
          />
          <label htmlFor="maxValue" className="absolute right-0 top-6">
            <LabelSlider
              value={maxValue}
              type={type}
              isMaxLabel={maxValue == max}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
