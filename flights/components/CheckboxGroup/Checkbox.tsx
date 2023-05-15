import React from 'react';

type Option = {
  id: string;
  label: string;
  selected?: boolean;
};

type CheckboxProps = {
  options: Array<Option>;
  onChange: (selectedOption: string) => void;
  title?: string;
};

export default function Checkbox({
  options,
  title = 'Checkbox',
  onChange,
}: CheckboxProps) {
  const CheckboxItem = ({ item }: { item: Option }) => {
    return (
      <section className="relative flex items-start">
        <section className="flex items-center h-5">
          <input
            id={item.id}
            aria-describedby={`${item}-description`}
            name="comments"
            type="checkbox"
            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
            onChange={() => onChange(item.id)}
            checked={item.selected}
          />
        </section>
        <section className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {item.label}
          </label>
        </section>
      </section>
    );
  };

  return (
    <fieldset className="space-y-5">
      <legend className="sr-only">{title}</legend>

      {options.map((item) => (
        <CheckboxItem key={item.id} item={item} />
      ))}
    </fieldset>
  );
}
