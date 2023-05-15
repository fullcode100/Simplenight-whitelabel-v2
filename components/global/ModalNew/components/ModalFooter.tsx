import { Button } from '@simplenight/ui';
import { MouseEvent, ReactNode } from 'react';

interface ModalFooterProps {
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  secondaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  isPrimaryActionLoading: boolean;
  footerSummary?: ReactNode;
}

const ModalFooter = ({
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  isPrimaryActionLoading = false,
  footerSummary,
}: ModalFooterProps) => {
  const renderButtons = !!primaryButtonText || !!secondaryButtonText;
  return (
    <footer className="w-full px-5 py-6 bg-white shadow-container lg:px-6 lg:rounded-b-4">
      <section className={renderButtons ? 'grid gap-4' : ''}>
        {footerSummary}

        <section className="grid gap-3 lg:flex  lg:justify-self-end">
          {secondaryButtonText && (
            <Button type="outlined" onClick={secondaryButtonAction}>
              {secondaryButtonText}
            </Button>
          )}

          {primaryButtonText && (
            <Button
              onClick={primaryButtonAction}
              loading={isPrimaryActionLoading}
            >
              {primaryButtonText}
            </Button>
          )}
        </section>
      </section>
    </footer>
  );
};

export default ModalFooter;
