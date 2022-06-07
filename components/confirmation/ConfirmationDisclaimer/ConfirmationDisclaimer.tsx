import InfoCircle from 'public/icons/assets/info-circle.svg';
import { useTranslation } from 'react-i18next';

const ConfirmationDisclaimer = () => {
  const [t, i18next] = useTranslation('global');
  const confirmationDisclaimer = t(
    'confirmationDisclaimer',
    'Supplier Reference ID and Vendor Confirmation Number can be found below.',
  );

  return (
    <section className="flex bg-white gap-2.5 p-1.5 border border-gray-300 rounded">
      <span className="text-primary-1000 h-5">
        <InfoCircle />
      </span>
      <h1 className="font-semibold text-[14px]">{confirmationDisclaimer}</h1>
    </section>
  );
};

export default ConfirmationDisclaimer;
