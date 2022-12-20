import { MouseEvent, ReactNode } from 'react';

import Button from 'components/global/ButtonNew/Button';

interface ModalFooterProps {
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  secondaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  footerSummary?: ReactNode;
}

const ModalFooter = ({
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  footerSummary,
}: ModalFooterProps) => {
  const renderButtons = !!primaryButtonText || !!secondaryButtonText;
  return (
    <footer className="w-full px-5 py-6 bg-white shadow-container lg:px-6 lg:rounded-b-4">
      <section className={renderButtons ? 'grid gap-4' : ''}>
        {footerSummary}

        <section className="grid gap-3 lg:flex lg:w-[337px] lg:justify-self-end">
          {secondaryButtonText && (
            <Button
              type="outlined"
              width="w-full lg:w-[30%]"
              onClick={secondaryButtonAction}
            >
              <p className="text-base font-semibold leading-base">
                {secondaryButtonText}
              </p>
            </Button>
          )}

          {primaryButtonText && (
            <Button width="w-full lg:w-[70%]" onClick={primaryButtonAction}>
              <p className="text-base font-semibold leading-base">
                {primaryButtonText}
              </p>
            </Button>
          )}
        </section>
      </section>
    </footer>
  );
};

export default ModalFooter;
