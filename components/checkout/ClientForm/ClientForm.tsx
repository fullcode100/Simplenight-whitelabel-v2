import { IChangeEvent } from '@rjsf/core';
import FormSchema from 'components/global/FormSchema/FormSchema';

interface ClientFormProps {
  children?: any;
  schema: any;
  uiSchema: any;
  onChange?: (data: IChangeEvent<FormData>) => void;
  onSubmit?: (values?: any) => void;
  formData?: any;
}

const ClientForm = ({
  children,
  schema,
  uiSchema,
  onChange,
  onSubmit,
  formData,
}: ClientFormProps) => {
  return (
    <section>
      <FormSchema
        schema={schema}
        uiSchema={uiSchema}
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
      >
        {children || <></>}
      </FormSchema>
    </section>
  );
};

export default ClientForm;
