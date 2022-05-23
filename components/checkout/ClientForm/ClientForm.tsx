import FormSchema from 'components/global/FormSchema/FormSchema';

interface ClientFormProps {
  children?: any;
  schema: any;
  uiSchema: any;
}

const ClientForm = ({ children, schema, uiSchema }: ClientFormProps) => {
  return (
    <section className="px-5">
      {schema && uiSchema && (
        <FormSchema schema={schema} uiSchema={uiSchema}>
          {children || <></>}
        </FormSchema>
      )}
    </section>
  );
};

export default ClientForm;
