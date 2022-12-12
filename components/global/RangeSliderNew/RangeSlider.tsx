import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Slider } from 'antd';
import { useDebounce } from '../../../parking/hooks/useDebounce';

interface SliderRange {
  min: number;
  max: number;
  value: [number, number];
  onChange: (minMax: [number, number]) => void;
  format: (num: number) => ReactNode;
  marks?: number[];
  step?: number | null;
}

export const RangeSlider: FC<SliderRange> = ({
  format = (num) => num,
  marks,
  value,
  onChange,
  ...props
}) => {
  const [val, setVal] = useState(value);
  const debouncedVal = useDebounce(val, 500);

  useEffect(() => {
    onChange(debouncedVal);
  }, [debouncedVal]);

  useEffect(() => {
    setVal([props.min, props.max]);
  }, [props.min, props.max]);

  const marksObj = useMemo(() => {
    if (marks) {
      const marksObj: { [key: string]: ReactNode } = {};
      marks.forEach((mark) => {
        marksObj[mark] = format(mark);
      });
      return marksObj;
    }
  }, [marks]);

  return (
    <div className="flex flex-col gap-3">
      <Slider
        included={true}
        tooltipVisible={false}
        range={true}
        step={marksObj && null}
        marks={marksObj}
        value={val}
        onChange={setVal}
        {...props}
      />
      <div className="flex justify-between items-center px-2.5">
        <div>{format(val[0])}</div>
        <div>{format(val[1])}</div>
      </div>
    </div>
  );
};
