import countryList from 'country-list';

interface CountrySelectProps {
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
}

const CountrySelect = ({
  value,
  onChange,
  required,
  ...others
}: CountrySelectProps) => {
  const countries = countryList.getCodeList();

  return (
    <select
      value={value ?? 'US'}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none"
      required={required}
      {...others}
    >
      {Object.entries(countries).map(([value, label]) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default CountrySelect;
