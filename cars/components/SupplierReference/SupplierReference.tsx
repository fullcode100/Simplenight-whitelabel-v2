import { useTranslation } from 'react-i18next';

const SupplierReference = ({
  supplierReferenceID,
}: {
  supplierReferenceID: string;
}) => {
  const [t, i18next] = useTranslation('global');
  const supplierIdLabel = t('supplierReferenceID', 'Supplier Reference ID');

  return (
    <section className="grid gap-0 mb-4">
      <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-700">
        {supplierIdLabel}
      </p>
      <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-primary-1000">
        {supplierReferenceID}
      </p>
    </section>
  );
};

export default SupplierReference;
