import React, { BaseSyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

type TermsProps = {
  checkValue: boolean;
  checkboxMethod: (check: boolean) => void;
  disabled?: boolean;
};

const Terms = ({
  checkValue = false,
  disabled = false,
  checkboxMethod,
}: TermsProps) => {
  const [t, i18next] = useTranslation('global');
  const iHaveReviewedLabel = t(
    'iHaveReviewed',
    'I have reviewed and agree to the ',
  );
  const termsLabel = t('terms', 'Terms of Service');
  const ofTheSimpleNightLabel = t(
    'ofTheSimpleNight',
    ' of Simplenight and the ',
  );
  const privacyLabel = t('privacy', 'Privacy Statement');
  const ofSimpleNightLabel = t(
    'ofSimpleNight',
    ' of Simplenight. I understand and accept that Simplenight is the merchant of record for this transaction, and is the name that will appear on my bank statement.',
  );
  const handleCheckbox = (e: BaseSyntheticEvent) => {
    checkboxMethod(e.target.checked);
  };
  return (
    <section className="w-full flex gap-3">
      <input
        className={`cursor-pointer focus:ring-primary-500 text-primary-600 border-gray-300 h-6 w-6 rounded-4 ${
          disabled && 'bg-dark-300'
        }`}
        type="checkbox"
        id="checkout-terms"
        name="terms"
        checked={checkValue}
        disabled={disabled}
        onClick={(e) => handleCheckbox(e)}
      />
      <label
        htmlFor="checkout-terms"
        className="text-base leading-[22px] text-dark-1000 font-normal"
      >
        {iHaveReviewedLabel}
        <a
          className="text-primary-1000 underline hover:underline"
          href="/terms"
        >
          {termsLabel}
        </a>
        {ofTheSimpleNightLabel}
        <a
          className="text-primary-1000 underline hover:underline"
          href="/privacy"
        >
          {privacyLabel}
        </a>
        {ofSimpleNightLabel}
      </label>
    </section>
  );
};

export default Terms;
