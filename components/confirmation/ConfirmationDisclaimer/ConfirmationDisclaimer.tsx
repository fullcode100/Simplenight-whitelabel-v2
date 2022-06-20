import InfoCircle from 'public/icons/assets/info-circle.svg';
import { useTranslation } from 'react-i18next';

const ConfirmationDisclaimer = () => {
  const [t, i18next] = useTranslation('global');
  const confirmationDisclaimer = t(
    'confirmationDisclaimer',
    'Supplier Reference ID and Vendor Confirmation Number can be found below.',
  );

  return (
    <section className="flex bg-white gap-2.5 px-1 border border-gray-300 rounded">
      <span className="mt-1 text-primary-1000 h-5">
        <InfoCircle />
      </span>
      <p className="font-semibold text-[14px] leading-[20px]">
        {confirmationDisclaimer}
      </p>
    </section>
  );
};

export default ConfirmationDisclaimer;
