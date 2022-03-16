import React from 'react';
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
    const usesTranslation = !!translationKey;
    const [t, i18n, ready] = useTranslation(context ?? 'global');
    const translation =
      usesTranslation && ready
        ? t(translationKey, { defaultValue: value, useSuspense: false })
        : value;

    if (ready) return <Component value={translation} {...others} />;

    return null;
  };
}

export default I18nHOC;
