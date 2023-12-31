import { BaseSyntheticEvent, useState } from 'react';

interface CheckboxProps {
  items: string[];
  onChange?: (value: string, isChecked: boolean) => void;
  title?: string;
}

export default function Checkbox({
  items,
  title = 'Checkbox',
  onChange,
}: CheckboxProps) {
  const handleCheckboxChange = (event: BaseSyntheticEvent, value: string) => {
    const isChecked = event.target.checked;
    if (onChange) onChange(value, isChecked);
  };

  const CheckboxItem = ({ item }: { item: string }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: BaseSyntheticEvent) => {
      setIsChecked(event.target.checked);
      handleCheckboxChange(event, item);
    };

    return (
      <section className="relative flex items-start">
        <section className="flex items-center h-5">
          <input
            id={item}
            aria-describedby={`${item}-description`}
            name="comments"
            type="checkbox"
            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-dark-300 rounded"
            onChange={handleChange}
            checked={isChecked}
          />
        </section>
        <section className="ml-3 text-sm">
          <label htmlFor="comments" className="font-semibold text-dark-700">
            {item}
          </label>
        </section>
      </section>
    );
  };

  return (
    <fieldset className="space-y-5">
      <legend className="sr-only">{title}</legend>

      {items.map((item, index) => (
        <CheckboxItem key={item + index} item={item} />
      ))}
    </fieldset>
  );
}
