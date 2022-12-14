import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Slider } from 'antd';

interface SliderRange {
  min: number;
  max: number;
  value: [number, number];
  onChange: (minMax: [number, number]) => void;
  onAfterChange: (minMax: [number, number]) => void;
  format: (num: number) => ReactNode;
  step?: number | null;
}

export const RangeSlider: FC<SliderRange> = ({
  format = (num) => num,
  value,
  onChange,
  onAfterChange,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Slider
        included={true}
        tooltipVisible={false}
        range={true}
        value={value}
        onChange={onChange}
        onAfterChange={onAfterChange}
        {...props}
      />
      <div className="flex justify-between items-center px-2.5">
        <div>{format(value[0])}</div>
        <div>{format(value[1])}</div>
      </div>
    </div>
  );
};
