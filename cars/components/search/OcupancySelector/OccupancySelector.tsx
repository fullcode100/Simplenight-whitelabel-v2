import { useRef, useState } from 'react';
import classnames from 'classnames';
import { useOnOutsideClick } from '../../../../hooks/windowInteraction/useOnOutsideClick';
import NumberInput from '../../../../components/global/NumberInput/NumberInput';

type OccupancyDataKeys = 'adultCount' | 'childCount' | 'roomCount';

export type OccupancyData = {
  [key in OccupancyDataKeys]: number;
};

const OccupancyLabels = {
  adultCount: 'Adults',
  childCount: 'Children',
  roomCount: 'Rooms',
};

interface OccupancySelectorProps {
  visible: boolean;
  values: OccupancyData;
  className?: string;
  onClose?: (selectedOccupancy: OccupancyData) => void;
}

const OccupancySelector = ({
  visible,
  values,
  className,
  onClose,
}: OccupancySelectorProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [temporaryValues, setTemporaryValues] = useState<OccupancyData>(values);

  const handleSelectorClose = (): void => {
    onClose && onClose(temporaryValues);
  };

  useOnOutsideClick(selectorRef, handleSelectorClose);

  const valuesKeys = Object.keys(values) as unknown as OccupancyDataKeys[];

  const handleInputChange = (key: OccupancyDataKeys, value: number): void => {
    const newValues = {
      ...temporaryValues,
      [key]: value,
    };
    setTemporaryValues(newValues);
  };

  return visible ? (
    <section
      ref={selectorRef}
      className={classnames('flex flex-col p-2 pb-4', className)}
    >
      {valuesKeys.map((key: OccupancyDataKeys) => (
        <section
          key={key}
          className="flex flex-row items-center justify-center h-full m-2"
        >
          <span className="w-1/2 pt-5 items-center justify-center">
            {OccupancyLabels[key]}
          </span>
          <NumberInput
            value={temporaryValues[key]}
            onChange={(value) => handleInputChange(key, value)}
            className="h-3"
            min={1}
            withButtons
          />
        </section>
      ))}

      <section className="drop-shadow-lg absolute top-48 right-5 w-11 overflow-hidden inline-block">
        <section className=" h-7 w-7 bg-gray-300 -rotate-45 transform origin-top-left"></section>
      </section>
    </section>
  ) : null;
};

export default OccupancySelector;
