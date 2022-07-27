import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../Label/Label';

interface FormControlProps {
  name?: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormControl = ({
  name,
  label,
  required = false,
  children,
}: FormControlProps) => {
  const [t] = useTranslation('global');
  const requiredText = t('required', 'Required');

  return (
    <section className="space-y-2">
      <section className="flex justify-between items-center">
        <Label value={label} htmlFor={name} />
        {required && (
          <p className="text-sm text-primary-1000 font-semibold">
            {requiredText}
          </p>
        )}
      </section>
      {children}
    </section>
  );
};

export default FormControl;
