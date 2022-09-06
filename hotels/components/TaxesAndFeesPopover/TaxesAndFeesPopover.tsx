import { useTranslation } from 'react-i18next';
import Popover from 'components/global/Popover/Popover';
import InfoCircle from 'public/icons/assets/info-circle.svg';

const TaxesAndFeesPopover = () => {
  const [t] = useTranslation('hotels');
  const taxesAndFeesDisclaimer = t('taxesAndFeesDisclaimer');

  const PopoverContent = () => (
    <p className="break-normal">{taxesAndFeesDisclaimer}</p>
  );

  return (
    <Popover placement="top" content={<PopoverContent />} trigger="click">
      <div className="flex items-center">
        <InfoCircle className="w-3 h-3" />
      </div>
    </Popover>
  );
};

export default TaxesAndFeesPopover;
