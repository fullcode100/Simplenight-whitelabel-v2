import { ReactNode } from 'react';
import classnames from 'classnames';

interface CheckoutStepItemProps {
  icon?: ReactNode;
  text: string;
  status: 'active' | 'inactive' | 'completed';
}

const CheckoutStepItem = ({ icon, text, status }: CheckoutStepItemProps) => {
  return (
    <section
      className={classnames('flex items-center justify-start gap-2.5', {
        ['text-primary-1000']: status === 'active',
        ['text-dark-500']: status === 'inactive',
        ['text-green-1000']: status === 'completed',
      })}
    >
      {icon}
      <p className="font-semibold text-base">{text}</p>
    </section>
  );
};

export default CheckoutStepItem;
