import React, {
  Children,
  cloneElement,
  ReactComponentElement,
  ReactElement,
  ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';

export interface I18nHOCSpecificProps {
  value: string;
  translationKey?: string;
  childComponent?: any;
  context?: string;
}

function I18nHOC<ChildrenProps>(Component: React.ComponentType<any>) {
  return ({
    value,
    translationKey,
    context,
    ...others
  }: I18nHOCSpecificProps & ChildrenProps) => {
    debugger;
    const usesTranslation = !!translationKey;
    const [t, i18n] = useTranslation(context ?? 'global');
    const translation = usesTranslation
      ? t(translationKey, { defaultValue: value })
      : value;

    return <Component value={translation} {...others} />;
  };
}

export default I18nHOC;
