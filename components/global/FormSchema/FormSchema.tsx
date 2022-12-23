/* eslint-disable indent */
import Form, { IChangeEvent } from '@rjsf/core';
import { useEffect, useRef } from 'react';
import {
  CustomCheckbox,
  CustomCountry,
  CustomLanguageGuide,
  CustomNumberUnit,
  CustomPhoneNumber,
  CustomPickupPoint,
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
  onChange?: (data: IChangeEvent<FormData>) => void;
  id?: string;
}

const FormSchema = ({
  schema,
  uiSchema,
  children,
  onSubmit,
  onChange,
  id,
}: FormSchemaProps) => {
  const formRef = useRef<any>(null);
  const formContainer = useRef<any>(null);
  const widgets = {
    CheckboxWidget: CustomCheckbox,
    TextWidget: CustomText,
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

  useEffect(() => {
    const form = formRef.current;
    const container = formContainer.current;
    if (form && container) {
      const children = [...form.formElement.children];
      if (container.children.length > 0) {
        container?.removeChild?.(container.children[0]);
        for (let i = 0; i < children.length; i++) {
          container?.appendChild?.(children[i]);
        }
      }
    }
  }, [formRef]);

  return (
    <section ref={formContainer}>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        widgets={widgets}
        uiSchema={uiSchema}
        onChange={onChange}
        FieldTemplate={CustomFieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        ref={formRef}
      >
        {children}
      </Form>
    </section>
  );
};

export default FormSchema;
