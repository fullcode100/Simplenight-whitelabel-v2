import { Paragraph } from '@simplenight/ui';

interface ExtraDetailItemProps {
  detail?: string;
  label: string;
}

const ExtraDetailItem = ({ detail, label }: ExtraDetailItemProps) => {
  if (!detail) return <></>;
  return (
    <>
      <Paragraph textColor="text-dark-700">{label}</Paragraph>
      <Paragraph>{detail}</Paragraph>
    </>
  );
};

export default ExtraDetailItem;
