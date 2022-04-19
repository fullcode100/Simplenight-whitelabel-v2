import I18nHOC from '../I18nHOC/I18nHOC';

interface LabelProps {
  value?: string;
  htmlFor?: string;
}

const Label = ({ value, htmlFor }: LabelProps) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-dark-800">
    {value}
  </label>
);

// eslint-disable-next-line new-cap
export default I18nHOC<LabelProps>(Label);
