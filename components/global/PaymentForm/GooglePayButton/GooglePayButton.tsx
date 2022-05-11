import React from 'react';
import ReactGooglePayButton from '@google-pay/button-react';
import { PaymentRequest } from './types/PaymentRequest';

interface GooglePayButtonProps {
  onLoadPaymentData?: (paymentRequest: PaymentRequest) => void;
  environment?: 'TEST' | 'PRODUCTION';
  merchantId: string;
  gatewayMerchantId: string;
  amount?: string;
  currencyCode?: string;
  countryCode?: string;
  className?: string;
}

const GooglePayButton = ({
  environment = 'TEST',
  merchantId,
  gatewayMerchantId,
  amount = '1.00',
  currencyCode = 'USD',
  countryCode = 'US',
  className = '',
  onLoadPaymentData,
}: GooglePayButtonProps) => {
  const handlePaymentRequest = (data: any) => {
    if (onLoadPaymentData) onLoadPaymentData(data as unknown as PaymentRequest);
  };

  return (
    <ReactGooglePayButton
      environment={environment}
      className={className}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
              billingAddressRequired: true,
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'square',
                gatewayMerchantId: gatewayMerchantId,
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: merchantId,
          merchantName: 'SIMPLENIGHT',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: amount,
          currencyCode: currencyCode,
          countryCode: countryCode,
        },
      }}
      buttonSizeMode="fill"
      onLoadPaymentData={handlePaymentRequest}
    />
  );
};

export default GooglePayButton;
