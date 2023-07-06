import PickupPoint from 'components/global/PickupPoint/PickupPoint';
import { useEffect, useState } from 'react';
import Combobox from '../Combobox/Combobox';
import CountrySelect from '../CountrySelect/CountrySelect';
import BaseInput from '../Input/BaseInput';
import NumberUnitInput from '../NumberUnitInput/NumberUnitInput';
import NewPhoneNumberInput from '../PhoneNumberInput/NewPhoneNumberInput';
import SelectInput from '../SelectInput/OldSelectInput';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useTranslation } from 'react-i18next';
import { WidgetProps } from '@rjsf/core';

export const CustomText = (props: any) => {
  const { value, onChange, placeholder, required, id, schema } = props;
  let currentPlaceHolder = placeholder;
  const [t] = useTranslation('hotels');
  if (placeholder == 'Name') {
    currentPlaceHolder = t('name', placeholder);
  }
  if (placeholder == 'Email') {
    currentPlaceHolder = t('email', placeholder);
  }
  return (
    <BaseInput
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={currentPlaceHolder}
      defaultValue={schema.default}
      {...{
        required,
        id,
        maxlength: schema?.maxLength,
      }}
    />
  );
};

export const CustomEmail = (props: any) => {
  const { value, onChange, placeholder, required, id, schema } = props;
  let currentPlaceHolder = placeholder;
  const [t] = useTranslation('hotels');
  if (placeholder == 'Name') {
    currentPlaceHolder = t('name', placeholder);
  }
  if (placeholder == 'Email') {
    currentPlaceHolder = t('email', placeholder);
  }
  return (
    <BaseInput
      type="email"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={currentPlaceHolder}
      defaultValue={schema.default}
      {...{
        required,
        id,
        maxlength: schema?.maxLength,
      }}
    />
  );
};

export const CustomPhoneNumber = (props: any) => {
  const { onChange, placeholder, required, schema } = props;
  const [t] = useTranslation('hotels');
  const PhoneNumber = t('phone_number', placeholder);
  return (
    <NewPhoneNumberInput
      onChange={onChange}
      placeholder={PhoneNumber}
      required={required}
      defaultCode={schema.defaultCode}
      defaultPhoneNumber={schema.default}
    />
  );
};

const getAllTimes = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    times.push(`${hour}:00`);
    times.push(`${hour}:30`);
  }
  return times;
};

export const CustomTimeSelect = (props: WidgetProps) => {
  const { value, onChange, id, required, autofocus } = props;
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string;
  }>();
  const [t] = useTranslation('things');
  const pickupPlaceholder = t('TimeSelectPlaceholder', 'Choose A Time');
  const options = getAllTimes().map((time) => ({ label: time, value: time }));
  const onChangeHandler = (data: { label: string; value: string }) => {
    setSelectedItem(data);
    onChange(data.value);
  };
  return (
    <Combobox
      width="w-full"
      placeholder={pickupPlaceholder}
      items={options}
      selectedItem={selectedItem}
      setSelectedItem={onChangeHandler}
      id={id}
      {...{
        required,
        autoFocus: autofocus,
      }}
    />
  );
};

export const CustomSelect = (props: any) => {
  const { options, value, onChange, required, id, autofocus } = props;
  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required={required}
      options={options.enumOptions}
      id={id}
      {...{
        autoFocus: autofocus,
      }}
    />
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

export const CustomCheckbox = (props: WidgetProps) => {
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

export const CustomToggle = (props: WidgetProps) => {
  const { onChange, value, id } = props;
  return (
    <ToggleSwitch
      onChange={() => onChange(!props.value)}
      checked={value}
      id={id}
    />
  );
};
export const CustomCountry = (props: WidgetProps) => {
  const { value, onChange, required } = props;
  return (
    <CountrySelect value={value} onChange={onChange} required={required} />
  );
};

export const CustomPickupPoint = (props: any) => {
  const { value, onChange, schema, id, required } = props;
  useEffect(() => {
    const locations = schema?.data?.locations?.map?.(
      (location: any) => location.location,
    );
    onChange(locations[0]);
  }, []);
  return (
    <PickupPoint
      pickupPoints={schema?.data}
      selectedPickup={value}
      setSelectedPickup={onChange}
      id={id}
      required={required}
    />
  );
};

export const CustomNumberUnit = (props: any) => {
  const { value, onChange, schema, required } = props;
  return (
    <NumberUnitInput
      onChange={onChange}
      options={schema?.data}
      required={required}
    />
  );
};

export const CustomLanguageGuide = (props: any) => {
  const { value, onChange, schema, uiSchema, id, required } = props;
  const dataByLabel: any = {};
  const data = schema?.data;
  const items: any = [];
  data?.forEach?.((item: any) => {
    dataByLabel[item.label] = item;
    items.push({ value: item.label });
  });
  const [selectedItem, setSelectedItem] = useState<any>(items[0]);
  const placeholder = uiSchema['ui:placeholder'] || 'Language Guide';
  useEffect(() => {
    onChangeHandler(items[0]);
  }, []);
  const onChangeHandler = (itemValue: any) => {
    const item = dataByLabel[itemValue.value];
    const answer = { type: item?.type, language: item?.language };
    setSelectedItem(itemValue);
    onChange?.(answer);
  };

  return (
    <Combobox
      width={'w-full'}
      placeholder={placeholder}
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={onChangeHandler}
      isSearchable={false}
      id={id}
      required={required}
    />
  );
};
