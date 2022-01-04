import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { DEFAULT_LOCALE } from '../../helpers/languageConstants';
import { useAppDispatch } from '../../hooks/redux/useAppDispatch';
import { setBrandConfig } from '../../store/actions/core';
import { getLanguageSettings } from '../../store/selectors/core';

const InitAppHOC = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const { locale, intlMessages } = useSelector(getLanguageSettings);

  useEffect(() => {
    dispatch(setBrandConfig('GENTEX'));
  }, []);

  return (
    <IntlProvider
      messages={intlMessages}
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
    >
      {children}
    </IntlProvider>
  );
};

export default InitAppHOC;
