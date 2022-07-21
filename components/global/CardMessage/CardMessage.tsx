import { useCardColor } from 'hooks/layoutAndUITooling/useCardColor';
import Paragraph from '../Typography/Paragraph';

interface CardMessageProps {
  type?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const CardMessage = ({
  type = 'default',
  icon,
  title,
  description,
}: CardMessageProps) => {
  const descriptionWeight = title ? 'normal' : 'semibold';
  const colors = useCardColor(type);

  return (
    <section
      className={`flex flex-row gap-2.5 px-2 py-1 w-fit border rounded ${colors.border} ${colors.background}`}
    >
      {icon && <section className={`h-5 w-5 ${colors.icon}`}>{icon}</section>}
      <section className="flex flex-col">
        {title && (
          <Paragraph
            className="leading-5"
            fontWeight="semibold"
            size="small"
            textColor={`${colors.text}`}
          >
            {title}
          </Paragraph>
        )}
        {description && (
          <Paragraph
            className="leading-5"
            fontWeight={descriptionWeight}
            size="small"
            textColor={`${colors.text}`}
          >
            {description}
          </Paragraph>
        )}
      </section>
    </section>
  );
};

export default CardMessage;
