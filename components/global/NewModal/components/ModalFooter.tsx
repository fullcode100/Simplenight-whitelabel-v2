import Button from 'components/global/Button/Button';
import { MouseEvent, ReactNode } from 'react';
import classnames from 'classnames';

interface ModalFooterProps {
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonAction: (event?: MouseEvent<HTMLElement>) => void;
  secondaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  summary?: ReactNode;
  hasMultipleActions?: boolean;
}

const ModalFooter = ({
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  summary,
  hasMultipleActions,
}: ModalFooterProps) => {
  const secondaryButtonTextNotNull = secondaryButtonText ?? 'close';

  return (
    <footer className="w-full bg-white py-6 px-5 shadow-container">
      {summary}
      {hasMultipleActions ? (
        <section
          className={classnames('grid grid-cols-2 gap-3', {
            ['mt-4']: summary,
          })}
        >
          <Button
            value={secondaryButtonTextNotNull}
            size="full"
            type="outlined"
            textColor="primary"
            onClick={secondaryButtonAction}
          />
          <Button
            value={primaryButtonText}
            size="full"
            onClick={primaryButtonAction}
          />
        </section>
      ) : (
        <Button
          value={primaryButtonText}
          size="full"
          onClick={primaryButtonAction}
          className={classnames({
            ['mt-4']: summary,
          })}
        />
      )}
    </footer>
  );
};

export default ModalFooter;
