import { BaseSyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CheckboxProps {
  items: string[];
  itemsUrls?: string[];
  itemsChecked: string[];
  onChange?: (value: string, isChecked: boolean) => void;
  title?: string;
}

export default function Checkbox({
  items,
  itemsUrls,
  itemsChecked,
  title = 'Checkbox',
  onChange,
}: CheckboxProps) {
  const handleCheckboxChange = (event: BaseSyntheticEvent, value: string) => {
    const isChecked = event.target.checked;
    if (onChange) onChange(value, isChecked);
  };
  const [t, i18next] = useTranslation('cars');
  const [showAll, setShowAll] = useState(false);
  const loadMoreLabel = t('loadMore', 'Load More');
  const loadLessLabel = t('loadLess', 'Load Less');

  const CheckboxItem = ({
    item,
    url,
    checked,
  }: {
    item: string;
    url?: string;
    checked: boolean;
  }) => {
    const [isChecked, setIsChecked] = useState(checked);

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
            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
            onChange={handleChange}
            checked={isChecked}
          />
        </section>
        <section className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {url ? (
              <img
                src={url}
                alt={item}
                style={{ maxWidth: '50px', height: '20px' }}
              />
            ) : (
              item
            )}
          </label>
        </section>
      </section>
    );
  };

  return (
    <fieldset className="space-y-5">
      <legend className="sr-only">{title}</legend>

      {items.map(
        (item, index) =>
          (showAll || index < 10) && (
            <CheckboxItem
              key={item + index}
              item={item}
              url={itemsUrls && itemsUrls[index] ? itemsUrls[index] : ''}
              checked={itemsChecked.indexOf(item) > -1}
            />
          ),
      )}
      {items.length > 10 && (
        <section className="flex w-full justify-start">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-normal text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
          >
            {showAll ? loadLessLabel : loadMoreLabel}
          </button>
        </section>
      )}
    </fieldset>
  );
}
