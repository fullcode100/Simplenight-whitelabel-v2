import { NextPageWithLayout } from 'types/layout/pageTypes';
import { PDFViewer } from 'components/global/PDFViewer/PDFViewer';

const TermsAndConditions: NextPageWithLayout = () => {
  return (
    <PDFViewer pdf="https://storage.googleapis.com/simplenight_public_web/privacy-policy.html" />
  );
};

export default TermsAndConditions;
