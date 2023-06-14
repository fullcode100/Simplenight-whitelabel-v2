import Image from 'next/image';

import { NextPageWithLayout } from 'types/layout/pageTypes';
import { PDFViewer } from 'components/global/PDFViewer/PDFViewer';

// const pdf = require('public/privacy-policy.pdf');

const TermsAndConditions: NextPageWithLayout = () => {
  return (
    <PDFViewer pdf="https://storage.googleapis.com/simplenight_public_web/terms-of-service.html" />
  );
};

export default TermsAndConditions;
