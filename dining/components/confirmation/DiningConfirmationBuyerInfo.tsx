import Email from 'public/icons/assets/email.svg';
import Phone from 'public/icons/assets/phone-call.svg';
import Customer from 'public/icons/assets/customer.svg';
import { useTranslation } from 'react-i18next';
import { CustomerType } from 'dining/types/diningCustom';

interface DiningConfirmationBuyerInfoProps {
  customer: CustomerType;
}

const DiningConfirmationBuyerInfo = ({
  customer,
}: DiningConfirmationBuyerInfoProps) => {
  const [t] = useTranslation('global');
  const orderName = t('orderName', 'Order Name');

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-primary-100 border-[1px] border-primary-300 rounded-4 p-5 mb-6">
      <section className="flex gap-2">
        <Customer className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000" />
        <section className="flex flex-col">
          <p className="font-semibold text-dark-700">{orderName}</p>
          <p className="font-semibold text-dark-1000">
            {customer.firstName} {customer.lastName}
          </p>
        </section>
      </section>
      <section className="ml-5 lg:ml-0">
        <section className="flex items-center gap-2 pb-2">
          <Email className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000 h-4" />
          <p className="font-semibold underline text-dark-1000">
            {customer.email}
          </p>
        </section>
        <section className="flex items-center gap-2">
          <Phone className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000 h-4" />
          <p className="font-semibold underline text-dark-1000">
            +{customer.prefix} {customer.phone}
          </p>
        </section>
      </section>
    </section>
  );
};

export default DiningConfirmationBuyerInfo;
