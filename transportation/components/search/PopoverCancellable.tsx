import { FC } from 'react';
import Popover from 'components/global/Popover/Popover';
import InfoCircle from 'public/icons/assets/info-circle.svg';

interface TransportationPopoverCancellableProps {
  description?: string;
}

export const PopoverCancellable: FC<TransportationPopoverCancellableProps> = ({ description }) => {

  const PopoverContent = () => (
    <p className="break-normal">{description}</p>
  );

  return (
    <Popover placement="top" content={<PopoverContent />} trigger="click">
      <div className="flex items-center">
        <InfoCircle className="w-3 h-3 text-primary-1000" />
      </div>
    </Popover>
  );
};