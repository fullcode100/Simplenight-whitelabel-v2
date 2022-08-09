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
    <footer className="w-full bg-white shadow-container px-5 py-6 lg:px-6 lg:rounded-b-4">
      <section className={renderButtons ? 'grid gap-4' : ''}>
        {footerSummary}

        <section className="grid gap-3 lg:flex lg:w-[337px] lg:justify-self-end">
          {secondaryButtonText && (
            <Button
              type="outlined"
              width="w-full"
              onClick={secondaryButtonAction}
            >
              <p className="font-semibold text-base leading-base">
                {secondaryButtonText}
              </p>
            </Button>
          )}

          {primaryButtonText && (
            <Button width="w-full" onClick={primaryButtonAction}>
              <p className="font-semibold text-base leading-base">
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
