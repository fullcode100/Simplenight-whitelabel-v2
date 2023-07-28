import { getRGBFromHex } from 'helpers/stringUtils';
import { useState } from 'react';

const PrimaryColorSelector = () => {
  const handlePrimaryColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const rgb = getRGBFromHex(value);
  };

  return (
    <section className="color-selector">
      <label>Primary color:</label>
      <input type="color" onChange={handlePrimaryColorChange} />
    </section>
  );
};

interface BrandColorSelectorProps {
  cssVariable: string;
  initialValue?: string;
}

export const BrandColorSelector = ({
  cssVariable,
  initialValue,
}: BrandColorSelectorProps) => {
  const [colorValue, setColorValue] = useState(initialValue ?? '');

  const handlePrimaryColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const rgb = getRGBFromHex(value);

    setColorValue(value);
  };

  return (
    <section className="color-selector">
      <label>{cssVariable}:</label>
      <input
        type="color"
        value={colorValue}
        onChange={handlePrimaryColorChange}
      />
    </section>
  );
};

export default PrimaryColorSelector;
