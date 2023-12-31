import { injectProps } from 'helpers/reactUtils';

interface InlineFeatureProps {
  icon?: React.ReactElement;
  text?: React.ReactNode;
  textClassName?: string;
}
const InlineFeature = ({
  icon,
  text,
  textClassName = '',
}: InlineFeatureProps) => {
  return (
    <section className="flex items-center gap-3 min-w-[153px]">
      <section className="text-primary-1000 w-[0.89rem] h-[0.89rem]">
        {injectProps(icon, {
          className: `${icon?.props?.className} w-full h-full`,
        })}
      </section>
      <h3 className={`text-xs text-dark-1000" ${textClassName}`}>{text}</h3>
    </section>
  );
};

export default InlineFeature;
