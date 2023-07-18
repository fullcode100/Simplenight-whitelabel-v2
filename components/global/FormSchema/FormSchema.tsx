/* eslint-disable indent */
import Form, { IChangeEvent } from '@rjsf/core';
import {
  CustomCheckbox,
  CustomCountry,
  CustomLanguageGuide,
  CustomNumberUnit,
  CustomPhoneNumber,
  CustomPickupPoint,
  CustomSelect,
  CustomText,
  CustomEmailSchema,
  CustomTextArea,
  CustomToggle,
  CustomTimeSelect,
  CustomPassword,
} from './CustomFields';
import {
  CheckBoxTemplate,
  ObjectFieldTemplate,
  ObjectTemplate,
  TextTemplate,
} from './FormTemplates';
import React, { useMemo } from 'react';

interface FormSchemaProps {
  schema: any;
  uiSchema?: any;
  children?: React.ReactNode;
  onSubmit?: (data: any) => void;
  onChange?: (data: IChangeEvent<FormData>) => void;
  id?: string;
  ref?: any;
  formData?: any;
}

const CustomFieldTemplate = (props: any) => {
  const { id, classNames, help, errors, schema } = props;
  const Component = useMemo(() => {
    switch (schema.type) {
      case 'boolean':
        return CheckBoxTemplate;
      case 'string':
        return TextTemplate;
      case 'object':
        return ObjectTemplate;
      default:
        return TextTemplate;
    }
  }, []);
  return (
    <section className={`${classNames}`}>
      <Component {...props}></Component>
      {help}
    </section>
  );
};

const widgets = {
  CheckboxWidget: CustomCheckbox,
  TextWidget: CustomText,
  EmailWidget: CustomEmailSchema,
  TextareaWidget: CustomTextArea,
  SelectWidget: CustomSelect,
  ToggleWidget: CustomToggle,
  CountryWidget: CustomCountry,
  PhoneWidget: CustomPhoneNumber,
  PickupPoint: CustomPickupPoint,
  NumberUnit: CustomNumberUnit,
  LanguageGuide: CustomLanguageGuide,
  TimeSelect: CustomTimeSelect,
  PasswordWidget: CustomPassword,
};

const FormSchema = ({
  schema,
  uiSchema,
  children,
  onSubmit,
  onChange,
  id,
  formData,
}: FormSchemaProps) => {
  const CustomValidate = (formData: any, errors: any) => {
    if (formData.phone === '') {
      errors.phone.addError('Invalid phone number.');
    }
    return errors;
  };

  return (
    <Form
      id={id}
      schema={schema}
      onSubmit={onSubmit}
      widgets={widgets}
      uiSchema={uiSchema}
      onChange={onChange}
      FieldTemplate={CustomFieldTemplate}
      ObjectFieldTemplate={ObjectFieldTemplate}
      validate={CustomValidate}
      formData={formData}
    >
      {children}
    </Form>
  );
};

export default FormSchema;
