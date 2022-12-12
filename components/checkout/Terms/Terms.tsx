import React, { BaseSyntheticEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type TermsProps = {
  checkValue: boolean;
  checkboxMethod: (check: boolean) => void;
  disabled?: boolean;
  errorTerms: boolean;
  setErrorTerms: (error: boolean) => void;
};

const Terms = ({
  checkValue = false,
  disabled = false,
  checkboxMethod,
  errorTerms,
  setErrorTerms,
}: TermsProps) => {
  const [t, i18next] = useTranslation('global');
  const [width, setWidth] = useState<number>(0);
  const iHaveReviewedLabel = t(
    'iHaveReviewed',
    'I have reviewed and agree to the ',
  );
  const termsLabel = t('terms', 'Terms of Service');
  const ofTheSimplenightLabel = t(
    'ofTheSimplenight',
    ' of Simplenight and the ',
  );
  const privacyLabel = t('privacy', 'Privacy Statement');
  const ofSimplenightLabel = t(
    'ofSimplenight',
    ' of Simplenight. I understand and accept that Simplenight is the merchant of record for this transaction, and is the name that will appear on my bank statement.',
  );
  const thePaymentWill = t(
    'thePaymentWill',
    'The payment will be processed in the US.',
  );

  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const errorTermsLabel = t(
    'errorTermsLabel',
    'Please accept terms and conditions',
  );

  const handleCheckbox = (e: BaseSyntheticEvent) => {
    checkboxMethod(e.target.checked);
    setErrorTerms(false);
  };

  return (
    <section className="flex w-full gap-3">
      <input
        className={`cursor-pointer focus:ring-primary-500 text-primary-600 border-gray-300 h-6 w-6 rounded-4 ${
          disabled && 'bg-dark-300'
        }`}
        type="checkbox"
        id="checkout-terms"
        name="terms"
        checked={checkValue}
        disabled={disabled}
        onChange={(e) => handleCheckbox(e)}
      />
      <label
        htmlFor="checkout-terms"
        className="text-base leading-[22px] text-dark-1000 font-normal"
      >
        {iHaveReviewedLabel}&nbsp;
        <a
          className="underline text-primary-1000 hover:underline"
          href="/terms"
          target={width < 480 ? '_self' : '_blank'}
        >
          {termsLabel}
        </a>
        {ofTheSimplenightLabel}
        <a
          className="underline text-primary-1000 hover:underline"
          href="/privacy"
        >
          {privacyLabel}
        </a>
        {ofSimplenightLabel}&nbsp;
        {thePaymentWill}
      </label>
      {errorTerms && <p className="pl-8 text-red-500">{errorTermsLabel}</p>}
    </section>
  );
};

export default Terms;
