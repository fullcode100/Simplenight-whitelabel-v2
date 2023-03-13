import { useSettings } from 'hooks/services/useSettings';
import React, { BaseSyntheticEvent } from 'react';
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

  const { data: brandConfig } = useSettings();
  const { legalInformation } = brandConfig;
  const { simplenightTermsOfService, simplenightPrivacyPolicy } =
    legalInformation || {};

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
          href={simplenightTermsOfService}
          target="_blank"
          rel="noreferrer"
        >
          {termsLabel}
        </a>
        {ofTheSimplenightLabel}
        <a
          className="underline text-primary-1000 hover:underline"
          href={simplenightPrivacyPolicy}
          target="_blank"
          rel="noreferrer"
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
