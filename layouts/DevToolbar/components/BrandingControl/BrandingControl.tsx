import React from 'react';
import Button from 'components/global/Button/Button';
import Popover from 'components/global/Popover/Popover';
import { BrandColorSelector } from './components/PrimaryColorSelector';
import { CoreTheme } from 'types/core/store/CoreState';
import { useSettings } from 'hooks/services/useSettings';

const BrandingControl = () => {
  const { data: brandConfig } = useSettings();
  const { theme } = brandConfig;
  const handleStopButtonPropagation = (event: Event) => {
    event.stopPropagation();
  };

  const PopoverTitle = () => <p>Brand Configuration</p>;

  const PopoverContent = () => (
    <>
      {theme.map((theme: CoreTheme) => {
        const { key: cssVariable } = theme;

        if (cssVariable.split('-').includes('rgb')) {
          return <BrandColorSelector cssVariable={cssVariable} />;
        }

        return null;
      })}
    </>
  );

  return (
    <section>
      <Popover
        placement="bottom"
        trigger="click"
        title={<PopoverTitle />}
        content={<PopoverContent />}
      >
        <Button value="Brand Config" onClick={handleStopButtonPropagation} />
      </Popover>
    </section>
  );
};

export default BrandingControl;
