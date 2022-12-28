import countryList from 'country-list';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface CountrySelectProps {
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
  autoFocus?: boolean;
}

const CountrySelect = ({
  value,
  onChange,
  required,
  autoFocus = true,
  ...others
}: CountrySelectProps) => {
  const [t] = useTranslation('global');
  const countries = countryList.getData();
  countries.sort(function (a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const countryText = t('country', 'Country');

  return (
    <select
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={autoFocus}
      className={classnames(
        'shadow-sm focus:ring-primary-500 mt-2 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none',
        {
          'text-dark-600': !value,
        },
      )}
      {...others}
      required={required}
    >
      <option value={''} className="text-dark-600" disabled>
        {countryText}
      </option>
      {Object.values(countries).map((label) => {
        return (
          <option key={label.code} value={label.code}>
            {label.name}
          </option>
        );
      })}
    </select>
  );
};

export default CountrySelect;
