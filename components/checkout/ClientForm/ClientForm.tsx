import { IChangeEvent } from '@rjsf/core';
import FormSchema from 'components/global/FormSchema/FormSchema';

interface ClientFormProps {
  children?: any;
  schema: any;
  uiSchema: any;
  onChange?: (data: IChangeEvent<FormData>) => void;
  onSubmit?: (values?: any) => void;
}

const ClientForm = ({
  children,
  schema,
  uiSchema,
  onChange,
  onSubmit,
}: ClientFormProps) => {
  return (
    <section className="px-4">
      {schema && uiSchema && (
        <FormSchema
          schema={schema}
          uiSchema={uiSchema}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          {children || <></>}
        </FormSchema>
      )}
    </section>
  );
};

export default ClientForm;
