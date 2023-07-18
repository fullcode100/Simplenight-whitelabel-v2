import I18nHOC from '../I18nHOC/I18nHOC';

interface LabelProps {
  message?: string;
}

const ErrorMessage = ({ message }: LabelProps) => (
  <div className={'font-normal text-sm mt-[4px] text-error-1000'}>
    {message}
  </div>
);

// eslint-disable-next-line new-cap
export default I18nHOC<LabelProps>(ErrorMessage);
