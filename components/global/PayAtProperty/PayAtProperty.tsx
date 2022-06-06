import InformationIcon from 'public/icons/assets/info-circle.svg';

interface PayAtPropertyProps {
  className?: string;
}
const PayAtProperty = ({ className }: PayAtPropertyProps) => {
  return (
    <section
      className={`flex items-center gap-2 border border-dark-300 rounded-4 py-1 px-1.5 ${className}`}
    >
      <InformationIcon className="text-primary-1000" />
      <p className="text-sm">Pay at property</p>
    </section>
  );
};

export default PayAtProperty;
