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
  CustomEmail,
  CustomTextArea,
  CustomToggle,
} from './CustomFields';
import {
  CheckBoxTemplate,
  ObjectFieldTemplate,
  ObjectTemplate,
  TextTemplate,
} from './FormTemplates';

interface FormSchemaProps {
  schema: any;
  uiSchema?: any;
  children?: React.ReactNode;
  onSubmit?: (data: any) => void;
  onChange?: (data: IChangeEvent<FormData>) => void;
  id?: string;
  ref?: any;
}

const FormSchema = ({
  schema,
  uiSchema,
  children,
  onSubmit,
  onChange,
  id,
}: FormSchemaProps) => {
  const widgets = {
    CheckboxWidget: CustomCheckbox,
    TextWidget: CustomText,
    EmailWidget: CustomEmail,
    TextareaWidget: CustomTextArea,
    SelectWidget: CustomSelect,
    ToggleWidget: CustomToggle,
    CountryWidget: CustomCountry,
    PhoneWidget: CustomPhoneNumber,
    PickupPoint: CustomPickupPoint,
    NumberUnit: CustomNumberUnit,
    LanguageGuide: CustomLanguageGuide,
  };

  const CustomFieldTemplate = (props: any) => {
    const { id, classNames, help, errors, schema } = props;
    const renderTemplate = (schema: string) => {
      switch (schema) {
        case 'boolean':
          return <CheckBoxTemplate {...props} />;
        case 'string':
          return <TextTemplate {...props} />;
        case 'object':
          return <ObjectTemplate {...props} />;
        default:
          return <TextTemplate {...props} />;
      }
    };
    return (
      <section className={`${classNames}`}>
        {renderTemplate(schema.type)}
        {errors}
        {help}
      </section>
    );
  };

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
    >
      {children}
    </Form>
  );
};

export default FormSchema;
