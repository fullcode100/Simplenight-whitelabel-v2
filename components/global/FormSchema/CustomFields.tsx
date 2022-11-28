import CountrySelect from '../CountrySelect/CountrySelect';
import BaseInput from '../Input/BaseInput';
import PhoneNumberInput from '../PhoneNumberInput/PhoneNumberInput';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

export const CustomText = (props: any) => {
  const { value, onChange, placeholder, required, id, schema } = props;
  return (
    <BaseInput
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      defaultValue={schema.default}
      {...{
        required,
        id,
      }}
    />
  );
};

export const CustomPhoneNumber = (props: any) => {
  const { onChange, placeholder, required, schema } = props;
  return (
    <PhoneNumberInput
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      defaultValue={schema.default}
    />
  );
};

export const CustomSelect = (props: any) => {
  const { options, value, onChange, required, id } = props;
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      className="block w-full border-gray-300 rounded-md shadow-sm resize-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      required={required}
      id={id}
    >
      {options.enumOptions.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export const CustomTextArea = (props: any) => {
  const { value, onChange, placeholder, required, id } = props;
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      placeholder={placeholder}
      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none h-[90px]"
      required={required}
      id={id}
    />
  );
};

export const CustomCheckbox = (props: any) => {
  const { onChange, value, id } = props;
  return (
    <section className="flex items-center h-5">
      <input
        name="comments"
        type="checkbox"
        className="w-4 h-4 border-gray-300 rounded focus:ring-primary-500 text-primary-600"
        onChange={() => onChange(!props.value)}
        checked={value}
        id={id}
      />
    </section>
  );
};

export const CustomToggle = (props: any) => {
  const { onChange, value, id } = props;
  return (
    <ToggleSwitch
      onChange={() => onChange(!props.value)}
      checked={value}
      id={id}
    />
  );
};
export const CustomCountry = (props: any) => {
  const { value, onChange, required } = props;
  return (
    <CountrySelect value={value} onChange={onChange} required={required} />
  );
};
