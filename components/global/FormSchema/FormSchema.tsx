/* eslint-disable indent */
import Form from '@rjsf/core';
import {
  CustomCheckbox,
  CustomCountry,
  CustomPhoneNumber,
  CustomSelect,
  CustomText,
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
}

const FormSchema = ({
  schema,
  uiSchema,
  children,
  onSubmit,
}: FormSchemaProps) => {
  const widgets = {
    CheckboxWidget: CustomCheckbox,
    TextWidget: CustomText,
    TextareaWidget: CustomTextArea,
    SelectWidget: CustomSelect,
    ToggleWidget: CustomToggle,
    CountryWidget: CustomCountry,
    PhoneWidget: CustomPhoneNumber,
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
      <section className={`${classNames} mb-4`}>
        {renderTemplate(schema.type)}
        {errors}
        {help}
      </section>
    );
  };

  return (
    <Form
      schema={schema}
      onSubmit={onSubmit}
      widgets={widgets}
      uiSchema={uiSchema}
      FieldTemplate={CustomFieldTemplate}
      ObjectFieldTemplate={ObjectFieldTemplate}
    >
      {children}
    </Form>
  );
};

export default FormSchema;
