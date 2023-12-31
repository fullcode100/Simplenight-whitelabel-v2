/* eslint-disable indent */
import { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';
import ChevronDownIcon from 'public/icons/assets/chevron-down.svg';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

interface ComboboxProps {
  width: string;
  placeholder: string;
  items: any;
  selectedItem: any;
  setSelectedItem: any;
  isSearchable?: boolean;
  id?: string;
  required?: boolean;
}

const Combobox = ({
  width,
  placeholder,
  items,
  selectedItem,
  setSelectedItem,
  isSearchable = true,
  id,
  required = false,
}: ComboboxProps) => {
  const [searchResults, setSearchResults] = useState(items);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const methods = useFormContext();
  const { register = () => ({ id }), setValue = () => ({ id }) } = {
    ...methods,
  };

  const selectRef = useRef(null);
  useOnOutsideClick(selectRef, () => setOpen(false));

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setOpen(true);

    setSearchResults(
      items.filter((item: any) => {
        const matchValue = item.value
          .toLowerCase()
          .includes(e.target.value.toLowerCase());

        const matchSubvalue = item.subvalue
          ? item.subvalue.toLowerCase().includes(e.target.value.toLowerCase())
          : false;

        return matchValue || matchSubvalue;
      }),
    );
  };

  const handleChange = (item: any) => {
    setSelectedItem(item);
    setOpen(false);
  };

  useEffect(() => {
    setSearch(selectedItem?.value);
    setValue(id || '', selectedItem?.value);
  }, [selectedItem]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const InputSearch = (
    <section
      className={classnames(
        `${width} flex items-center px-3 border border-dark-300 rounded outline-none`,
        {
          'border-primary-500 rounded-b-none': open,
        },
      )}
      onClick={!isSearchable ? handleOpen : undefined}
    >
      <input
        type="text"
        className={
          'px-0 w-full text-dark-1000 border-none focus:shadow-none focus:inset-0 focus:ring-0 focus:outline-none focus:border-transparent'
        }
        required={required}
        placeholder={placeholder}
        value={search}
        disabled={!isSearchable}
        {...register(id || '', { onChange: handleSearch })}
      />
      <button className="w-5 h-10 px-5" onClick={handleOpen} type="button">
        <ChevronDownIcon className="text-dark-700" />
      </button>
    </section>
  );

  const DropDown = () => {
    if (searchResults.length === 0) return <></>;
    return (
      <section
        className={classnames(
          `absolute ${width} max-h-60 bg-white overflow-y-scroll z-10 border border-t-transparent border-primary-500 rounded-b divide-y divide-dark-300`,
          {
            hidden: !open,
          },
        )}
      >
        {searchResults.map((item: any, idx: number) => {
          return (
            <section
              key={`${item.value}-${idx}`}
              onClick={() => handleChange(item)}
              className="p-2 cursor-pointer select-none"
            >
              <div>{item.value}</div>
              <div className="text-[12px] text-dark-600">{item.subvalue}</div>
            </section>
          );
        })}
      </section>
    );
  };

  return (
    <>
      <section className="relative" ref={selectRef}>
        {InputSearch}
        <DropDown />
      </section>
    </>
  );
};

export default Combobox;
