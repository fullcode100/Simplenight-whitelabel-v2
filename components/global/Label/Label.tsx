import I18nHOC from '../I18nHOC/I18nHOC';

interface LabelProps {
  value?: string;
  htmlFor?: string;
  className?: string;
}

const Label = ({ value, htmlFor, className, ...others }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`${className} block text-sm font-semibold text-dark-800 hover:cursor-pointer mb-[4px]`}
    {...others}
  >
    {value}
  </label>
);

// eslint-disable-next-line new-cap
export default I18nHOC<LabelProps>(Label);
