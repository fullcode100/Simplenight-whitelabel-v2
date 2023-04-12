import { IconWrapper, Paragraph } from '@simplenight/ui';
import classnames from 'classnames';
import Check from 'public/icons/assets/check-ok.svg';
export const Step = ({
  label,
  state,
}: {
  label: string;
  state: 'active' | 'disabled' | 'complete';
}) => {
  const isDisabled = state === 'disabled';
  const isComplete = state === 'complete';

  const textColor = classnames(
    'text-primary-1000',
    isDisabled && 'text-dark-400',
    isComplete && 'text-green-1000',
  );

  const StepDot = () => (
    <div
      className={classnames(
        'h-4 w-4 flex items-center justify-center rounded-full',
        !isDisabled && 'bg-primary-300 ',
      )}
    >
      <div
        className={classnames(
          'h-1.5 w-1.5  rounded-full',
          isDisabled ? 'bg-dark-400' : 'bg-primary-1000',
        )}
      ></div>
    </div>
  );
  return (
    <section className="flex gap-3 items-center">
      {isComplete ? (
        <IconWrapper size={16}>
          <Check className="text-green-1000" />
        </IconWrapper>
      ) : (
        <StepDot />
      )}

      <Paragraph
        textColor={textColor}
        fontWeight="semibold"
        size="small"
        className="capitalize"
      >
        {label}
      </Paragraph>
    </section>
  );
};
