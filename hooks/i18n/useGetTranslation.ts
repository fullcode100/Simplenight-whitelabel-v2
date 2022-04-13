import { useTranslation } from 'react-i18next';

interface insideCallProps {
  translationKey?: string;
  value?: string;
}

const useGetTranslation = (context = 'global') => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n, ready] = useTranslation(context);
  return ({ value, translationKey }: insideCallProps) => {
    const usesTranslation = !!translationKey;
    const translation =
      usesTranslation && ready
        ? t(translationKey, { defaultValue: value, useSuspense: false })
        : value;

    return translation;
  };
};

export default useGetTranslation;
