import CountrySelect from '../CountrySelect/CountrySelect';
import BaseInput from '../Input/BaseInput';
import PhoneNumberInput from '../PhoneNumberInput/PhoneNumberInput';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

export const CustomText = (props: any) => {
  const { value, onChange, placeholder, required } = props;
  return (
    <BaseInput
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      {...{
        required,
      }}
    />
  );
};

export const CustomPhoneNumber = (props: any) => {
  const { onChange, placeholder, required } = props;
  return (
    <PhoneNumberInput
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export const CustomSelect = (props: any) => {
  const { options, value, onChange, required } = props;
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none"
      required={required}
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
  const { value, onChange, placeholder, required } = props;
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      placeholder={placeholder}
      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none h-[90px]"
      required={required}
    />
  );
};

export const CustomCheckbox = (props: any) => {
  const { onChange, value } = props;
  return (
    <section className="flex items-center h-5">
      <input
        name="comments"
        type="checkbox"
        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
        onChange={() => onChange(!props.value)}
        checked={value}
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
