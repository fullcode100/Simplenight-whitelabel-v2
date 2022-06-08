import { IChangeEvent } from '@rjsf/core';
import FormSchema from 'components/global/FormSchema/FormSchema';

interface ClientFormProps {
  children?: any;
  schema: any;
  uiSchema: any;
  onChange?: (data: IChangeEvent<FormData>) => void;
}

const ClientForm = ({
  children,
  schema,
  uiSchema,
  onChange,
}: ClientFormProps) => {
  return (
    <section className="px-5">
      {schema && uiSchema && (
        <FormSchema schema={schema} uiSchema={uiSchema} onChange={onChange}>
          {children || <></>}
        </FormSchema>
      )}
    </section>
  );
};

export default ClientForm;
